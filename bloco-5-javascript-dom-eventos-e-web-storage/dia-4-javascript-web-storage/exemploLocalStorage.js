/*O script abaixo exemplifica um dos usos do localStorage. Recomendamos tirar um tempo para analisar bem cada função.
Um bom ponto de atenção para decidir quando você deve usar um ou outro é perguntar a si mesmo sobre a importância da permanência da informação que você vai armazenar.*/

const button = document.getElementById('add-button');
const input = document.getElementById('phrases-input');
const list = document.getElementById('phrases-list');

function addPhraseToLocalStorage() {
  const oldList = JSON.parse(localStorage.getItem('phrases'));
  const phraseText = input.value;
  oldList.push(phraseText);
  localStorage.setItem('phrases', JSON.stringify(oldList));
  insertPhraseInDOM();
};
/*JSON.stringify() converte um valor para uma notação JSON que o representa:

Se o valor tiver um método toJSON(), é responsável por definir quais dados serão serializados.
Boolean, Number, and String os objetos são convertidos para os valores primitivos correspondentes durante a stringificação, de acordo com a semântica de conversão.
Se undefined, uma função, ou um symbol é encontrado durante a conversão é omitido (quando é encontrado em um objeto) ou censurado para null (quando é encontrado em um Array). JSON.stringify pode também somente retornar undefined ao passar valores puros como JSON.stringify(function(){}) ou JSON.stringify(undefined).
Todas as propriedades com chave de símbolo serão completamente ignoradas, mesmo quando usar a função  replacer.
Propriedades não enumeráveis serão ignoradas.*/

function insertPhraseInDOM() {
  const phrasesList = JSON.parse(localStorage.getItem('phrases'));
  const listLength = phrasesList.length - 1;
  const phraseText = phrasesList[listLength];
  const phrase = document.createElement('li');
  phrase.innerText = phraseText;
  list.appendChild(phrase);
};

function initialRenderization() {
  if (localStorage.getItem('phrases') === null) {
    localStorage.setItem('phrases', JSON.stringify([]));
  } else {
    const phrasesList = JSON.parse(localStorage.getItem('phrases'));
    const listLength = phrasesList.length - 1;
    for (let index = 0; index <= listLength; index += 1) {
      const listElement = document.createElement('li');
      listElement.innerText = phrasesList[index];
      list.appendChild(listElement);
    };
  };
};

button.addEventListener('click', addPhraseToLocalStorage);

window.onload = function() {
  initialRenderization();
};