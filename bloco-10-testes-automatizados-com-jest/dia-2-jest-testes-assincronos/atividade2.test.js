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

// 2 - Utilizando a sintaxe de Promise , faça um teste que verifique o resultado da função getUserName para o caso em que o usuário é encontrado, e também um teste para o caso em que o usuário não é encontrado.

// Dica: Veja os dados falsos utilizados no banco de dados, disponíveis na variável users , para saber quais IDs existem.

describe('O ID existe?', ()=>
{
  it('Retorna id 1 = Mark?', ()=> 
  ( // aqui
    getUserName(1).then((user)=>{ 
    expect(user).toEqual("Mark");
    })
  )) // aqui
})

describe('Quando o ID não existe', () => 
{
  it('Retorna a mensagem de erro?', () => 
  {
    getUserName(3).catch((error)=>(
      expect(error.message).toMatch('User with ${id} not found.')
    ))
  })
})

/*
Como ela retorna uma Promise , é necessário adicionarmos o .then para pegar o seu resultado. linha 30.

Mudando o nome no toEqual (linha 31) ele continua passando, isso é um falso positivo. Para resolver este problema, é necessário que no teste retornemos a promise. Faremos isso mudando as chaves para parênteses nas linhas indicadas pelos comentários (linhas 29 e 33).

O .catch trabalha o resultado da promise quando ocorre um reject ; já o .then , quando ocorre o resolve .

*/