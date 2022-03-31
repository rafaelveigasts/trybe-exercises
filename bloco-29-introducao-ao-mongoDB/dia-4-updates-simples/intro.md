## O que vamos aprender?
Hoje, você vai aprender como alterar dados no MongoDB através de métodos e operadores disponíveis para isso.

## Você será capaz de:
Utilizar o método updateOne() ;
Utilizar o método updateMany() ;
Utilizar os operadores $set , $mul , $inc , $min , $max e $currentDate ;
Renomear campos utilizando o operador $rename ;
Remover campos utilizando o operador $unset .

## Por que isso é importante?
Não adianta apenas armazenar dados e recuperá-los. Certamente você vai precisar alterá-los também de forma adequada! Updates vão te ajudar a dar manutenção contínua e deixar seus dados sempre atualizados.
Outro ponto muito importante, do ponto de vista do MongoDB, é saber utilizar os métodos, operadores e modificadores corretos para cada necessidade, evitando que operações complexas sobrecarreguem seu banco de dados.

## Conteúdos
A operação update é a que você utiliza quando quer alterar documentos de uma coleção no MongoDB . Para isso, o MongoDB tem uma série de operadores de atualização ( update operators ) para modificar os valores dos campos.
Dois métodos para modificar documentos serão vistos:

*db.colecao.updateOne(<filtro>, <update>, <opcoes>) ;*
*db.colecao.updateMany(<filtro>, <update>, <opcoes>) .*

Um método de update pode receber como parâmetro vários operadores diferentes em uma mesma operação:

{
  <operador>: { <campo1>: <valor1>, ... },
  <operador>: { <campo2>: <valor2>, ... },
  ...
}