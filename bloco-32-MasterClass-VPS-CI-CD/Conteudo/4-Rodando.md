## Rodando uma aplicação de demonstração

Vamos fazer um deploy demonstrativo de uma aplicação web com Docker https://www.docker.com/ , para poder acessar essa aplicação de qualquer lugar do mundo a partir do IP público.
Instalando os requisitos

## Docker

O bom de utilizar Docker é que ele costuma ser o único pré-requisito, pois quaisquer outros podem ser instalados por meio dele. O passo a passo consiste na instalação de pré-requisitos, na adição de uma chave GPG, na adição do repositório do Docker e em seguida o update do apt e a instalação do Docker em si:

# Instalação de pré-requisitos
sudo apt-get update ; sudo apt-get install ca-certificates curl gnupg lsb-release -y
# É provável que nada seja instalado, pois são pacotes que já costumam vir com o Ubuntu

# Adiciona a chave GPG do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adição do repositório do Docker no sistema
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


sudo apt-get update ; sudo apt-get install docker-ce docker-ce-cli containerd.io

Na dúvida ou caso tenha algum problema, olhe aqui na documentação oficial como instalar o docker no Ubuntu, ou aqui para buscar seu sistema caso não seja Ubuntu.
Você pode checar se o Docker foi instalado corretamente com o comando sudo docker run hello-world.

Se tudo estiver correto, adicione seu user ao grupo docker para não precisar ficar digitando sudo toda vez que for usar o docker. O comando é sudo usermod -aG docker $USER.
Docker Compose
Uma outra ferramenta muito bacana de se instalar é o Docker Compose. A instalação no Linux pode ser feita por meio do curl, baixando o binário e dando-o permissão de execução:

# Baixa o binário do Docker Compose em /usr/local/bin/docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Dá ao binário a permissão de execução
sudo chmod +x /usr/local/bin/docker-compose
Na dúvida ou caso tenha algum problema, olhe aqui na documentação oficial como instalar o 

## Docker Compose.

Você pode checar se o Docker Compose foi instalado corretamente com o comando docker-compose --version.
Por último é importante fazer com que o Docker não altere por si só as regras de firewall (iptables), já que estamos utilizando o ufw como firewall. Para isso, vamos criar um arquivo chamado /etc/docker/daemon.json e colocar nele o seguinte json:

{
  "iptables": false
}

Para isso, utilize o vim (ou seu editor de preferência) com o comando sudo vim /etc/docker/daemon.json, aperte i para entrar no modo de inserção/edição e digite o conteúdo do json. Em seguida pressione a sequência de teclas ESC : w q ! ENTER para salvar o arquivo.
Para as mudanças surtirem efeito, vamos reiniciar o serviço daemon do docker:

sudo systemctl restart docker.service

## Criando e rodando a aplicação
Vamos começar criando uma pasta para a nossa aplicação, chamada react-example, dentro da pasta home do user tryber, e vamos entrar nesta pasta:

mkdir /home/tryber/react-example && cd $_
Em seguida vamos criar um Dockerfile que vai simplesmente iniciar uma aplicação react do zero. Para isso abra um novo arquivo chamado Dockerfile no seu editor de texto. Com o Vim a série de comandos é:

vim Dockerfile # Abre (cria) o arquivo Dockerfile no diretório react-example
Aperte a tecla i para entrar no modo de inserção/edição e cole o conteúdo abaixo:

FROM node:14

WORKDIR /home/node/app

RUN npx create-react-app .

CMD npm start

Em seguida pressione a sequência de teclas ESC : w q ! ENTER para salvar o arquivo. Repita os passos para o arquivo docker-compose.yml, com o conteúdo abaixo:

version: '3'

services:
  node:
    build: .
    ports:
      - '80:3000'
    working_dir: /home/node/app
    command: 'npm start'

Para rodar a aplicação utilize o comando sudo docker-compose up. Você pode passar a flag -d para iniciar em segundo plano, mas é importante saber que a primeira execução deste comando vai demorar um tempo considerável, visto que vai ter que criar a imagem de exemplo, instalando todas as dependências do react.

## Configurando o firewall

Se você acessar o IP da sua VPS no navegador verá que nada está carregando (caso tenha configurado o Docker para não alterar diretamente as regras do iptables), já que o firewall está com a política de tráfego entrada padrão como deny. Para mudar isso, vamos adicionar a porta 80, padrão do protocolo HTTP, à lista de portas cujo tráfego é permitido:

sudo ufw allow 80/tcp # ou sudo ufw allow http
Tente acessar o site colocando o IP da VPS diretamente na barra de busca do seu navegador de internet e verá a página inicial do template de aplicação react criada pelo create-react-app.
