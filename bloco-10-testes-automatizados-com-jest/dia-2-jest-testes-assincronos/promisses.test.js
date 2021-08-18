/* 
Promises
Para testar uma promise será usado o código abaixo. Ele possui um array ( Animals ) contendo animais com nome , idade e tipo .
A função findAnimalsByType é responsável por buscar animais contidos no array por meio de seu tipo, porém ela faz isso de maneira assíncrona, logo seu retorno será uma Promise . Quando os animais forem encontrados, a promise será resolvida ( resolve ) com um array contendo todos eles, e quando não forem, será rejeitada ( reject ) com um objeto de error.
 */
// const Animals = [
//   { name: 'Dorminhoco', age: 1, type: 'Dog' },
//   { name: 'Soneca', age: 2, type: 'Dog' },
//   { name: 'Preguiça', age: 5, type: 'Cat' },
// ];

// const findAnimalsByType = (type) => (
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const arrayAnimals = Animals.filter((animal) => animal.type === type);

//       if (arrayAnimals.length !== 0) {
//         return resolve(arrayAnimals);
//       }

//       return reject(new Error('Não possui esse tipo de animal.'));
//     }, 100);
//   })
// );

// O primeiro teste desse código verificará se, ao chamar a função findAnimalsByType com Dog como parâmetro, o seu retorno será os dois cachorros do array Animals . cod certo abaixo

const Animals = [
  { name: 'Dorminhoco', age: 1, type: 'Dog' },
  { name: 'Soneca', age: 2, type: 'Dog' },
  { name: 'Preguiça', age: 5, type: 'Cat' },
];

const findAnimalsByType = (type) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const arrayAnimals = Animals.filter((animal) => animal.type === type);

      if (arrayAnimals.length !== 0) {
        return resolve(arrayAnimals);
      }

      return reject(new Error('Não possui esse tipo de animal.'));
    }, 100);
  })
);

describe('Quando o tipo do animal existe', () => {
  test('Retorne a lista de animais', () => (
    findAnimalsByType('Dog').then((listDogs) => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    })
  ));
});

// Rode o teste e verifique se ele não está dando algum falso-positivo. Mude o Dorminhoco para Agitado . Viu? O teste não passou, logo não possui falso-positivos.
// Agora veja o passo a passo de como o teste foi feito.
// Primeiro criamos o describe, onde os testes serão executados.

describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {

  });
});

// Agora, adicione a função a ser testada. Como ela retorna uma Promise , é necessário adicionarmos o .then para pegar o seu resultado.

describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    findAnimalsByType('Dog').then((listDogs) => {

    });
  });
});

// Agora adicione os testes e os execute.

describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    findAnimalsByType('Dog').then((listDogs) => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    });
  });
});

// Verifique se deu algum falso-positivo, mude o nome do Dorminhoco para Bob . Observe:
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    findAnimalsByType('Dog').then((listDogs) => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    });
  });
});

// O teste continuou passando sem encontrar o erro (o que não era o esperado), o que indica que ele está com um falso-positivo.
// Para resolver este problema, é necessário que no teste retornemos a promise. Faremos isso mudando as chaves para parênteses nas linhas indicadas pelos comentários.

describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => ( // aqui
    findAnimalsByType('Dog').then((listDogs) => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    })
  )); // e aqui
});

// Agora o teste conseguiu identificar o erro, retornando que esperava Bob , mas recebeu o Dorminhoco . Como esse teste conseguiu encontrar o erro, fica claro que o problema de resultados falso-positivos foi resolvido. Desfaça as alterações para que o teste volte a funcionar.
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => (
    findAnimalsByType('Dog').then((listDogs) => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    })
  ));
});

// Essa promise possui dois casos: quando ela funciona, ocorre o resolve e, no erro, ocorre o reject . Como o resolve já foi testado, faltam apenas os testes do erro.
// O código abaixo testa, exatamente, o caso de erro.

describe('Quando o tipo do animal, não existe', () => {
  test('Retorne a lista de animais', () => (
    findAnimalsByType('Lion').catch((error) => (
      expect(error.message).toMatch('Não possui esse tipo de animal.')
    ))
  ));
});

/* 
Como o array Animals não possui nenhum com o type Lion , será disparada a reject , que retornará um objeto de erro contendo a chave message com o valor "Não possui esse tipo de animal." . A diferença entre esse teste e os outros é o .catch no lugar do .then . O .catch trabalha o resultado da promise quando ocorre um reject ; já o .then , quando ocorre o resolve .
Embora o código acima pareça estar correto, ele testa somente casos em que a função se comporta adequadamente e lança o erro. O que aconteceria se a implementação da função findAnimalsByType estivesse incorreta? Vamos testar.
Mude a função para em vez de usar o reject também usar o resolve quando o animal não for encontrado:
*/
// const findAnimalsByType = (type) => (
//   new Promise((resolve) => { // linha alterada
//     setTimeout(() => {
//       const arrayAnimals = Animals.filter((animal) => animal.type === type);

//       if (arrayAnimals.length !== 0) {
//         return resolve(arrayAnimals);
//       }

//       return resolve(new Error('Não possui esse tipo de animal.')); // linha alterada
//     }, 100);
//   })
// );

/* 
Agora rodamos novamente o teste e... Passou?!
Isso acontece porque como a promise retornada pela função não foi rejeitada o código dentro do catch (onde estão nossas asserções) não foi executado, logo nenhuma delas teve a chance de falhar, fazendo que por padrão o teste passe.
Para contornar este problema, o jest tem a função expect.assertions() , com ela podemos especificar quantas vezes esperamos que o teste faça asserções. Dessa forma, garantimos que todas elas foram executadas, e caso não sejam, o teste falha por outro motivo (quantidade de asserções). Vamos modificar o teste: 
*/

describe('Quando o tipo do animal, não existe', () => {
  test('Retorne a lista de animais', () => {
    expect.assertions(1);
    return findAnimalsByType('Lion').catch((error) => (
      expect(error.message).toMatch('Não possui esse tipo de animal.')
    ));
  });
});

// Execute-o novamente e agora repare que ele falha com uma mensagem dizendo que era esperada uma asserção, porém não houve nenhuma. Agora desfaça as alterações na função findAnimalsByType e rode o teste mais uma vez, ele deverá passar normalmente.
