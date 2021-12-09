## Condicionais

Em linguagens de alto nível como Python , JavaScript e outras, as condicionais são a base para a criação de algorítimos dinâmicos que se adaptam de acordo com a necessidade do programa. O SQL não fica para trás nesse quesito, sendo possível nele também usar os principais comandos de controle de fluxo, como o IF e o CASE .

Obs: Caso queria saber mais sobre linguagens de alto nível, leia o artigo de William Oliveira na sessão de recusos adicionais.

Para entender como isso pode ser feito, assista ao vídeo e veja os exemplos abaixo:

sintaxe:
  select coluna if (coluna_a_ser_verificada_condição, verdadeiro, falso) from banco_de_dados;

-- Sintaxe:
SELECT IF(condicao, valor_se_verdadeiro, valor_se_falso);

SELECT IF(idade >= 18, 'Maior de idade', 'Menor de Idade')
FROM pessoas;

SELECT IF(aberto, 'Entrada permitida', 'Entrada não permitida')
FROM estabelecimentos;

-- Exemplo utilizando o banco sakila:
SELECT first_name, IF(active, 'Cliente Ativo', 'Cliente Inativo') AS status
FROM sakila.customer
LIMIT 20;


## Em situações em que é preciso comparar mais de uma condição, é preferível utilizar o CASE .

-- Sintaxe:
SELECT CASE
  WHEN condicao THEN valor
  ELSE valor padrao
END;

SELECT
    nome,
    nivel_acesso,
    CASE
        WHEN nivel_acesso = 1 THEN 'Nível de acesso 1'
        WHEN nivel_acesso = 2 THEN 'Nível de acesso 2'
        WHEN nivel_acesso = 3 THEN 'Nível de acesso 3'
        ELSE 'Usuário sem acesso'
    END AS nivel_acesso
FROM permissoes_usuario;

-- Exemplo utilizando a tabela sakila.film:
SELECT
    first_name,
    email,
    CASE
        WHEN email = 'MARY.SMITH@sakilacustomer.org' THEN 'Cliente de baixo valor'
        WHEN email = 'PATRICIA.JOHNSON@sakilacustomer.org' THEN 'Cliente de médio valor'
        WHEN email = 'LINDA.WILLIAMS@sakilacustomer.org' THEN 'Cliente de alto valor'
        ELSE 'não classificado'
    END AS valor
FROM sakila.customer
LIMIT 10;


É melhor aprender esse tema quebrando a cabeça praticando, então vamos fazer isso.

## Para Fixar

Usando o IF na tabela sakila.film , exiba o id do filme , o título e uma coluna extra chamada 'conheço o filme?' , em que deve-se avaliar se o nome do filme é ' ACE GOLDFINGER '. Caso seja, exiba "Já assisti a esse filme". Caso contrário, exiba "Não conheço o filme". Não esqueça de usar um alias para renomear a coluna da condicional.
R:
select 
	film_id, 
title, 
if
	(title = 'ACE GOLDFINGER', 'jA ASSISTI', 'NAO CONHEÇO') 
AS 
	'conheço o filme?'
from 
	film;


Usando o CASE na tabela sakila.film , exiba o título , a classificação indicativa ( rating ) e uma coluna extra que vamos chamar de 'público-alvo' , em que classificaremos o filme de acordo com as seguintes siglas:
G: "Livre para todos";
PG: "Não recomendado para menores de 10 anos";
PG-13: "Não recomendado para menores de 13 anos";
R: "Não recomendado para menores de 17 anos";
Se não cair em nenhuma das classificações anteriores: "Proibido para menores de idade".
R:
SELECT 
	title, 
    rating,
CASE
	WHEN rating = 'G' THEN 'Livre para todos'
    WHEN rating = 'PG' THEN 'Não recomendado para menores de 10 anos'
    WHEN rating = 'PG-13' THEN 'Não recomendado para menores de 13 anos'
    WHEN rating = 'R' THEN 'Não recomendado para menores de 17 anos'
Else 'Proibido para menores de 18 anos'
End as 'público-alvo'
from film
limit 10;
