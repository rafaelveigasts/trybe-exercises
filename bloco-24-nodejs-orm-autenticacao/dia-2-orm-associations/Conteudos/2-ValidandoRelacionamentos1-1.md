## Validando relacionamentos 1:1

Agora, vamos validar o relacionamento, para isso precisaremos criar seeders para inserirmos dados nas tabelas e um servidor para responder as requisições.

Para criar os dois seeders, utilize os comandos abaixo:

npx sequelize seed:generate --name employees
npx sequelize seed:generate --name addresses

Depois, abra o arquivo employees dentro da pasta seeders e copie o código abaixo. Todas as seeds quando criadas, tem um timestamp antes do nome do arquivo, lembre-se disso ao procurá-lo:
