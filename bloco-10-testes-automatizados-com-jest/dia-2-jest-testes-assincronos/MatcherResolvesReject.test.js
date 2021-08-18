/* 
Matcher .resolves / .rejects
No Jest 20.0.0, para simplificar ainda mais os testes, foram adicionados os matchers .resolves e .rejects .
O .resolves espera a promise ser resolvida. Caso a promise seja rejeitada, o teste automaticamente irá falhar.
O .rejects espera a promise ser rejeitada. Caso a promise seja resolvida, o teste automaticamente irá falhar.
 */

describe('Testando promise - findAnimalsByType', () => {
  describe('Quando o tipo do animal existe', () => {
    test('Retorne a lista de animais', () => {
      const listDogs = [
        { name: 'Dorminhoco', age: 1, type: 'Dog' },
        { name: 'Soneca', age: 2, type: 'Dog' },
      ];
      return expect(findAnimalsByType('Dog')).resolves.toEqual(listDogs);
    });
  });

  describe('Quando o tipo de animal não existe', () => {
    test('Retorna um erro', () => (
      expect(findAnimalsByType('Lion'))
        .rejects.toEqual(new Error('Não possui esse tipo de animal.'))
    ));
  });
});

/* 
Observe que desta forma não é necessário utilizar o expect.assertions , pois os matchers verificam o estado da promise. Experimente mudar a implementação da função findAnimalsByType como fizemos anteriormente (trocando o reject por resolve no caso onde o animal não é encontrado) e verifique que agora o teste irá falhar identificando que foi recebida uma promise resolvida, quando deveria ser rejeitada.
Da mesma forma que retornávamos a promise, também devemos retornar o resultado do expect.

Por que retornamos o resultado do expect? (Opcional)
Quando usamos os matchers .resolves ou .reject o resultado do expect será uma promise ( surprise! ), logo no fundo estamos fazendo a mesma coisa, porém, ao invés de retornar a promise gerada pela função retornamos a promise gerada pela cadeia de matchers. Vamos fazer um experimento para entender melhor. Crie um arquivo com o nome de sua preferência, lembre-se que ele deverá ter a extensão .test.js ou .spec.js , por exemplo experimentos.test.js . Copie o seguinte teste e em seguida o execute:
 */

describe('Jest', () => {
  test('Brincando com expect', () => {
    const expectA = expect(true).toBeTruthy();
    const expectB = expect(Promise.resolve('Oi Tryber!')).resolves.toEqual('Oi Tryber!');
    const expectC = expect(Promise.reject(new Error('ERROR')))
      .rejects.toEqual(new Error('ERROR'));
    console.log('expect', expectA);
    console.log('expect.resolves', expectB);
    console.log('expect.rejects', expectC);
  });
});

// Perceba que o retorno do primeiro expect (que não tem os matchers) é undefined , porém o retorno do segundo e do terceiro (que tem os matchers) é uma promise .