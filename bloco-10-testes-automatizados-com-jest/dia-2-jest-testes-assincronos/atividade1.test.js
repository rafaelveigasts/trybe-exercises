// Agora a prática
// 1 - Escreva um teste que verifique a chamada do callback de uma função uppercase , que transforma as letras de uma palavra em letras maiúsculas. Lembre-se de ter cuidado com os falso-positivos em testes assíncronos.

const uppercase = (str, callback) => {
  setTimeout(() => {
    callback(str.toUpperCase());
  }, 500);
};

describe("Verifica a chamada callback", () => {
  test("Converte para maiúscula?", (done) => { 
    uppercase("Xulambs", (str) => {
      try {
        expect(str).toBe("XULAMBS");
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});

/*
Para que o Jest espere a função assíncrona ser finalizada, é necessário utilizar uma callback própria da biblioteca, chamada done , que precisa ser chamada após os testes assíncronos.  linha 11

Para resolver este problema podemos colocar um try/catch em volta da nossa asserção(expect) linha 13. Dessa forma, caso ela falhe, chamamos a callback done dentro do bloco do catch linha 16.  

o código acima irá gerar um falso-positivo, o motivo é que quando chamamos a callback dentro do catch também precisamos passar como argumento o erro capturado: (função correta) linha 17
*/