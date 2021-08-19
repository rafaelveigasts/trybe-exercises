// Código base para os exercícios 2 e 3:
// O código a seguir simula uma chamada ao banco de dados para buscar usuários. O resultado dessa busca é uma Promise , que é utilizada pelo método getUserName .

const users = [
  { id: 1, name: "Mark" },
  { id: 2, name: "Paul" },
];

const findUserById = (id) =>
  new Promise((resolve, reject) => {
    const result = users.find((user) => user.id === id);

    if (result) {
      return resolve(result);
    }

    return reject(new Error(`User with ${id} not found.`));
  });

const getUserName = (userId) => findUserById(userId).then((user) => user.name);

// 3 - Reescreva o teste do exercício anterior, desta vez utilizando a sintaxe de async/await .
// Dica: Utilize o try/catch para o caso de erro.

describe('O ID existe?', ()=>
{
  it('Retorna id 1 = Mark?', async ()=>{
    const result = await getUserName(1);
    expect(result).toEqual('Mark')
  });
});

/*
Como existe uma promise a ser testada, é necessário o uso do await , para que o teste espere a finalização da promise e, em seguida, execute o teste remanescente. A variável result recebe o retorno da promise que será utilizado para fazer as asserções.
*/