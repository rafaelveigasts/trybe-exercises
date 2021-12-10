## Trabalhando com datas

Conseguimos fazer algumas coisas legais, como por exemplo consultar a data e hora atuais usando as seguintes funções:

SELECT CURRENT_DATE(); -- YYYY-MM-DD
SELECT NOW(); -- YYYY-MM-DD HH:MM:SS
Também podemos calcular a diferença em dias entre duas datas usando o DATEDIFF e a diferença de tempo entre dois horários usando o TIMEDIFF . Em ambos os casos, o segundo valor é subtraído do primeiro para calcular o resultado.

-- 30, ou seja, a primeira data é 30 dias depois da segunda
SELECT DATEDIFF('2020-01-31', '2020-01-01');

-- -30, ou seja, a primeira data é 30 dias antes da segunda
SELECT DATEDIFF('2020-01-01', '2020-01-31');

-- -01:00:00, ou seja, há 1 hora de diferença entre os horários
SELECT TIMEDIFF('08:30:10', '09:30:10');

-- -239:00:00, ou seja, há uma diferença de 239 horas entre as datas
SELECT TIMEDIFF('2021-08-11 08:30:10', '2021-08-01 09:30:10');

Outro ponto interessante, é que também podemos usar CURRENT_DATE() e NOW() em conjunto com os comandos de manipulação de datas e tempo para encontrar resultados dinâmicos da seguinte maneira:

SELECT YEAR(CURRENT_DATE()); -- retorna o ano atual
SELECT HOUR(NOW()); -- retorna a hora atual

## Para Fixar

Para fixar, responda como seria possível encontrar as seguintes informações:

Monte uma query que exiba a diferença de dias entre '2030-01-20' e hoje.
R: select datediff('2030-01-20', now());

Monte uma query exiba a diferença de horas entre '10:25:45' e '11:00:00' .
R: select timediff('10:25:45' , '11:00:00');