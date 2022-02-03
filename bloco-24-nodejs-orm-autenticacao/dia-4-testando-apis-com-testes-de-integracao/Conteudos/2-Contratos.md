## Contratos

Agora que já sabemos o nível de integração que iremos testar, ou seja, quais partes serão cobertas pelos nossos testes, precisamos saber o que exatamente queremos testar e de qual forma .

Iremos definir isso a seguir, mas antes, vamos refletir sobre um conceito importante.

Sempre quando consumimos ou fornecemos um serviço, como por exemplo uma API REST, precisamos ter os comportamentos pré definidos. Esses comportamentos são definidos de acordo com as **regras de entrada e saída de dados da API .**

Por exemplo, ao chamar um endpoint GET /users/:userId passamos um ID de usuário e esperamos receber os dados referentes aquele usuário com um código http 200 - OK . Caso o usuário não seja encontrado, esperamos receber um status http 404 - Not Found , por exemplo.

Perceba que temos diversos padrões definidos e comportamentos esperados. Dessa forma, podemos testar exatamente se esses comportamentos estão sendo cumpridos por nossas API's, retornando uma resposta compatível com o cenário.

Em testes, esse conceito é chamado de contratos . Por exemplo, ao se alugar um imóvel, é necessário assinar um contrato onde está definido tudo aquilo que foi combinado entre as partes. Nos testes de contratos de API, a ideia é bem semelhante, o contrato define aquilo que foi previamente acordado, ou seja, como a API deverá se comportar em um determinado cenário.

Para ficar ainda mais nítido, vamos utilizar novamente o endpoint GET /users/:userId . Podemos dizer que o contrato dele é, quando a pessoa usuária existe, retornar a seguinte resposta:

Código HTTP: 200 - OK ;
Body:

{
    "id": "123",
    "name": "jane",
    "fullName": "Jane Doe",
    "email": "janedoe@trybemail.com"
}

Esse conceito trabalha muito bem junto com os testes de integração, pois podemos testar se cada contrato está sendo cumprido após o processamento de todas as camadas.
