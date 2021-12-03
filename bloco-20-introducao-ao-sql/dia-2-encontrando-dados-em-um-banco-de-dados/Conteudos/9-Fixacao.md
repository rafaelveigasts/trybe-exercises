## Vamos montar o bolo com todos os ingredientes que vimos hoje

Para os exercícios a seguir, vamos usar a tabela sakila.film
Escreva uma query que exiba todos os filmes cadastrados no banco de dados.
Escreva uma query que exiba apenas o nome dos filmes, seu ano de lançamento e sua classificação .
Quantos filmes temos cadastrados?
R: use sakila;
select * from film;
select concat(title, ' ' , release_year, ' ', rating) as 'titulo, ano, rating' from film;
select count(title) from film;

Para os exercícios a seguir, vamos usar a tabela sakila.actor
Escreva uma query que exiba apenas os sobrenomes únicos cadastrados.
Quantos sobrenomes únicos temos na tabela?
Ordene os valores na tabela em ordem crescente de sobrenomes e em ordem decrescente de nome.
Vá até a tabela language do sakila e crie uma pesquisa que mostre os 5 idiomas cadastrados , mas não mostre o idioma english .
Vá até a tabela film e selecione todos os dados da tabela. Pronto, fez isso?
Agora vamos tentar fazer o seguinte: Crie uma query para encontrar os 20 primeiros filmes , incluindo o título , o ano de lançamento , a duração , a classificação indicativa e o custo de substituição . Ordene os resultados pelos filmes com a maior duração e depois pelo menor custo de substituição.
SELECT title, release_year, length, rating, replacement_cost FROM sakila.film
ORDER BY length DESC, replacement_cost ASC
LIMIT 20;