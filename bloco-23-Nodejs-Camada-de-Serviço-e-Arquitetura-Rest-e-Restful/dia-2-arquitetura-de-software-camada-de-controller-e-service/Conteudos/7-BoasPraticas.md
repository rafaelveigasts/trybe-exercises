## Boas Práticas em Arquitetura de Software

Indiferente de qual padrão arquitetural você vai usar, existem algumas boas práticas que você deve sempre manter em mente, independente do padrão a ser seguido.

Pense antes de escrever código!

A primeira coisa é você entender qual é o problema que será resolvido e, a partir daí, começar a pensar em uma solução em nível de arquitetura.

Imagine o seguinte cenário:

"Quero criar uma aplicação que mostra todas as fotos que as pessoas tiraram com base na localização. As versões mobile native e web serão parecidas, mas apenas a mobile poderá tirar fotos." - Cliente, Seu

Beleza! Pensando que vamos ter múltiplos clientes com funcionalidades semelhantes, faz sentido termos uma API, certo?

Pensando mais a fundo na arquitetura da API, é de se imaginar que vamos ter que subir as fotos em algum serviço de hospedagem (em vez de armazená-las nós mesmos), e vamos salvar no banco apenas a URL gerada após o upload . Nesse caso, faz bastante sentido termos uma camada de serviço que vai orquestrar essa parte de hospedagem.

Claro que, na prática, não é tão simples assim. 😬 Mas isso é só um exemplo de como você deve pensar em qual arquitetura faz mais sentido para o problema que está tentando resolver para, só depois, começarmos a codificar!

### Pense em Componentes

Isso é bem parecido com o que nós fazemos com React! Você se lembra do princípio por trás dos componentes?

A intenção é que nossas aplicações sejam construídas com pequenos pedacinhos de código sem dependências entre si. A mesma coisa se aplica numa API também!

Dentro das suas camadas, mantenha cada controller, cada model e cada serviço pequeno e o mais desacoplado possível das outras partes. Faça com que eles se comuniquem somente através de interfaces muito bem definidas. Não deixe que um componente acesse diretamente o que está dentro de outro. Isso vai facilitar muito na hora de dar manutenção, reutilizar e testar seu código.

### Mantenha suas pastas organizadas

Existem algumas maneiras de organizar as pastas em um projeto, mas vamos citar duas: por domínio/correlação e por papel técnico .

Por domínio/correlação , nós mantemos todos os arquivos que têm relação com um Author , por exemplo, na mesma pasta, independente da responsabilidade de cada arquivo:

└── author
│   ├── authorController.js
│   ├── authorService.js
│   └── authorModel.js
└── book
│   └── bookController.js
│   └── bookService.js
│   └── bookModel.js


*Por papel técnico* é como temos exemplificado até agora (não que seja necessariamente melhor). Todos os controllers em uma pasta, todos os services em outra e por aí vai:

└── controllers
│   ├── authorController.js
│   └── bookController.js
└── services
│   ├── authorService.js
│   └── bookService.js
└── models
│   ├── authorModel.js
│   └── bookModel.js

Muitas vezes, você vai utilizar um framework em que essa decisão já foi tomada. Nesse caso, siga com o padrão.

### Mantenha o Express o mais longe possível.

O mais longe possível quer dizer que devemos criar fronteiras bem definidas entre o Express e o "resto da sua aplicação".

Isso significa manter os objetos req e res dentro do escopo do controller e nunca passá-los inteiros para as partes do app que cuidam da lógica de negócio.

Tomando essa precaução simples, você vai evitar ficar criando mocks para esses objetos quando for escrever testes unitários, por exemplo.

Se o seu modelo precisa apenas dos campos user e password para fazer o login de alguém, para que passar para ele o objeto req e mandar todos os headers que vieram na requisição?

Observe este exemplo:

const userController = async (req, res) => {
  try {
    // ruim 😧
    await UserService.create(req);

    // bom! 😊
    const { email, password } = req.body;
    await UserService.create(email, password);

    res.send({ message: 'Tudo certo!' });
  } catch (e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
};

Usando essas fronteiras como exemplo, *nada além da camada de controle deveria saber que o Express existe .*


### Mantenha sua configuração separada (e segura)

Nos exemplos de aula, vimos que as informações sensíveis, como credenciais de acesso ao banco de dados, estavam todas expostas no nosso código. 😱

Só fizemos isso para fins didáticos. Uma ótima prática é usar variáveis de ambiente para controlar coisas relacionadas à configuração geral da sua aplicação (em qual banco se conectar, para qual URL apontar etc.). Variáveis de ambiente são variáveis que podem ser definidas no sistema operacional e, portanto, podem ser diferentes para cada ambiente (computador). Por exemplo, no seu computador local, a URL do banco é uma, mas, no servidor da aplicação, a URL do banco é outra. Para fazer isso funcionar, você pode utilizar uma variável de ambiente chamada DB_URL e utilizar valores diferentes para ela no servidor e na sua máquina local.

*OK, e como eu acesso essa variável no código?*

O ambiente Node tem uma variável global que se chama process ; dentro dela temos um objeto env que armazena os valores de todas as variáveis de ambiente definidas no sistema operacional.

Podemos setar variáveis de ambiente pelo terminal:

MYSQL_HOST=localhost node index.js

// index.js

console.log(process.env.MYSQL_HOST) // localhost

No entanto, uma forma melhor e mais fácil, quando temos muitas variáveis, é criar um arquivo .env na raiz do projeto e usar a biblioteca dotenv , que basicamente pega o conteúdo desse arquivo e o deixa acessível via process.env .


npm install dotenv

# .env
PORT=3000
MYSQL_HOST=localhost
MYSQL_DB_NAME=model_example

// index.js

require('dotenv').config();
// ...

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// Server listening on port 3000


// models/connection.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: 'sua_senha',
    database: process.env.MYSQL_DB_NAME });

module.exports = connection;


Por último, não se esqueça de colocar o .env no .gitignore , pois não vamos querer versionar esse arquivo.

Dessa forma, as configurações da sua aplicação podem mudar de acordo com o ambiente, ou até mesmo com o tempo ficam separadas do código, que é o mesmo em qualquer ambiente. Além disso, você não estará mais adicionando dados sensíveis ao seu repositório, visto que o arquivo .env contém esses valores e não será versionado.
