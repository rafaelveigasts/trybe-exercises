## Model com Mongoose

Uma das maiores vantagens da arquitetura MSC é que ao dividir as funções e responsabilidades da aplicação em camadas, podemos fazer alterações em uma das partes praticamente sem que as outras sejam afetadas.

É na camada model , ou de modelo, que são definidas as estruturas de dados utilizadas em uma aplicação e é responsabilidade desta camada abstrair todos os detalhes de acesso, manipulação e armazenamento de dados. Por isso, quando alteramos o banco de dados utilizado em uma aplicação, é lá que precisaremos fazer as adequações necessárias.

Sendo assim, vamos imaginar que temos uma API de livros que utilizava um banco de dados x e que agora passará a utilizar MongoDB. Sabemos que a aplicação utiliza Node.js e TypeScript e queremos fazer a alteração de nosso data storage com o mínimo de impacto no restante da aplicação.

A seguir, você poderá ver o código da aplicação, com exceção da camada de modelo, que foi completamente removida. Sabendo que a aplicação anteriormente permitia inserir, listar, atualizar e deletar livros no banco de dados e que espera-se que todas essas funções continuem sendo possíveis com a utilização do novo banco. Assim, iremos refatorar este CRUD usando MongoDB com Mongoose de forma que a aplicação volte a funcionar normalmente.


