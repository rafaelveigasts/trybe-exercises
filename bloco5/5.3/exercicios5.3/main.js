const firstDiv = document.getElementById('first-div');
const secondDiv = document.getElementById('second-div');
const thirdDiv = document.getElementById('third-div');
const input = document.getElementById('input');
const myWebpage = document.getElementById('my-spotrybefy');

/*
 1. Copie esse arquivo e edite apenas ele;
 2. Crie uma função que adicione a classe 'tech' ao elemento selecionado;
 2.1. Deve existir apenas um elemento com a classe 'tech'. Como você faz isso?*/

 function handleChangeTech(event) {
  const techElement = document.querySelector('.tech'); //localiza todas as divs
  techElement.classList.remove('tech'); // remove todas as classes tech de todas as divs
  event.target.classList.add('tech'); // adiciona ao evento click a classe tech
  input.value = ''; //Por fim, limpamos nosso input, inserindo uma string vazia em seu campo de texto.
}

firstDiv.addEventListener('click', handleChangeTech);
secondDiv.addEventListener('click', handleChangeTech);
thirdDiv.addEventListener('click', handleChangeTech);

/* explicação do gabarito:
A seção acima atribui uma função ao evento de clique nas nossas Divs. Essa função, primeiramente recebe o "event" como parâmetro, que é um objeto que contém informações sobre o evento que foi disparado no momento. Dentro dele existe a chave "target", que é uma referência ao elemento que deu início ao evento.
Na primeira linha dentro da função, atribuimos o elemento com a classe "tech" à uma variável e na linha seguinte, removemos essa classe do elemento. E após isso, atribuimos essa classe ao "event.target", que é a propriedade que discutimos no parágrafo anterior. Por fim, limpamos nosso input, inserindo uma string vazia em seu campo de texto.
Resumindo, tiramos a classe "tech" da Div que possuir ela, inserimos essa mesma classe na Div em que a gente clicou e aí limpamos nosso input.
Isso funciona como se estivéssemos selecionando a Div em que queremos escrever o título da música.
*/


 /*
3. Crie uma função que, ao digitar na caixa de texto, altere o texto do elemento
com a classe 'tech';*/

input.addEventListener('input', function(event) {
  const techElement = document.querySelector('.tech');
  techElement.innerText = event.target.value;
});



/* explicação do gabarito:
AVimos no bloco de código anterior que primeiro criamos uma função e depois chamamos seu nome no segundo parâmetro do "addEventListener". Mas é possível criarmos uma função diretamente nesse campo, inclusive, isso foi feito nessas duas funções. Percebe que elas não têm um nome? Isso é permitido e o nome desse recurso é "função anônima". Mais adiante no curso você aprenderá outras formas de criar funções como essa.
A primeira função adiciona um evento "input" na nossa caixa de texto. Isso vai disparar uma função que irá adicionar o valor do input na Div que atualmente está com a classe "tech".
Pedimos uma atenção ao nome do evento da segunda função, que é "dblclick", que significa que a função apenas será acionada quando houverem dois cliques em sequência. E a ação disparada é pegar a URL atual com window.location e substituir por outro link usando .replace('https://blog.betrybe.com/') .
*/


/*
4. Crie uma função que, ao clicar duas vezes em 'Meu top 3 do Spotrybefy', ele redirecione para alguma página;*/


myWebpage.addEventListener('dblclick', function() {
  window.location.replace('https://blog.betrybe.com/');
  // window.open('https://blog.betrybe.com/'); aqui abre em outra aba

});

/*
5. Que tal redirecionar para seu portifólio?
 Crie uma função que, ao passar o mouse sobre 'Meu top 3 do Spotrybefy', altere a cor do mesmo;*/


myWebpage.addEventListener('mouseover', function(event) {
  event.target.style.color = 'red';
});

myWebpage.addEventListener('mouseleave', function(event) {
  event.target.style.color = 'unset';
});




/* explicação do gabarito:
Agora temos mais duas funções, a primeira faz com que o texto do elemento fique com a fonte vermelha quando o mouse passar por ele, já a segunda adiciona o valor "unset" para a cor da fonte. Isso significa que esse estilo irá "resetar" a cor do elemento quando o mouse sair dele.
Esse é o fim do script desse exercício de fixação. Lembre-se que não há problemas em não entender a matéria de primeira, apenas não esqueça de sempre tirar suas dúvidas e praticar muito. Nós garantimos que os resultados irão chegar o quanto antes 
*/

/*
Segue abaixo um exemplo do uso de event.target:*/


function resetText(event) {
  // O Event é passado como um parâmetro para a função.
  event.target.innerText = 'Opção reiniciada';
  // O event possui várias propriedades, porém a mais usada é o event.target,
  // que retorna o objeto que disparou o evento.
}

firstDiv.addEventListener('dblclick', resetText);
secondDiv.addEventListener('dblclick', resetText);
thirdDiv.addEventListener('dblclick', resetText);

// Não precisa passar o parâmetro dentro do addEventListener. O próprio
// navegador fará esse trabalho por você, não é legal? Desse jeito, o
// event.target na nossa função retornará o objeto 'divUm'.*/