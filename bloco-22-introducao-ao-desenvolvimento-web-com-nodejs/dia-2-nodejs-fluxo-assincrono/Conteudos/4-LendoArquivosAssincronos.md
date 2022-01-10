## Lendo arquivos com métodos assíncronos

O método fornecido pelo módulo fs para leitura assíncrona de arquivos é o fs.readFile . Na versão padrão do fs , a função readFile aceita um callback, que é chamado quando a leitura do arquivo termina.

Continue lendo para ver o método fs.readFile em ação.

Vamos criar um arquivo chamado readFile.js dentro da nossa pasta io-local e colocar nele o seguinte código:
io-local/readFile.js

const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

fs.readFile(nomeDoArquivo, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${nomeDoArquivo}\n Erro: ${err}`);
    process.exit(1);
  }
  console.log(`Conteúdo do arquivo: ${data}`);
});

### Método fs.readFile

Esse método também é responsável por ler arquivos e trazer seu conteúdo para dentro do Node.js.

Ele recebe três parâmetros:

1º O nome do arquivo;

2º Um parâmetro opcional que, quando é uma string, define o encoding que será utilizado durante a leitura do arquivo;

3º Uma callback que permite receber e manipular os dados lidos do arquivo.

A callback é uma função que recebe dois parâmetros: err e data . Caso ocorra um erro durante a leitura do arquivo, o parâmetro err virá preenchido com as informações referentes ao erro. Quando esse parâmetro vier vazio, significa que a leitura do conteúdo do arquivo ocorreu sem problemas. Nesse caso, o segundo parâmetro, data , virá preenchido com o conteúdo do arquivo.

Rode o comando node readFile.js . Você obterá uma saída semelhante a esta: Conteúdo do arquivo: Meu texto! Meu texto! Meu texto! Meu texto! .

O tipo de encoding que escolhemos é muito importante. Se não for especificado, por padrão, o arquivo será lido como raw buffer , que é um formato muito útil quando estamos enviando dados através de requisições HTTP. No nosso caso, como queremos manipular o conteúdo do arquivo como uma string, então o certo é especificar o encoding.

Nota : É importante lembrar que esses dados ficam armazenados em memória. Ou seja, caso você tenha um arquivo de 1GB de texto, você trará 1GB de dados para a memória RAM.

No entanto, essa não é a única forma do método readFile . O módulo fs possui um segundo modelo de API que, em vez de trabalhar com callbacks, retorna Promises, o que torna seu uso muito mais recomendável.

Para utilizar a interface de Promises do fs , precisamos alterar a importação do módulo fs , importando, agora ('fs').promises . Vamos ver como ficaria o código acima se utilizarmos Promises:
io-local/readFile.js

const fs = require('fs').promises;

const nomeDoArquivo = 'meu-arquivo.txt';

fs.readFile(nomeDoArquivo, 'utf8')
  .then((data) => {
    console.log(`Conteúdo do arquivo: ${data}`);
  })
  .catch((err) => {
    console.error(`Não foi possível ler o arquivo ${nomeDoArquivo}\n Erro: ${err}`);
    process.exit(1); // Encerra a execução do script e informa ao sistema operacional que houve um erro com código
  });