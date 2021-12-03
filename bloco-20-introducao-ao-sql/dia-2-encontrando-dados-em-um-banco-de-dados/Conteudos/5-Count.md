## Contando resultados com o COUNT

Um dos principais objetivos de se usar um banco de dados é responder a perguntas como: "Que quantidade de um certo tipo de dados existe na tabela?". Ou, em um caso mais próximo ao nosso: "Quantas pessoas temos cadastradas no sistema?". Ou ainda: "Em quantos estados temos clientes?".

Percebeu que você pode usar o COUNT de maneiras bem criativas, certo? Legal, então vamos pensar no seguinte cenário:

<img src="sampleSelect1.png" />


Essa é a tabela staff do banco de dados sakila . Como você poderia responder às seguintes questões?

Quantas senhas temos cadastradas nessa tabela?
Quantas pessoas temos no total trabalhando para nossa empresa?
Quantos emails temos cadastrados nessa tabela?
Até agora, trabalhamos principalmente com tabelas que têm poucas linhas de resultados (média de 200), e até aí tudo bem. Porém, em muitos cenários reais, você pode se deparar com milhares ou até centenas de milhares de resultados, e é aqui que vamos LIMIT ar elas!

use sakila;
select * from staff;
select count(password) from staff;
select count(first_name) from staff;
select count(email) from staff;