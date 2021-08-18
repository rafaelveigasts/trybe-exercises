const button = document.getElementById('add-button');
const input = document.getElementById('phrases-input');
const list = document.getElementById('phrases-list');

function addPhraseToSessionStorage() {
  if (sessionStorage.getItem('phrases') === null) {
    sessionStorage.setItem('phrases', JSON.stringify([]));
  }
  const oldList = JSON.parse(sessionStorage.getItem('phrases'));
  const phraseText = input.value;
  oldList.push(phraseText);
  sessionStorage.setItem('phrases', JSON.stringify(oldList));
  insertPhraseInDOM();
};

/*JSON.stringify() converte um valor para uma notação JSON que o representa:

Se o valor tiver um método toJSON(), é responsável por definir quais dados serão serializados.
Boolean, Number, and String os objetos são convertidos para os valores primitivos correspondentes durante a stringificação, de acordo com a semântica de conversão.
Se undefined, uma função, ou um symbol é encontrado durante a conversão é omitido (quando é encontrado em um objeto) ou censurado para null (quando é encontrado em um Array). JSON.stringify pode também somente retornar undefined ao passar valores puros como JSON.stringify(function(){}) ou JSON.stringify(undefined).
Todas as propriedades com chave de símbolo serão completamente ignoradas, mesmo quando usar a função  replacer.
Propriedades não enumeráveis serão ignoradas.*/

function insertPhraseInDOM() {
  const phrasesList = JSON.parse(sessionStorage.getItem('phrases'));
  const listLength = phrasesList.length - 1;
  const phraseText = phrasesList[listLength];
  const phrase = document.createElement('li');
  phrase.innerText = phraseText;
  list.appendChild(phrase);
};

button.addEventListener('click', addPhraseToSessionStorage);