/*Os Mocks

O objetivo de se mockar uma função, módulo ou requisição é permitir a quem desenvolve ter controle sobre todo o funcionamento de seus testes. Pense no projeto bônus do bloco 5, o Adivinhe a cor , em que era necessário gerar cores aleatórias. Como testar essas cores, se não sabemos quais serão geradas? Pense também em uma requisição de API que constantemente muda seu retorno. Como ter certeza do seu retorno e, principalmente, de que seu teste não está caindo em um falso-positivo ?

No exemplo abaixo, podemos ver um caso em que simular o comportamento da função seria necessário para o teste:
*/

const retornaNumeroAleatorio = () => Math.floor(Math.random() * 100);
const divisivelPorDois = () => ((retornaNumeroAleatorio() % 2) === 0);

test('quando o número aleatório é par, a função retorna `true`', () => {
  expect(divisivelPorDois()).toBe(true); // Como garantimos que o número retornado será par?
});
console.log(retornaNumeroAleatorio());

// Mockar o comportamento da função retornaNumeroAleatorio() para garantir que ela está, nesse teste, retornando um número par, seria a solução pra esse impasse!

// Dentre as principais formas de se mockar algo em Jest, destacam-se três:

// jest.fn();
// jest.mock();
// jest.spyOn();