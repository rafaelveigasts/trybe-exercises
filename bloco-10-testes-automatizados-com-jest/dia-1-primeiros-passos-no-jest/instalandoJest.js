/* Instalando o Jest
Para começar a instalar o Jest, você precisa ter o npm instalado e funcionando corretamente, abaixo temos um passo a passo, feito para Linux , sabendo disso, então vá ao seu terminal e digite:

npm -v
Se ele te mostrar um número de versão (por exemplo, 6.14.4) está tudo certo, você pode pular os comandos deste passo. Caso ele retorne um erro dizendo que não encontrou o comando você deverá executar a instalação do npm , descrita abaixo:
a. Primeiro vamos atualizar a nossa lista de repositórios:

sudo apt update
b. Agora com a lista de repositórios atualizada, vamos instalar o npm . Lembre-se que ao instalar com apt , você pode utilizar o comando de qualquer local, e em todas as próximas vezes você não deverá reinstalar, só execute esse passo caso não tenha o npm instalado ainda.

sudo apt install npm
Agora vamos simular a criação de um projeto que utilizará a biblioteca do Jest para os testes. Com o npm devidamente instalado e verificado, crie uma pasta e entre nesta nova pasta que você criou.

mkdir my_new_project
cd my_new_project
Obs: É importante criar esta nova pasta para cada um dos seus projetos, pois além de ficar mais organizado, você vai evitar que as configurações de um projeto interfiram com outro, visto que o processo de instalação irá criar arquivos e pastas.
a. Após entrar na pasta, precisamos criar um novo package.json para o seu novo projeto.
O package.json é responsável por armazenar e descrever diversas informações de seu projeto, como a versão do node e do npm utilizadas, url do repositório, versão do projeto, dependências de produção e de desenvolvimento.
Para criar o package.json no seu projeto execute em seu terminal o comando abaixo:

npm init -y
Você terá o seguinte retorno:

Wrote to /home/cleyton/Documents/meuApp/package.json:
*/
{
  "name": "meuApp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

/*
Vamos analisar algumas das informações desse objeto:
A primeira chave "name", por padrão, terá o mesmo nome do diretório em que você criou o arquivo package.json . Ele representa o nome do seu projeto;
A versão atual do projeto é "1.0.0", ou seja a primeira versão;
Podemos adicionar alguma descrição na chave "description";
A chave "scripts" define um conjunto de scripts Node que podem ser executados.
Não se preocupe se essas informações ainda não fizerem sentido pra você. Futuramente vamos retornar e explicar o que cada um desses dados representa. No momento, é importante saber apenas que o package.json é um objeto que armazena uma série de informações sobre o seu projeto.
b. Agora precisamos editar nosso package.json . Você deve ter observado que na chave "test" em "script" temos a seguinte informação: "test": "echo \"Error: no test specified\" && exit 1" . Isso significa que a nossa aplicação ainda não possui um script que defina como lidar com testes. Então vamos trocar essa informação por "test": "jest" . Não se esqueça de salvar o arquivo. Após a alteração teremos algo parecido com:

*/

{
  "name": "meuApp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
 }

 /*
Por fim, vamos instalar o Jest , dentro da pasta que você criou no passo 3, executando o seguinte comando no terminal:

npm install --save-dev jest
Após rodar esse comando, vamos ver uma alteração importante que ocorreu no arquivo package.json . Para isso vamos abrir a pasta que você criou no seu VsCode com o comando abaixo:

code .
A sua pasta agora contém dois arquivos, o package.json e o package-lock.json e um novo diretório chamado node modules , estes últimos dois foram criados após você executar o comando npm install --save-dev jest . Ao abrirmos o arquivo package.json , veremos algo do tipo:


*/

{
  "name": "meuApp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^27.0.6"
  }
}

/*
Perceba que agora nosso arquivo package.json possui uma nova chave, "devDependencies" contendo o jest e a versão que está sendo utilizada neste projeto.
Agora, o que é "devDependencies"? O "devDependencies" define os pacotes instalados no projeto como dependências de desenvolvimento. Ou seja, são pacotes que serão importantes apenas para o desenvolvimento do projeto. Existe também uma chave chamada "dependencies", que, diferente da primeira, lista os pacotes instalados como dependências de produção.
E os outros dois?
O node_modules é a pasta que guarda todos os arquivos baixados das dependências instaladas.
O package-lock.json é um arquivo que “trava” as versões das dependências. Quando outra pessoa executar npm install ou npm i para baixar as dependências, este arquivo garante que serão instaladas as mesmas versões para todo mundo.
Aqui vale ressaltar mais um ponto. Lembra do arquivo .gitignore que vimos anteriormente? O .gitignore é utilizado para especificar arquivos ou diretórios que não queremos que sejam rastreados pelo git .
É considerado uma boa prática no desenvolvimento, inserir a pasta node_modules em um arquivo .gitignore em todo projeto que você criar. Isso porque essa pasta contém centenas de arquivos e o processo de adicionar o seu projeto a um repositório remoto pode acarretar em mais tempo se você incluir essa pasta. Além disso, suponha que alguém vá realizar o clone do seu projeto, o processo também demoraria muito mais, visto que essa pasta contém muitos arquivos, mas pera aí, essa pasta não é importante porque guarda todos os arquivos das dependências instaladas? Sim, você tem razão e é aí que os arquivos package.json e package-lock.json entram em cena. Ao clonar um projeto que contém dependências a serem instaladas, basta rodar dentro da pasta o comando npm install e todas as dependências e versões listadas nestes dois arquivos .json serão instaladas, criando a pasta node_modules .
Agora que você já está com tudo pronto, vamos pro conteúdo de testes em Jest que está maravilhoso!
Para testar sua instalação, vamos criar um arquivo chamado sum.test.js e colar o código abaixo dentro dele:


*/

const sum = (a, b) => a + b;

test('sums two values', () => {
  expect(sum(2, 3)).toEqual(5);
});

/*
Depois disso, vamos até o terminal digitar npm test , se você receber uma resposta parecida com a resposta abaixo, tudo certo com a instalação!

teste de instalação
Caso você não veja a tela acima, tente rever os passos, observe se você entrou na nova pasta que criou, verifique se não há a pasta node_modules já instalada na sua home ou pasta raiz, averigue o arquivo exemplo e o nome do arquivo, caso ele não tenha o .test ou .spec no nome, o Jest não tenta ler o arquivo, porque não reconhece como um arquivo de teste, isso será explicado melhor durante o conteúdo de hoje.
 */