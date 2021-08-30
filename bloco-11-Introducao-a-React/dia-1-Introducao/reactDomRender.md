**ReactDOM.render**

O ReactDOM.render é o responsável por renderizar e atualizar seu código dentro do HTML , exibindo seus elementos React .

Todas as vezes que fizermos alguma alteração no código, seja através de uma função ou interação de quem usa, o React DOM compara o elemento novo e seus elementos filhos com os anteriores e aplica mudanças somente onde é necessário para levar a aplicação ao estado desejado. Vamos ver um exemplo:


function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);

Neste exemplo, estamos chamando a função tick que chama o ReactDOM.render a cada segundo, e injeta no elemento pai com id root um 'Hello World' e o horário. Inspecionando o codigo em execução no navegador visualizamos o seguinte evento:

Diferente de elementos DOM do navegador, elementos React são objetos simples e utilizam menos recursos. Pela atualização precisa do DOM, e pela sua composição, o React apresenta grandes avanços na velocidade de processamento.