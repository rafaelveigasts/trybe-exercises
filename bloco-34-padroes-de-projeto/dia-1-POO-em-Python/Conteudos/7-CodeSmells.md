## Code Smells

Conforme naturalmente desenvolvemos o nosso código, existem algumas práticas que a princípio podem parecer a melhor solução para determinado problema. Entretanto, causam o efeito contrário e por muitas vezes trazem eventuais novos problemas.

Estas práticas acabaram ficando famosas na comunidade de programação por serem coisas que acontecem frequentemente. Assim, foram apelidados de code smells, ou seja, maus cheiros no código, indicando que algo está errado, embora possa não parecer de imediato.

Reconhecer tais práticas é importante para que possamos identificá-las em nosso código e assim evitar problemas e dificuldades. Você pode ter se deparado com algumas delas, só talvez ainda não soubesse seus nomes. Bora conferir?

Long Method: métodos grandes geralmente significam mais de uma responsabilidade em um mesmo trecho de código. Por isso, como regra geral, métodos não devem ser muito longos;

Large Class: classes grandes geralmente significam mais de uma responsabilidade. Por isso, como regra geral, classes não devem ser muito grandes;

Duplicate Code: códigos duplicados geralmente significam falta de abstração, ou seja, lógica repetida que poderia estar centralizada em uma única entidade compartilhada. Assim sendo, uma aplicação não deve ter trechos de código duplicados;

Dead Code: se um código não está mais sendo utilizado, por que ainda está lá?

Speculative Generality: quem nunca tentou adivinhar o futuro e tornou uma implementação mais complicada do que precisava? Essa aqui é extremamente comum de fazermos sem perceber!

Vamos nos aprofundar em mais alguns exemplos, Data Clumps e Middle Man.

### Ocorre quando um grupo de variáveis (como o endereço de entrega do exemplo que veremos abaixo) é passado junto como parâmetro em várias partes do programa. É indicativo de que esses grupos devam ser transformados em suas próprias classes.

Exemplo:
Imagine que você tem um aplicativo para uma hamburgueria local que só faz entregas na própria cidade. Nesta plataforma, queremos registrar uma pessoa com seu nome e endereço para facilitar as entregas.

class User:

    def __init__(self, name, street, number, district):
        '''Você nunca vai passar a rua sem passar também o número e o bairro!'''
        self.name = name
        self.address_street = street
        self.address_number = number
        self.address_district = district
Solução

class Address:
    def __init__(self, street, number, district):
        '''As informações que nunca vem separadas são uma entidade separada agora.'''
        self.street = street
        self.number = number
        self.district = district

class User:
    def __init__(self, name, address):
        self.name = name
        self.address = address

De olho na dica👀: Se você sabe que essas informações vão servir exclusivamente para leitura e nunca vão ser alterados diretamente, o Python tem uma solução super simples para elas: namedtuple. Observe o exemplo a seguir:

from collections import namedtuple

GeoPoint = namedtuple('GeoPoint', 'lat lon')
location = GeoPoint(-22.81711234090266, -47.069559317039655)
print(location.lat) # muito melhor do que location[0]


### Middle Man

Se uma classe somente delega uma ação para outra, por que deveria existir? Remova o intermediário!

Exemplo:

Temos uma plataforma onde a pessoa jogadora (Player) possui jogos (PlayerGame) e participa de torneios (Tournaments). Nesta plataforma, temos um cliente que precisa consultar os torneios de poker de uma pessoa jogadora.

Para fins de uso desse exemplo, utilizaremos a pessoa jogadora com id 1 e o jogo de poker que ela comprou também com id 1.

class Player:
    # ...

    def game(self, game_id):
        '''Busca um jogo da pessoa através do seu id'''
        return PlayerGame.query.filter(game_id=game_id, user_id=self.id).first()

    def tournaments(self, game_id):
        '''Aqui estamos buscando pelos jogos de uma pessoa para encontrar
        seus torneios.

        Ou seja, usamos o middle man PlayerGame para encontrar o torneio.
        O que além de adicionar complexidade de código, adiciona uma consulta
        extra ao banco de dados.
        '''
        return self.game(game_id).tournaments()

class PlayerGame:

    def tournaments(self):
        return Tournament.query.filter(game_id=self.game_id).all()


class Tournament:
    # ...

# Código cliente

player = Player(id=1)
print(player.tournaments(1))
Solução

class Player:
    # ...
    def tournaments(self, game_id):
        '''Aqui removemos o middle man PlayerGame da consulta,
        fazendo-a diretamente em Tournament.

        Com isso simplificamos o nosso código e removemos uma consulta.
        '''
        return Tournament.query.filter(game_id=game_id, user_id=self.id).all()

class Tournament:
    ...

# Código cliente

player = Player(id=1)
print(player.tournaments(1))

Se quiser conhecer mais sobre code smells, consulte o Refactoring Guru! https://refactoring.guru/ E não deixe de conferir também as regras do seu linter, https://www.flake8rules.com/#pyflakespois um linter busca alguns code smells e impedem de deixá-los em nosso código!

Como estão os ânimos para a próxima aula? Te garanto que o próximo conteúdo está imperdível, principalmente porque vamos ver os tipos de padrões de projeto.
