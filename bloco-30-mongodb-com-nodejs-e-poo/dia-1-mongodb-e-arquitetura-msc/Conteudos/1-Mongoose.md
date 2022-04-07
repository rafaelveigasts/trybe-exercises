## Introdução ao Mongoose

"Vamos ser sinceros, escrever o clichê de validação, conversão e lógica de negócios do MongoDB é uma chatice. É por isso que escrevemos Mongoose." É essa a frase que abre a documentação do Mongoose , mostrando pra quê ele existe.

Escrever queries em MongoDB pode não ser algo tão complexo, dado que suas funções são escritas de forma bem similar ao JavaScript/TypeScript. Contudo, quando temos uma base de dados com várias coleções e precisamos escrever rotas para ler, inserir, atualizar e deletar os dados de cada uma delas, a brincadeira começa a perder a graça. A aplicação fica muito complexa e cansativa de ser escrita e perde completamente sua escalabilidade. É aqui que o Mongoose entra.

No mundo dos bancos de dados e APIs existem dezenas de ferramentas que são criadas para facilitar a interação e a manipulação desses dados e fornecer robustez à sua aplicação. Estas ferramentas são basicamente divididas em dois tipos: ORMs (Object Relational Mapping), que lidam com dados estruturados em bancos de dados relacionais (como MySQL, PostgreSQL etc.), e ODMs (Object Document Mapping), que lidam com dados estruturados em bancos de dados não relacionais (como o MongoDB).

O Mongoose faz o trabalho de um ODM, que é como o trabalho de um tradutor. Temos uma API escrita em Node.js , cujo objetivo é acessar nosso banco de dados em MongoDB e realizar manipulações de dados. Porém o Mongo não entende diretamente JavaScript/TypeScript, precisando, assim, de um tradutor, alguém que faça com que a interação entre essas duas partes seja facilitada. Veja o esquema a seguir:

Interação entre o Node, o Mongoose e o MongoDB
Observe que isso é basicamente o modelo MSC, no qual o Mongoose faz o papel de Model e o Node + Express abrangem os Controllers e os Services
Agora vamos entender como funciona a conexão do Mongoose com o MongoDB, mas antes, vamos popular um banco de dados para usar de exemplo.

<img src='node+mongoose+mongo-interaction.png' />

Agora vamos entender como funciona a conexão do Mongoose com o MongoDB, mas antes, vamos popular um banco de dados para usar de exemplo.
