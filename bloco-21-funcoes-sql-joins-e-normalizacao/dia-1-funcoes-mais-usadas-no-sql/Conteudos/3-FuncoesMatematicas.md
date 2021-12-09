## Funções matemáticas do MySQL

Até o momento, focamos em como buscar e exibir informações já existentes em uma tabela. Agora, vamos ver como podemos utilizar essa informação para calcular e gerar novos dados com as principais funções matemáticas disponíveis no MySQL .

Adição, Subtração, Multiplicação e Divisão

Para as operações matemáticas mais comuns, podemos empregar os operadores matemáticos usuais. Vamos testar cada um deles?

Execute os seguintes comandos dentro do Workbench:

SELECT 5 + 5;
SELECT 5 - 5;
SELECT 5 * 5;
SELECT 5 / 5;

Podemos, também, usar as colunas diretamente como base para os cálculos, caso necessário.


SELECT rental_duration + rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration - rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration / rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration * rental_rate FROM sakila.film LIMIT 10;

## Divisão de inteiros com DIV e como encontrar seus restos com o MOD

O DIV retorna o resultado inteiro de uma divisão, ignorando as casas decimais de um número. Veja os exemplos abaixo:

SELECT 10 DIV 3; -- 3
SELECT 10 DIV 2; -- 5
SELECT 14 DIV 3; -- 4
SELECT 13 DIV 2; -- 6

Já o operador MOD retorna o resto de uma divisão como resultado. Por exemplo:

SELECT 10 MOD 3; -- 1
SELECT 10 MOD 2; -- 0
SELECT 14 MOD 3; -- 2
SELECT 13 MOD 2; -- 1
SELECT 10.5 MOD 2; -- 0.5, ou seja, 2 + 2 + 2 + 2 + 2 = 10, restando 0.5

## Desafios com DIV e MOD

Dica: Números pares são aqueles que podem ser divididos em duas partes iguais. Ou seja, são aqueles cuja divisão por 2 retorna resto 0.

Monte uma query usando o MOD juntamente com o IF para descobrir se o valor 15 é par ou ímpar. Chame essa coluna de 'Par ou Ímpar' , onde ela pode dizer 'Par' ou 'Ímpar'.
R: select if( 15 mod 0, 'par', 'impar') as 'par ou impar'

Temos uma sala de cinema que comporta 220 pessoas. Quantos grupos completos de 12 pessoas podemos levar ao cinema sem que ninguém fique de fora?
R: select 220 div 12;


Utilizando o resultado anterior, responda à seguinte pergunta: temos lugares sobrando? Se sim, quantos?
R: SELECT IF(220 MOD 12 = 0, 'NÃO', CONCAT('SIM, ', 220 MOD 12));

## Arredondando Valores

Ter a capacidade de encontrar aproximações de valores é algo extremamente valioso na criação de relatórios e gráficos, que são utilizados por softwares de todos os tipos. O MySQL tem algumas funções que te ajudam a resolver isso. Vamos conhecê-las agora.

O ROUND arredonda os números de acordo com sua parte decimal. Se for maior ou igual a 0.5, o resultado é um arredondamento para cima. Caso contrário, ocorre um arredondamento para baixo. Veja os exemplos abaixo:

-- Podemos omitir ou especificar quantas casas decimais queremos
SELECT ROUND(10.4925); -- 10
SELECT ROUND(10.5136); -- 11
SELECT ROUND(-10.5136); -- -11
SELECT ROUND(10.4925, 2); -- 10.49
SELECT ROUND(10.4925, 3); -- 10.493

O arredondamento sempre para cima pode ser feito com o CEIL :

SELECT CEIL(10.51); -- 11
SELECT CEIL(10.49); -- 11
SELECT CEIL(10.2); -- 11

O arredondamento sempre para baixo pode ser feito com o FLOOR :

SELECT FLOOR(10.51); -- 10
SELECT FLOOR(10.49); -- 10
SELECT FLOOR(10.2); -- 10

## Exponenciação e Raiz Quadrada

Para cálculos de exponenciação e raiz quadradas, podemos utilizar as funções POW e SQRT , respectivamente.

Elevando um número X à potência Y usando a função POW :

SELECT POW(2, 2); -- 4
SELECT POW(2, 4); -- 16

Encontrando a raiz quadrada de um valor usando SQRT :

SELECT SQRT(9); -- 3
SELECT SQRT(16); -- 4

## Gerando valores aleatórios

Para situações em que se faz necessário gerar valores aleatórios, podemos usar a função RAND , em conjunto com as funções anteriores.

-- Para gerar um valor aleatório entre 0 e 1:
SELECT RAND();

-- Para gerar um valor entre 7 e 13:
SELECT ROUND(7 + (RAND() * 6));

-- O cálculo que é feito é o seguinte: (7 + (0.0 a 1.0 * 6))

## Para Fixar

Monte uma query que gere um valor entre 15 e 20 .
R: SELECT ROUND(15 + (RAND() * 5));

Monte uma query que exiba o valor arredondado de 15.7515971 com uma precisão de 5 casas decimais.
R: select round(15.7515971,5 )

Estamos com uma média de 39.494 de vendas de camisas por mês. Qual é o valor aproximado para baixo dessa média?
R: select floor(39.494);

Temos uma taxa de inscrição de 85.234% no curso de fotografia para iniciantes. Qual é o valor aproximado para cima dessa média?
R: select ceil(85.234);