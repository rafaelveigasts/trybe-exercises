## 2ª Forma Normal

Para a Segunda Forma Normal , devemos atentar para o seguinte:

A tabela deve estar na 1ª Forma Normal
A tabela não deve possuir dependências parciais.

Uma dependência parcial pode ser considerada como qualquer coluna que não depende exclusivamente da chave primária da tabela para existir. Por exemplo, considere uma tabela Pessoa Estudantes que possui as seguintes colunas

id	nome	data_matricula	curso
1	Samuel	2020-09-01	Física
2	Joana	2020-08-15	Biologia
3	Taís	2020-07-14	Contabilidade
4	André	2020-06-12	Biologia

A coluna curso pode ser considerada uma dependência parcial pois poderiámos mover os valores dessa coluna para uma outra tabela e os dados dessa tabela podem existir independente de existir uma pessoa estudante vinculada a esse curso ou não. Dessa forma depois de normalizar teríamos duas tabelas:

Cursos
id	nome
1	Física
2	Biologia
3	Contabilidade

Pessoas Estudantes
id	nome	data_matricula	curso_id
1	Samuel	2020-09-01	        1
2	Joana	  2020-08-15	        2
3	Taís	  2020-07-14	        3
4	André 	2020-06-12        	2

Dessa forma, aplicamos a segunda forma normal na tabela Pessoas Estudantes . Lembre-se que a função da normalização não é necessariamente reduzir o número de colunas mas remover redundâncias e possíveis anomalias de inclusão/alteração ou remoção.

Caso queira você também pode conferir como aplicar a segunda forma normal assistindo o vídeo a seguir: