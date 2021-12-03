## Juntando duas ou mais colunas usando o CONCAT

Dê uma pesquisada agora na tabela sakila.actor usando o comando SELECT * FROM sakila.actor e veja que temos uma coluna first_name e outra chamada last_name . Vamos imaginar que é necessário criar um relatório com o nome completo de um ator. Como podemos fazer isso? É fácil, basta usar a função CONCAT .

Para compreender seu uso, execute os exemplos a seguir no MySQL Workbench :

SELECT CONCAT (first_name, last_name) FROM sakila.actor;

-- Seu resultado ficou estranho? Eu também achei! Tente agora a query a seguir.

SELECT CONCAT(first_name, ' ', last_name) FROM sakila.actor;

-- Muito melhor, certo? Mas dá para melhorar? Dá!

SELECT CONCAT(first_name, ' ', last_name) AS 'Nome Completo' FROM sakila.actor;

Então, como podemos ver no exemplo acima, é possível concatenar mais de uma coluna em apenas uma. Para isso, usamos a função CONCAT , que cria novos dados e informações a partir dos dados já existentes em uma tabela.

Vamos brincar um pouco mais com isso?

Na tabela sakila.film , monte uma query que exiba o título e o ano de lançamento dos filmes em uma coluna e dê a ela o nome Lançamento do Filme .
Na tabela sakila.film , crie uma query que exiba o título do filme e sua classificação indicativa (PG, G, NC-17) em apenas uma coluna. Dê a ela o nome Classificação . Não se esqueça de deixar um espaço entre as palavras para que fiquem legíveis.
Na tabela sakila.address , monte uma query que exiba a rua e o distrito de cada registro em uma coluna apenas, e dê a essa coluna o nome Endereço .
