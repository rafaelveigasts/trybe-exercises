## Model

O model é onde nós manipulamos e definimos a estrutura dos nossos dados. Todo acesso aos dados deve passar por essa camada.

Os dados que a aplicação utiliza podem estar armazenados em um banco de dados, acessados através de uma API externa, arquivos ou outros dispositivos de armazenamento.

O model é responsável por abstrair completamente os detalhes de acesso e armazenamento, fornecendo somente uma API que permita requisitar e manipular esses dados. Por exemplo, é responsabilidade da camada de models estabelecer uma conexão com o banco de dados.

As demais camadas não devem saber, por exemplo, se o banco utilizado é MySQL ou qualquer outro banco (como PostgreSQL , MongoDB , etc) , ou se sequer há um banco de dados. O model se encarrega de fazer o *mapeamento* dos dados armazenados para as entidades existentes no domínio do seu negócio.

É no model que verificaremos se a nova pessoa usuária que estamos tentando criar é válida de acordo com as regras de negócio definidas, como vimos na página ( Introdução - Arquitetura de Software https://app.betrybe.com/course/content/a7ff4898-41e9-4e1b-ac57-a78a4a97c29b ), ou se a pessoa que está tentando apagar um post tem permissão para tal.

À medida que você for aprendendo sobre as camadas de uma aplicação, você verá que o model deve ser completamente desacoplado das demais camadas. Ou seja, o model não pode ter conhecimento dessas camadas. Isso facilita a manutenção do código, pois alterações em outras camadas não terão impacto nos seus modelos.

Outro benefício é uma maior reusabilidade de código. Por exemplo, com uma camada de modelo bem definida, nós poderíamos criar uma versão CLI da nossa aplicação somente utilizando a API que ela define, sem nenhuma duplicação de código.

Vamos a um rápido exemplo sem muitos detalhes para fixar melhor o conceito:

    // userModel.js

    const db = require('./db'); // Arquivo "fictício" que representa a conexão com o banco

    async function getUser (username) {
        return db.findOne({ username })
        .then(result => result || null);
    }

Agora podemos utilizar esse arquivo em qualquer lugar onde precisemos de um usuário. Por exemplo, numa interface de linha de comando:

    // cli.js

    const readline = require('readline-sync');
    const userModel = require('./userModel');

    async function start() {
        const username = readline.question('Digite seu nome de usuário');
        const user = await userModel.getUser(username);

        if (!user) {
            return console.log('Usuário não encontrado');
        }

        console.log('Aqui estão os dados do usuário:');
        console.log(user);
    }

    start();


Ao mesmo tempo, podemos utilizar nosso model em um middleware:

    // getUserMiddleware.js

    const userModel = require('./userModel');

    function getUserMiddleware (req, res, next) {
        const { username } = req.body;

        const user = await useModel.getUser(username);

            if (!user) {
                return res.status(404).json({ message: 'user não encontrado' });
            }

            return res.status(200).json(user);
        }catch(e){
            res.status(500).json({message: `Algo deu errado :(`});
        }

    

Dessa forma, caso nossos usuários passem a estar armazenados em outro lugar, como num arquivo, ou num outro banco de dados, nós só precisaremos alterar o arquivo userModel.js e, automaticamente, tudo volta a funcionar.
