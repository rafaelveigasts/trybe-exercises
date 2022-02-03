Bônus
Crie o endpoint POST /signup
O endpoint deve aceitar o seguinte JSON no corpo da requisição:
Copiar
{
  "username": "MariaCecília_Souza92",
  "password": "%9!%e"c0c5w,q%%h9n3k"
}
Para validar os campos, considere os mesmos critérios do endpoint POST /login ;
Caso username já exista, retorne o status 409 Conflict e o seguinte JSON:
Copiar
{
   "error": { "message": "user already exists" }
}
Caso os campos sejam válidos, armazene os dados no arquivo models/data/users.json ;
Ao armazenar os dados recebidos, adicione a propriedade admin , que terá seu valor determinado da seguinte forma:
Obtenha um número aleatório de 1 a 100 com o seguinte trecho de código: Math.floor(Math.random() * 100) ;
Caso o número aleatório seja maior que 50 , admin deve ser true ;
Caso o número aleatório seja menor ou igual a 50 , admin deve ser false .
Após armazenar os novos dados, retorne um token que expire em uma hora e contenha username e admin no payload. Utilize o seguinte formato na resposta:
Copiar
  {
    "token": "<token gerado aqui>"
  }
Altere o endpoint de login
Antes de gerar o token, verifique se o nome de usuário e a senha informados existem no arquivo users.json ;
Não permita mais o login do usuário admin com a senha fixa.
Informe, na propriedade admin do payload do token, o mesmo valor da propriedade admin que está armazenado para aquela pessoa.
