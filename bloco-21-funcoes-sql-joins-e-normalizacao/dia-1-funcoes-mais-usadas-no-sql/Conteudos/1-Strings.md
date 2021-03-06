## Manipulação de strings

Uma das responsabilidades das pessoas que lidam com o registro de informações em um banco de dados é se certificar de que esses dados estão coerentes, normalizados e cadastrados no formato correto. O MySQL possui algumas funções de manipulação de string que facilitam essas tarefas.

As principais podem ser vistas a seguir:

-- Converte o texto da string para CAIXA ALTA
SELECT UCASE('Oi, eu sou uma string');

-- Converte o texto da string para caixa baixa
SELECT LCASE('Oi, eu sou uma string');

-- Substitui as ocorrências de uma substring em uma string
SELECT REPLACE('Oi, eu sou uma string', 'string', 'cadeia de caracteres');

-- Retorna a parte da esquerda de uma string de acordo com o
-- número de caracteres especificado
SELECT LEFT('Oi, eu sou uma string', 3);

-- Retorna a parte da direita de uma string de acordo com o
-- número de caracteres especificado
SELECT RIGHT('Oi, eu sou um string', 6);

-- Exibe o tamanho, em caracteres, da string, a função LENGTH retorna o tamanho em bytes
SELECT CHAR_LENGTH('Oi, eu sou uma string');

-- Extrai parte de uma string de acordo com o índice de um caractere inicial
-- e a quantidade de caracteres a extrair
SELECT SUBSTRING('Oi, eu sou uma string', 5, 2);

-- Se a quantidade de caracteres a extrair não for definida,
-- então a string será extraída do índice inicial definido, até o seu final
SELECT SUBSTRING('Oi, eu sou uma string', 5);

Para fixar melhor, que tal explorar na prática o que cada comando faz? Rode cada um deles no MySQL Workbench e veja os resultados.

Algo importante a se notar sobre strings em SQL é que, diferente de várias linguagens de programação, no SQL strings são indexadas a partir do índice 1 e não no índice 0. Caso tenha resultados inesperados, essa pode ser uma das razões.

Observe que, apesar de ter usado strings temporárias nos exemplos acima, também é possível fazer essas operações diretamente nas colunas de uma tabela.

Para testar, execute o código abaixo no seu ambiente local, brinque com as linhas a seguir e depois volte aqui.

SELECT UCASE(title) FROM sakila.film LIMIT 10;
SELECT LCASE(title) FROM sakila.film LIMIT 10;
SELECT REPLACE(title, 'ACADEMY', 'FOO') FROM sakila.film WHERE film_id = 1;
SELECT LEFT(title, 7) FROM sakila.film WHERE film_id = 1;
SELECT RIGHT(title, 8) FROM sakila.film WHERE film_id = 1;
SELECT CHAR_LENGTH(title) FROM sakila.film WHERE film_id = 1;
SELECT SUBSTRING(title, 5, 2) FROM sakila.film WHERE film_id = 1;
SELECT SUBSTRING(title, 5) FROM sakila.film WHERE film_id = 1;

## Para Fixar
Agora, vamos fixar os aprendizados com alguns desafios:

Faça uma query que exiba a palavra 'trybe' em CAIXA ALTA.
R: SELECT UCASE('trybe');

Faça uma query que transforme a frase 'Você já ouviu falar do DuckDuckGo?' em 'Você já ouviu falar do Google?' .
R: SELECT replace('Você já ouviu falar do DuckDuckGo?', 'DuckDuckGo', 'Google');

Utilizando uma query , encontre quantos caracteres temos em 'Uma frase qualquer' .
R: SELECT char_length('Uma frase qualquer' );

Extraia e retorne a palavra "JavaScript" da frase 'A linguagem JavaScript está entre as mais usadas' .
R: SELECT substring('A linguagem JavaScript está entre as mais usadas', 12,12) AS 'MELHOR LINGUAGEM';

Por fim, padronize a string 'RUA NORTE 1500, SÃO PAULO, BRASIL' para que suas informações estejam todas em caixa baixa.
R: SELECT lcase('RUA NORTE 1500, SÃO PAULO, BRASIL')