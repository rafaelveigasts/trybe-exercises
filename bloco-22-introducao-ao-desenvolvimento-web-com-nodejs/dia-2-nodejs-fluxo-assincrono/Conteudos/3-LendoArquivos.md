## Lendo arquivos com métodos síncronos

Agora que entendemos como funcionam callbacks e promises, vamos nos aprofundar um pouco mais no módulo fs do node e na leitura e escrita de arquivos.

Primeiro, é importante saber que não precisamos ler arquivos "em segundo plano". Podemos fazer isso de forma síncrona, ou seja: parar a execução de todo o programa até que um arquivo seja lido.

Os métodos assíncronos não esperam o comando atual terminar para iniciar o próximo. Se quisermos ler um arquivo de maneira assíncrona, o Javascript não vai esperar o arquivo inteiro ser lido para só então dar continuidade ao script. Se quisermos esse comportamento, precisamos de um método síncrono . O método disponibilizado pelo módulo fs para leitura síncrona de arquivos é o fs.readFileSync . Vamos utilizá-lo no exemplo a seguir.

Para começar, vamos criar uma pasta para nosso projeto, chamada io-local . Iniciaremos nosso projeto Node.js usando o comando npm init . Feito isso, vamos criar um arquivo chamado readFileSync.js e colocar nele o seguinte código:
io-local/readFileSync.js

const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

try {
  const data = fs.readFileSync(nomeDoArquivo, 'utf8');
  console.log(data);
} catch (err) {
  console.error(`Erro ao ler o arquivo: ${err.path}`);
  console.log(err);
}

Logo após importarmos o módulo fs , criamos uma variável chamada nomeDoArquivo , contendo o nome (fixo) do arquivo que vamos ler e, em seguida, chamamos o método fs.readFileSync .

Rode o script com node readFileSync.js . Gerou um erro, certo? Isso aconteceu porque estamos tentando ler um arquivo que não existe! Vamos resolver esse probleminha daqui a pouco!

### Método fs.readFileSync

Esse método é responsável por ler arquivos e trazer seu conteúdo para dentro do Node.js. Por ser síncrono , ele espera a leitura do arquivo terminar para, só então, atribuir o resultado à constante data .

O método readFileSync recebe dois parâmetros:

1º O nome do arquivo;

2º Um parâmetro opcional que, quando é uma string, define o encoding que será utilizado durante a leitura do arquivo.

Mas e se ocorrer um erro na leitura do arquivo?

Com funções síncronas, como readFileSync , você deve tratar explicitamente os erros que puderem acontecer. Nesse exemplo, usamos um bloco try...catch para capturar quaisquer erros que possam acontecer durante a leitura do arquivo e imprimimos uma mensagem para o usuário no terminal.

Agora vamos resolver o probleminha que estamos tendo ao tentar ler o arquivo!

Nota : Antes de continuar, não se esqueça de criar um arquivo meu-arquivo.txt com algum conteúdo dentro!

Ao rodar o script readFileSync.js com o comando node readFileSync.js , você deverá ver o conteúdo do seu arquivo impresso no terminal.

Mas e se tivéssemos outras partes do script que não deveriam esperar a leitura do arquivo ser feita? Por exemplo, e se tivéssemos que ler vários arquivos ao mesmo tempo? Para isso, utilizamos um método assíncrono , que veremos a seguir.
