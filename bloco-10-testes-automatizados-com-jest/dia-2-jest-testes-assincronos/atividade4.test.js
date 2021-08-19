// 4 - O código abaixo busca no GitHub de um usuário, de acordo com a URL, seus repositórios, e retorna uma lista como resultado. Dada a URL 'https://api.github.com/orgs/tryber/repos' , faça um teste que verifique que os repositórios 'sd-01-week4-5-project-todo-list' e 'sd-01-week4-5-project-meme-generator' se encontram nessa lista.

const fetch = require('node-fetch');

const getRepos = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return data.map((repo) => repo.name);
    });
};

const url = 'https://api.github.com/orgs/tryber/repos'

describe('Verificação de repositórios', ()=>{
  it('Retorna o repostório todo list?',() => {
    getRepos(url).then((repositorio) =>{
      expect(repositorio).toContain('sd-01-week4-5-project-todo-list');
    })
  })
  it('Retorna o repostório meme generator?',() => {
    getRepos(url).then((repositorio) =>{
      expect(repositorio).toContain('sd-01-week4-5-project-meme-generator' );
    })
  })
})

/*
.toContain(item)#
Use .toContain quando você deseja verificar se um item está em um array. Para testar os itens no array, este usa ===, uma verificação de igualdade estrita. .toContain também pode verificar se uma string é uma substring de outra string.

Por exemplo, se getAllFlavors() retorna um array de sabores e você quer ter certeza que lime está lá, você pode escrever:

test('the flavor list contains lime', () => {
  expect(getAllFlavors()).toContain('lime');
});

https://jestjs.io/pt-BR/docs/expect#tocontainitem
*/