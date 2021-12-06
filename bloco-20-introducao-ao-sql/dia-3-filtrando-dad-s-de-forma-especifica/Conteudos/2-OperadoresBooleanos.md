## Alavancando o poder dos principais operadores booleanos e relacionais

Como foi exibido no vídeo acima, de forma geral, temos os seguintes operadores:

-- OPERADOR - DESCRIÇÃO
=   IGUAL
>   MAIOR QUE
<   MENOR QUE
>=  MAIOR QUE OU IGUAL
<=  MENOR QUE OU IGUAL
<>  DIFERENTE DE
AND OPERADOR LÓGICO E
OR  OPERADOR LÓGICO OU
NOT NEGAÇÃO
IS  COMPARA COM VALORES BOOLEANOS (TRUE, FALSE, NULL)

Depois de ter assistido ao vídeo anterior, você já deve ter agora uma noção do que pode ser feito com os operadores do SQL e de como é possível combiná-los para trazer relatórios ainda mais granulares. Vamos buscar algumas informações no nosso banco de dados para consolidar esse aprendizado.

Dica final: Sempre se atente a essa ordem de precedência para que consiga montar suas queries de acordo com o que precisa. Na dúvida, use parênteses.

## Para Fixar

A tabela a seguir é um guia de como a classificação indicativa é usada no banco de dados sakila . Consulte-a ao fazer os desafios propostos.

G = permitido para todos
PG = permitido para crianças menores de 13 anos
PG-13 = permitido para pessoas com mais de 13 anos
R = permitido para pessoas com mais de 17 anos
NC-17 = permitido apenas para adultos

Entre no banco de dados sakila e siga as instruções (e guarde as queries para conferir posteriormente):

Precisamos identificar os dados do cliente com o e-mail LEONARD.SCHOFIELD@sakilacustomer.org . As informações podem ser encontradas na tabela customer
R: select * from customer where email='LEONARD.SCHOFIELD@sakilacustomer.org';

Precisamos de um relatório dos nomes dos clientes, em ordem alfabética , que não estão mais ativos no nosso sistema e pertencem à loja com o id = 2 , e não inclua o cliente KENNETH no resultado. As informações podem ser encontradas na tabela customer
R: use sakila;
select * from customer 
where active = 0 
and store_id=2 
and first_name <> "KENNETH" 
order by  first_name;

O setor financeiro quer saber título, descrição, ano de lançamento e valor do custo de substituição ( replacement_cost ), dos 100 filmes com o maior custo de substituição, do valor mais alto ao mais baixo, entre os filmes feitos para menores de idade e que têm o custo mínimo de substituição de $18,00 dólares. Em caso de empate, ordene em ordem alfabética pelo título. As informações podem ser encontradas na tabela film
R: use sakila;
select title, description, release_year, replacement_cost from film
where rating <> "NC-17" AND replacement_cost >= 18
order by replacement_cost desc, title
limit 100;


Quantos clientes estão ativos e na loja 1 ? As informações podem ser encontradas na tabela customer
R: 
use sakila;
select count(*) from customer
where store_id=1 and active=1;

Mostre todos os detalhes dos clientes que não estão ativos na loja 1 . As informações podem ser encontradas na tabela customer
R: 
use sakila;
select * from customer
where store_id=1 and active=0

Precisamos descobrir quais são os 50 filmes feitos apenas para adultos com a menor taxa de aluguel, para que possamos fazer uma divulgação melhor desses filmes. Em caso de empate, ordene em ordem alfabética pelo título. As informações podem ser encontradas na tabela film
R: 
use sakila;
select title, rental_rate from film
where rating='NC-17'
order by rental_rate, title
limit 50;

Você vai se deparar também com casos em que você só tem parte de uma informação, ou em que precisa criar queries mais dinâmicas. Para esses casos, temos o LIKE . Como assim? É o que veremos a seguir.
