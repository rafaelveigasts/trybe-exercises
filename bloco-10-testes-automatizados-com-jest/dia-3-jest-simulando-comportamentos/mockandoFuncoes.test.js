/*
Mockando funções

O método jest.fn() configura-se como a forma mais simples de se mockar algo: ele transforma uma função em uma simulação. Ou seja: ao mockar uma função com o jest.fn() e fazer a chamada da mesma, o comportamento definido no mock será chamado, em vez da função original.

Ele é muito útil para casos como o do projeto Adivinhe a cor , em que precisamos ter controle das cores geradas aleatoriamente para testar tudo corretamente.

Imagine que a função geradora de cor aleatória seja essa e esteja no arquivo service.js :
*/

// Fazendo o teste para saber se a função é chamada, temos:

// const service = require('./service');

// test("#randomRgbColor", () => {
//   // testando se a função foi chamada
//   service.randomRgbColor();
//   expect(service.randomRgbColor).toHaveBeenCalled(); 
// });

/*
.toHaveBeenCalled()#
Também sob o pseudônimo: .toBeCalled()

Use .toHaveBeenCalled para garantir que uma função de simulação (mock, em inglês) foi chamada.
https://jestjs.io/pt-BR/docs/expect#tohavebeencalled 

Esse teste deveria passar, não? Afinal, a função foi chamada logo acima dele. Mas ele não passa, e o erro nos indica o que fazer:

Matcher error : received value must be a mock or spy function

Esse erro acontece porque a propriedade toHaveBeenCalled , assim como outras que serão ensinadas a seguir, são exclusivas para funções simuladas. 

Ou seja: 

se você não simula uma função, a propriedade não funciona corretamente.

Portanto, vamos utilizar o jest.fn() para testar a chamada dessa função:*/

// const service = require('./service');

// test("#randomRgbColor", () => {
  // testando se a função foi chamada. Não simulamos nenhum comportamento aqui, pois, para esse teste, isso não importa! Queremos saber se ela foi chamada e ponto final.
//   service.randomRgbColor = jest.fn();

//   service.randomRgbColor();
//   expect(service.randomRgbColor).toHaveBeenCalled();
// });

/*
Ao declarar service.randomRgbColor = jest.fn(); , estamos dizendo ao teste que, a partir daquele momento, estamos tomando controle da função service.randomRgbColor e que ela será uma simulação da função original.

Por ser uma simulação, podemos especificar qual vai ser o retorno da função. Basicamente, o que podemos dizer é: "No contexto deste teste, quando essa função for chamada, ela retornará o valor que eu defini, ao invés de um valor aleatório!" . 

Duas propriedades nos permitem fazer essa declaração: mockReturnValue(value) e mockReturnValueOnce(value) . O mockReturnValue define um valor padrão de retorno. Já o mockReturnValueOnce retorna o valor definido apenas uma vez, e é importante, pois pode ser encadeado para que chamadas sucessivas retornem valores diferentes.
*/

// const service = require('./service');

// test("#randomRgbColor", () => {
//   // testando se a função foi chamada e qual seu retorno
//   service.randomRgbColor = jest.fn().mockReturnValue("rgb(255, 255, 255)");

//   service.randomRgbColor();
//   expect(service.randomRgbColor).toHaveBeenCalled();
//   expect(service.randomRgbColor()).toBe("rgb(255, 255, 255)");
// });


/* Na terceira linha do exemplo acima, estamos manualmente chamando a função service.randomRgbColor(); . Caso isso não seja feito, o teste expect(service.randomRgbColor).toHaveBeenCalled() irá falhar. Isso acontece porque mockar uma função redefine seu comportamento, mas não a executa. 

A propriedade toHaveBeenCalled() espera que a função dentro do expect tenha sido executada por alguma chamada anterior a essa linha dentro do contexto desse teste.

Além disso, podemos também testar quantas vezes a função foi chamada. Para isso, utilizamos a propriedade toHaveBeenCalledTimes(number) :
 */
const service = require('./service');

test("#randomRgbColor", () => {
  // testando quantas vezes a função foi chamada e qual seu retorno
  service.randomRgbColor = jest
    .fn()
    .mockReturnValue('default value')
    .mockReturnValueOnce('first call')
    .mockReturnValueOnce('second call');

  expect(service.randomRgbColor).toHaveBeenCalledTimes(0);

  expect(service.randomRgbColor()).toBe("first call");
  expect(service.randomRgbColor).toHaveBeenCalledTimes(1);

  expect(service.randomRgbColor()).toBe("second call");
  expect(service.randomRgbColor).toHaveBeenCalledTimes(2);

  expect(service.randomRgbColor()).toBe("default value");
  expect(service.randomRgbColor).toHaveBeenCalledTimes(3);
});

// É possível implementar vários comportamentos em uma simulação. No exemplo acima, note que a implementação mockReturnValueOnce se sobrepõe em relação a mockReturnValue , que se torna um padrão apenas após os retornos de mockReturnValueOnce serem executados.
