## Agora, a prática

PARA INICIAR O PROJETO VEJA O CONTEUDO DO DIA 1 INSTRUÇÕES.


Antes de começar, crie um novo projeto chamado hello-jwt utilizando o comando npm init @tryber/backend hello-jwt , aceitando as opções padrão.

1) Crie um endpoint POST /login

2) O endpoint deve receber os seguintes dados no corpo da requisição:

{
  "username": "someUsername",
  "password": "somePassword"
}

Caso username e password sejam válidos, retorne um token que atenda às seguintes especificações:

  Expira em uma hora;
  Contém, no payload, o nome de usuário informado na request;
  Contém, no payload, uma propriedade admin , com o valor false .

3) Para retornar o token, utilize o seguinte formato no corpo da resposta:

{
  "token": "<JWT aqui>"
}

4) Para que username seja válido, seu valor precisa ser uma string alfanumérica de, pelo menos, 5 caracteres.

5) Para que password seja válido, seu valor precisa ser uma string de, pelo menos, 5 caracteres.

6) Altere o endpoint POST /login :

7) Caso username seja admin e password seja s3nh4S3gur4??? , a chave admin no payload do token gerado deve ter o valor true

8) Crie o endpoint /GET /users/me

9) O endpoint só pode ser acessado por pessoas autenticadas

10) Para realizar a autenticação, a requisição deve conter o header Authorization , cujo valor deve ser um token válido

11) Caso o token não exista, retorne o status 401 Unauthorized , com o seguinte corpo da resposta:

{
  "error": {
    "message": "Token not found"
  }
}

12) Caso aconteça um erro ao validar o token, retorne o status 401 Unauthorized com o seguinte conteúdo no corpo:

{
  "error": {
    "message": "<mensagem de erro da biblioteca>"
  }
}

13) Caso o token seja válido, retorne o status 200 OK e, no corpo da resposta, o nome de usuário ao qual aquele token pertence e o valor da propriedade admin , no seguinte formato:

{
  "username": "nome de usuario do token",
  "admin": true || false
}

14) Utilize um middleware exclusivo para a autenticação. Armazene-o no arquivo middlewares/auth.js

15) Crie o endpoint /GET /top-secret

16) O endpoint só pode ser acessado por pessoas autenticadas.

17) Apenas tokens contendo, no payload, a propriedade admin com o valor true têm autorização para acessar esse endpoint.

18) Caso o token não exista, retorne o status 401 Unauthorized , com o seguinte corpo da resposta:

{
  "error": {
    "message": "Token not found"
  }
}

19) Caso aconteça um erro ao validar o token, retorne o status 401 Unauthorized com o seguinte conteúdo no corpo:

{
  "error": {
    "message": "<mensagem de erro da biblioteca>"
  }
}

20) Caso o token seja válido, mas a propriedade admin do payload não seja true , retorne o status 403 Forbidden e o seguinte JSON:

{
  "error": {
    "message": "Restricted access"
  }
}

21) Caso o token seja válido e o payload contenha admin com o valor true , retorne o seguinte JSON:

{
  "secretInfo": "Peter Parker é o Homem-Arannha"
}

22) Para validar se a pessoa é admin, crie um novo middleware no arquivo middlewares/admin.js .
