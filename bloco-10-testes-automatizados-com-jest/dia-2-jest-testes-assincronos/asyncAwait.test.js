// Async/Await
// Para testar o código Async/Await , será usado o mesmo código anterior, mas com pequenas mudanças. Observe:

test('Testando com async/await', async () => { // o teste fica assíncrono
  const listDogs = await findAnimalsByType('Dog');
  expect(listDogs[0].name).toEqual('Dorminhoco');
  expect(listDogs[1].name).toEqual('Soneca');
});

// Perceba que a diferença entre elas é o async . Como existe uma promise a ser testada, é necessário o uso do await , para que o teste espere a finalização da promise e, em seguida, execute o teste remanescente. A variável listDogs recebe o retorno da promise que será utilizado para fazer as asserções.

// Abaixo está o código para quando ocorre o reject da promise. É necessário adicionar o bloco try/catch .

test('Testando com async/await, testando o reject', async () => {
  try {
    await findAnimalsByType('Lion');
  } catch (error) {
    expect(error).toEqual(new Error('Não possui esse tipo de animal.'));
  }
});

// Também é possivel combinar async/await com .resolves/.rejects :

describe('Testando Async/Await - findAnimalsByType', () => {
  describe('Quando o tipo do animal existe', () => {
    test('Retorne a lista de animais', async () => {
      const listDogs = [
        { name: 'Dorminhoco', age: 1, type: 'Dog' },
        { name: 'Soneca', age: 2, type: 'Dog' },
      ];
      await expect(findAnimalsByType('Dog')).resolves.toEqual(listDogs);
    });
  });

  describe('Quando o tipo de animal não existe', () => {
    test('Retorna um erro', async () => {
      expect.assertions(1);
      await expect(findAnimalsByType('Lion')).rejects
        .toEqual(new Error('Não possui esse tipo de animal.'));
    });
  });
});
