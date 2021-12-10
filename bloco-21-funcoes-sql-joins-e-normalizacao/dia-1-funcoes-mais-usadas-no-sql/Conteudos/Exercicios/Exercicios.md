## Agora a prática

Restaure o banco de dados abaixo antes de continuar:

Para realizar os exercícios propostos para o dia, faremos uso da tabela employees do banco de dados hr . O banco de dados ser gerado e restaurado usando este arquivo SQL .

https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/sql/hr-cebf8bc2a5bb252bc470ae28943604c6.sql

Instruções de como restaurar o banco de dados
Baixe o conteúdo do arquivo .sql linkado acima;
Copie todo o código SQL;
Abra o MySQL Workbench e abra uma nova janela de query;
Copie todo o código para dentro dessa janela;
Selecione todo o código usando Ctrl + a;
Execute o código teclando Ctrl + ENTER.

## Exercícios

1. Escreva uma query que exiba o maior salário da tabela.
select FIRST_NAME, LAST_NAME, MAX(SALARY) FROM employees;

2. Escreva uma query que exiba a diferença entre o maior e o menor salário.
select 
	FIRST_NAME, 
    LAST_NAME, 
    MAX(SALARY),
    min(SALARY),
    MAX(SALARY)-MIN(SALARY) AS DIFERENÇA
    FROM employees;

3. Escreva uma query que exiba a média salarial de cada JOB_ID , ordenando pela média salarial em ordem decrescente.
SELECT 
	JOB_ID, 
    avg(SALARY) AS MEDIA
FROM
	employees
GROUP BY JOB_ID
ORDER BY MEDIA DESC;

4. Escreva uma query que exiba a quantidade de dinheiro necessária para realizar o pagamento de todas as pessoas funcionárias.
SELECT SUM(SALARY)
FROM hr.employees;

5. Escreva uma query que exiba quatro informações: o maior salário, o menor salário, a soma de todos os salários e a média dos salários. Todos os valores devem ser formatados para ter apenas duas casas decimais.
SELECT 
	MAX(SALARY) AS MAIOR,
    MIN(SALARY) AS MENOR,
    SUM(SALARY) AS TOTAL,
	AVG(SALARY) AS MEDIA 
FROM employees;

6. Escreva uma query que exiba a quantidade de pessoas que trabalham como pessoas programadoras ( IT_PROG ).
SELECT JOB_ID, count(EMPLOYEE_ID) FROM employees
GROUP BY JOB_ID
HAVING JOB_ID='IT_PROG';
7. Escreva uma query que exiba a quantidade de dinheiro necessária para efetuar o pagamento de cada profissão ( JOB_ID ).
SELECT JOB_ID, SUM(SALARY) AS TOTAL
FROM employees
GROUP BY JOB_ID;

8. Utilizando a query anterior, faça as alterações para que seja exibido somente a quantidade de dinheiro necessária para cobrir a folha de pagamento das pessoas programadoras ( IT_PROG ).
HAVING JOB_ID='IT_PROG';

9. Escreva uma query que exiba em ordem decrescente a média salarial de todos os cargos, exceto das pessoas programadoras ( IT_PROG ).
SELECT JOB_ID, avg(SALARY) AS MEDIA
FROM employees
GROUP BY JOB_ID
HAVING JOB_ID <> 'IT_PROG'
ORDER BY MEDIA DESC;

10. Escreva um query que exiba média salarial e o número de funcionários de todos os departamentos com mais de dez funcionários. Dica: agrupe pelo department_id .
SELECT 
	DEPARTMENT_ID,
	avg(SALARY) AS MEDIA,
    COUNT(*) AS FUNCIONARIOS
FROM employees
GROUP BY DEPARTMENT_ID
HAVING `FUNCIONARIOS` >10;

11. Escreva uma query que atualize a coluna PHONE_NUMBER , de modo que todos os telefones iniciados por 515 agora devem iniciar com 777 .

SET SQL_SAFE_UPDATES=0;
UPDATE employees
SET 
	PHONE_NUMBER = REPLACE(PHONE_NUMBER, '515', '777')
WHERE
	PHONE_NUMBER LIKE '515%';

12. Escreva uma query que só exiba as informações dos funcionários cujo o primeiro nome tenha oito ou mais caracteres.
SELECT *
FROM hr.employees
WHERE LENGTH(first_name) >= 8;

13. Escreva uma query que exiba as seguintes informações de cada funcionário: id , primeiro nome e ano no qual foi contratado (exiba somente o ano).
SELECT employee_id, first_name,
    YEAR(hire_date) 'hire_year'
FROM hr.employees;
-- OR
SELECT employee_id, first_name,
    LEFT(hire_date, 4) 'hire_year'
FROM hr.employees;
-- OR
SELECT employee_id, first_name,
    MID(hire_date, 1, 4) 'hire_year'
FROM hr.employees;

14. Escreva uma query que exiba as seguintes informações de cada funcionário: id , primeiro nome e dia do mês no qual foi contratado (exiba somente o dia).
SELECT employee_id, first_name,
    RIGHT(hire_date, 2) 'hire_day'
FROM hr.employees;
-- OR
SELECT employee_id, first_name,
    MID(hire_date, 9, 2) 'hire_day'
FROM hr.employees;
-- OR
SELECT employee_id, first_name,
    DAY(hire_date) 'hire_day'
FROM hr.employees;

15. Escreva uma query que exiba as seguintes informações de cada funcionário: id , primeiro nome e mês no qual foi contratado (exiba somente o mês).
SELECT employee_id, first_name,
    SUBSTRING(hire_date, 6, 2) 'hire_month'
FROM hr.employees;
-- OR
SELECT employee_id, first_name,
    MONTH(hire_date) 'hire_month'
FROM hr.employees;

16. Escreva uma query que exiba os nomes dos funcionários em letra maiúscula.
SELECT UPPER(CONCAT(FIRST_NAME, " ", LAST_NAME))
FROM hr.employees;

17. Escreva uma query que exiba o sobrenome e a data de contratação de todos os funcionário contratados em julho de 1987.
SELECT LAST_NAME _NAME, HIRE_DATE
FROM hr.employees
WHERE HIRE_DATE  BETWEEN '1987-07-01'  AND '1987-07-31';

SELECT LAST_NAME _NAME, HIRE_DATE
FROM hr.employees
WHERE MONTH(HIRE_DATE)=7 and YEAR(HIRE_DATE)=1987;

18. Escreva uma query que exiba as seguintes informações de cada funcionário: nome , sobrenome , tempo que trabalha na empresa (em dias) .
SELECT first_name,
    last_name,
    DATEDIFF(CURRENT_DATE() , HIRE_DATE) 'days_worked'
FROM hr.employees;