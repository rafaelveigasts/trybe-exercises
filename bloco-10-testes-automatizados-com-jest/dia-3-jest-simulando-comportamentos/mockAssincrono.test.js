/*
Mock e funções assíncronas

Os testes que dependem de requisições são os mais beneficiados com o uso do mock . Excluem problemáticas como falha na API, instabilidade de internet e tamanho de retorno.

Requisições para APIs podem levar vários segundos para serem realizadas, descartando todas as problemáticas listadas acima. Imagine que você precise fazer 15 testes que dependem dessas requisições. Se torna inviável fazer 15 requisições, pois pode aumentar muito o tempo para a realização de todos os testes, além de sobrecarregar a API com chamadas cada vez que for fazer um teste!

Da mesma maneira que podemos mockar funções síncronas, podemos fazê-lo com as assícronas. A diferença se dá nas implementações.

Nas funções assíncronas, utilizamos o mockResolvedValue(value) ou o mockRejectedValue(value) . 

Assim como nas demais implementações, podemos definir o retorno para apenas uma chamada com mockResolvedValueOnce(value) ou mockRejectedValueOnce(value) .

Temos, num arquivo api.js , uma requisição para a API Estúdios Ghibli:

function fetchURL() {
  return fetch('https://ghibliapi.herokuapp.com/species').then(response =>
    response
      .json()
      .then(json =>
        response.ok ? Promise.resolve(json) : Promise.reject(json)
      )
  );
}
module.exports = { fetchURL };


O retorno dessa requisição será um array com de 200 posições no seguinte formato:

[
  {
    id: "b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    name: "Spirit",
    classification: "Spirit",
    eye_colors: "Red",
    hair_colors: "Light Orange",
    url:
      "https://ghibliapi.herokuapp.com/species/b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    people: [
      "https://ghibliapi.herokuapp.com/people/ca568e87-4ce2-4afa-a6c5-51f4ae80a60b"
    ],
    films: [
      "https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6"
    ]
  },
 ...
];

No próximo exemplo vamos mockar a requisição e fazer dois testes: implementar um valor para quando a promise for resolvida e para quando ela for rejeitada.

 */

// const api = require("./api");

// describe("testando a requisição", () => {
//   const apiURL = jest.spyOn( api, "fetchURL");
//   afterEach(apiURL.mockReset);

//   test("testando requisição caso a promise resolva", async () => {
//     apiURL.mockResolvedValue('requisição realizada com sucesso');

//     apiURL();
//     expect(apiURL).toHaveBeenCalled();
//     expect(apiURL).toHaveBeenCalledTimes(1);
//     expect(apiURL()).resolves.toBe('requisição realizada com sucesso');
//     expect(apiURL).toHaveBeenCalledTimes(2);
//   });

//   test("testando requisição caso a promise seja rejeitada", async () => {
//     apiURL.mockRejectedValue('a requisição falhou');

//     expect(apiURL).toHaveBeenCalledTimes(0);
//     expect(apiURL()).rejects.toMatch('a requisição falhou');
//     expect(apiURL).toHaveBeenCalledTimes(1);
//   });
// });

// Caso queira simular os efeitos colaterais da API, você pode definir o retorno como um objeto JSON. No exemplo abaixo, ao invés de carregar um array de 200 objetos, vamos definir o retorno com apenas 1.

const api = require("./api");

const requestReturn = [
  { 
    id: "b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    name: "Spirit",
    classification: "Spirit",
    eye_colors: "Red",
    hair_colors: "Light Orange",
    url:
      "https://ghibliapi.herokuapp.com/species/b5a92d0e-5fb4-43d4-ba60-c012135958e4",
    people: [
      "https://ghibliapi.herokuapp.com/people/ca568e87-4ce2-4afa-a6c5-51f4ae80a60b"
    ],
    films: [
      "https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6"
    ]
  }
];

test("testando requisição caso a promise resolva", async () => {
  apiURL = jest.fn().mockResolvedValue(requestReturn);

  // Mesma aplicação dos testes do exemplo anterior...
});