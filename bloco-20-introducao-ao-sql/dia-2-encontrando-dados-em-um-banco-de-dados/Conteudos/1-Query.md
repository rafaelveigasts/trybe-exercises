## O que é uma query e quais são os principais tipos de queries

Inquirir, ou query , em inglês, é o nome dado aos comandos que você digita dentro de uma janela ou linha de comando com a intenção de interagir de alguma maneira com uma base de dados. No mundo de banco de dados, você pode tanto trazer dados quanto alterá-los, atribuir permissões de acesso e manipulação e muito mais. Vamos dar um olhada nos principais tipos de queries a seguir:

DDL : Data Definition Language - todos os comandos que lidam com o esquema, a descrição e o modo como os dados devem existir em um banco de dados:

CREATE : Para criar bancos de dados, tabelas, índices, views, procedures, functions e triggers
ALTER : Para alterar a estrutura de qualquer objeto
DROP : Permite deletar objetos
TRUNCATE : Apenas esvazia os dados dentro de uma tabela, mas a mantém no banco de dados

DML : Data Manipulation Language - Comandos que são usados para manipular dados. São utilizados para armazenar, modificar, buscar e excluir dados em um banco de dados. Os comandos e usos mais comuns nesta categoria são:

SELECT : usado para buscar dados em um banco de dados
INSERT : insere dados em uma tabela
UPDATE : altera dados dentro de uma tabela
DELETE : exclui dados de uma tabela

DCL : Data Control Language - Focado mais nos comandos que concedem direitos, permissões e outros tipos de controle ao sistema de banco de dados.

GRANT : concede acesso a um usuário
REVOKE : remove acessos concedidos através do comando GRANT

TCL : Transactional Control Language - Lida com as transações dentro de suas pesquisas.

COMMIT : muda suas alterações de temporárias para permanentes no seu banco de dados
ROLLBACK : desfaz todo o impacto realizado por um comando
SAVEPOINT : define pontos para os quais uma transação pode voltar. É uma maneira de voltar para pontos específicos de sua query
TRANSACTION : comandos que definem onde, como e em que escopo suas transações são executadas
