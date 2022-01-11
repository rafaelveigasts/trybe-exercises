// Importar o módulo fs/promises e realizar a leitura do arquivo
const fs = require('fs').promises;

//Converter o conteúdo do arquivo de JSON para um Array utilizando JSON.parse

//Mapear cada objeto do Array para uma string no formato correto

//Exibir as strings na tela

fs.readFile('./simpsons.json', 'utf-8')
  .then((fileContent) => {
    return JSON.parse(fileContent);
  })
  .then((simpsons) => {
    return simpsons.map(({ id, name }) => `${id} - ${name}`);
  })
     .then((strings) => {
       strings.forEach((string) => console.log(string));
     });

