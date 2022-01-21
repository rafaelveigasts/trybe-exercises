## REST no Express

De maneira geral, usar o Express ou qualquer outro framework não deve fazer muita diferença. Os princípios devem ser seguidos independente da tecnologia que você usar na implementação da sua API. Ela pode ser escrita em Node.js, em Python, em Perl, tanto faz.

Uma das vantagens de se usar o Express para construção de APIs é a organização das rotas. Podemos definir N controllers (funções callback que lidam com as requisições) para a mesma rota, separando-as apenas pelo verbo HTTP da requisição.

Além disso, é simples retornar um formato específico solicitado pelo cliente, da mesma maneira que é simples retornar um status HTTP.

app.route('/user')
  .get((req, res) => {
    // Realiza uma operação
    res.status(401).send({
      message: 'Usuário não autorizado'
    })
  })
  .post(...)
  .put(...)
  .delete(...)