## Instalação

Tipos de instalação

O MongoDB disponibiliza três tipos de instalação:

### Standalone

Apenas indicado para ambientes de desenvolvimento
Não exige nenhum tipo de configuração relativa à segurança;

### Replica Set

É o mínimo indicado para ambientes de produção.
Neste tipo, os dados são replicados em cada um dos servidores do cluster e temos apenas um ponto de escrita.

Em alguns casos, podemos utilizar os demais servidores para escalar a leitura.

### Shard

Esse é um tipo de instalação no qual podemos escalar a escrita de informações no banco.

Os dados são divididos no cluster através de chaves de partição que chamamos de shard keys .

A shard key pode ser composta por um ou mais atributos do documento, e sua escolha pode afetar a performance, eficiência e escalabilidade do banco.

Escalar a escrita significa dar mais capacidade para que o banco de dados processe mais operações, aumentando a performance.

Agora você vai aprender a instalar uma instância do tipo standalone na sua máquina e deixá-la pronta para utilização.

Veja como é simples a instalação no vídeo abaixo. Depois siga o passo-a-passo para instalar em seu computador:

## Escolhendo a distribuição

O MongoDB está disponível para os seguintes sistemas operacionais:

Linux
MacOS
Windows

Você utilizará o MongoDB Community Edition , escolha a instalação especifica para a sua distribuição Linux deste link .

Caso você esteja utilizando MacOS, siga as instruções deste link .

## Instalando o MongoDB Community Edition

Os próximos passos para instalação do MongoDB serão realizados com base na distribuição Ubuntu utilizando o apt package manager .

1. Importando a chave pública utilizada pelo gerenciamento de pacotes

Abra o terminal e utilize o comando abaixo para importar chave pública GPG do MongoDB .

*wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -*

Este comando deve retornar um OK .
Porém, se você receber um erro indicando que gnupg não está instalado, faça como abaixo:

Instalar o gnupg e as bibliotecas necessárias através do comando:

*sudo apt-get install gnupg*

Após a instalação, tente importar a chave outra vez:

*wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -*

2. Crie o arquivo de lista ( list file ) para o MongoDB
Crie o arquivo /etc/apt/sources.list.d/mongodb-org-4.4.list para o Ubuntu 20.04 (Focal):

*echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list*

3. Atualize o banco de dados local de pacotes

*sudo apt-get update*

4. Instale os pacotes do MongoDB

Você pode instalar a última versão estável do **MongoDB, ou uma versão específica.
Para instalar a última versão estável, utilize o comando abaixo:

*sudo apt-get install -y mongodb-org*

Pronto! Agora você já tem a última versão estável do MongoDB instalada e pronta para ser executada na sua máquina. Mas antes, vamos dar uma olhada nos pacotes que foram instalados.
Os pacotes instalados

Você deve ter notado que, durante a instalação, alguns pacotes adicionais foram instalados:

mongodb-org-server : esse pacote contém o que podemos chamar de "servidor" do MongoDB . Contém todos os recursos necessários para que uma instância do banco seja executada;

mongodb-org-shell : o shell é onde você se conecta com o MongoDB através do terminal. É uma interface que suporta JavaScript e é super completa para administração de instâncias e clusters;

mongodb-org-mongos : pronuncia-se "Mongo S" e só se faz necessário em ambientes Shard . Não entraremos em detalhes sobre ele agora;

mongodb-org-tools : esse pacote contém algumas ferramentas nativas do MongoDB. Como por exemplo:

mongodump : ferramenta para extrair dados no formato BSON (falaremos dele mais adiante). Em alguns ambientes, pode fazer parte da estratégia de backup;

mongorestore : ferramenta para restaurar backups gerados pelo mongodump ;

mongoimport : ferramenta para importar arquivos JSON , CSV ou TSV para uma instância do MongoDB ;

mongoexport : exporta dados de uma instância do MongoDB para arquivos JSON ou CSV .

## Executando o MongoDB Community Edition

### Considerações sobre o ulimit

Alguns sistemas operacionais baseados em UNIX limitam os recursos de sistema que uma sessão pode utilizar. Esses limites têm grande impacto negativo para a operação do MongoDB, e em ambientes de produção devem ser observados com muita atenção. Veja a seção UNIX ulimit Settings da documentação do MongoDB para maiores informações.

### Diretórios de trabalho

Se você instalou o MongoDB via apt (gerenciador de pacotes do Linux), então algumas configurações são executadas e mantidas em diretórios do sistema operacional. Por padrão, no Linux, os dados ficarão armazenados em /var/lib/mongodb , e o log de funcionamento em /var/log/mongodb .

No MacOS, os dados e os logs ficam em /usr/local/var/mongodb e /usr/local/var/log/mongodb , respectivamente.

Por padrão, o MongoDB roda utilizando a conta do usuário mongodb , que também foi criada durante a instalação. Se você quiser rodar uma instância com outro usuário, deverá dar as permissões para ele nos diretórios de dados e log.

### Arquivo de configuração

O pacote oficial inclui um arquivo de configuração https://docs.mongodb.com/manual/reference/configuration-options/#conf-file ( /etc/mongod.conf ). Essas configurações (como especificação dos caminhos dos diretórios de dados e log) têm efeito após o startup da instância (ou seja, quando ela for iniciada). Logo, se você fizer qualquer modificação nesse arquivo com a instância do MongoDB rodando, deverá reiniciá-la para que tenha efeito.
