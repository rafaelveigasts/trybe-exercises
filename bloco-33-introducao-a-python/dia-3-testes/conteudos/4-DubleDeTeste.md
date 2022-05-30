## Dublês de teste


Em testes automatizados (de unidade) é desejado que cada teste não interfira no estado manipulado por outro teste, e também que recursos externos (arquivos, internet, banco de dados) não atrapalhem a sua execução. Por isso, é muito comum a utilização de dublês de testes para simular estes recursos externos.

Estes componentes simulados de software são chamados de mock (de forma genérica), mas existem diversas técnicas específicas de simulações que nos ajudam a escrever os testes.

Podemos substituir componentes para que retornem um determinado valor simulado ou podemos substituir os componentes por objetos falsos que registram as informações sobre sua invocação, como o número de vezes em que foram chamados ou os parâmetros com o qual foram chamados.

Na literatura encontramos as técnicas de dublê com os nomes fakes, mocks, stubs e spies. De uma forma bem resumida, podemos defini-las da seguinte maneira:

Fakes: Objetos que possuem implementações funcionais, porém normalmente simplificadas;
Mocks: São pré programados para verificar as chamadas das funções que receberem;
Stubs: Fornecem respostas predefinidas;
Spies: São como stubs, mas também armazenam informações de como foram chamados.

Caso queira mais detalhes, dê uma olhada no artigo https://martinfowler.com/bliki/TestDouble.html do Martin Fowler sobre o assunto ou no material complementar sobre dublês de testes que se encontra na seção "Recursos adicionais".

Vamos analisar dois cenários e escrever seus respectivos testes utilizando dublês, evitando assim a dependência externa a um arquivo real.
No primeiro cenário nós temos nossa dependência externa (o arquivo) sendo recebido como parâmetro.

pokemon.py

import json


def retrieve_pokemons_by_type(type, reader):
    # lê o conteudo de reader e o transforma de json
    # para dicionário
    pokemons = json.load(reader)["results"]
    # filtra somente os pokemons do tipo escolhido
    pokemons_by_type = [
        pokemon for pokemon in pokemons if type in pokemon["type"]
    ]
    return pokemons_by_type

Vamos utilizar uma técnica onde substituiremos a abertura do nosso arquivo real por um objeto que possui as implementações funcionais de um arquivo (método read, necessário na operação de leitura). Este objeto será alocado na memória, "simulando" nosso arquivo real.

test_pokemon.py

import json
import pytest
from pokemon import retrieve_pokemons_by_type
from io import StringIO

# Criamos o contexto de um pokemon do tipo grama
@pytest.fixture
def grass_type_pokemon():
    return {
        "national_number": "001",
        "evolution": None,
        "name": "Bulbasaur",
        "type": ["Grass", "Poison"],
        "total": 318,
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "sp_atk": 65,
        "sp_def": 65,
        "speed": 45,
    }


# Criamos o contexto de um pokemon do tipo água
@pytest.fixture
def water_type_pokemon():
    return {
        "national_number": "007",
        "evolution": None,
        "name": "Squirtle",
        "type": ["Water"],
        "total": 314,
        "hp": 44,
        "attack": 48,
        "defense": 65,
        "sp_atk": 50,
        "sp_def": 64,
        "speed": 43,
    }


def test_retrieve_pokemons_by_type(grass_type_pokemon, water_type_pokemon):
    # criamos um arquivo em memória que o seu conteúdo são os dois pokemons
    fake_file = StringIO(
        json.dumps({"results": [grass_type_pokemon, water_type_pokemon]})
    )
    # quando pesquisamos por pokemons do tipo grama,
    # o pokemon do tipo água não deve ser retornado
    assert grass_type_pokemon in retrieve_pokemons_by_type("Grass", fake_file)

Um segundo cenário é onde a função espera o nome de um arquivo e a abertura do mesmo acontece dentro da função.
pokemon.py

import json


def retrieve_pokemons_by_type(type, filepath):
    with open(filepath) as file:
        pokemons = json.load(file)["results"]
        pokemons_by_type = [
            pokemon for pokemon in pokemons if type in pokemon["type"]
        ]
        return pokemons_by_type

Para escrever este teste, vamos aproveitar da natureza dinâmica da linguagem e substituir o método open em tempo de execução por um objeto mock_open, que já vem embutido na linguagem e se comporta como o open, retornando o que foi definido em read_data como seu conteúdo. Um detalhe interessante é que esse objeto obtido através da função mock_open também possui a capacidade de armazenar informações sobre como foram as chamadas de seus métodos e os parâmetros recebidos.

test_pokemon.py

import json
from unittest.mock import mock_open, patch
from pokemon import retrieve_pokemons_by_type

def test_retrieve_pokemons_by_type():
    # definimos um pokemon do tipo grama
    grass_type_pokemon = {
        "national_number": "001",
        "evolution": None,
        "name": "Bulbasaur",
        "type": ["Grass", "Poison"],
        "total": 318,
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "sp_atk": 65,
        "sp_def": 65,
        "speed": 45,
    }
    # definimos também um pokemon do tipo água
    water_type_pokemon = {
        "national_number": "007",
        "evolution": None,
        "name": "Squirtle",
        "type": ["Water"],
        "total": 314,
        "hp": 44,
        "attack": 48,
        "defense": 65,
        "sp_atk": 50,
        "sp_def": 64,
        "speed": 43,
    }
    pokemon_json_content = json.dumps({"results": [grass_type_pokemon, water_type_pokemon]})
    # substituímos a função padrão do python open por mock_open
    # uma versão que se comporta de forma parecida, porém simulada
    with patch("builtins.open", mock_open(read_data=pokemon_json_content)):
        # repare que o nome do arquivo não é importante aqui
        # a esses parâmetros não utilizados damos o nome de dummies
        # como neste contexto alteramos o open pelo mock_open,
        # o argumento "dummy" poderia ser substituído por qualquer coisa, já que não será utilizado pela função
        assert retrieve_pokemons_by_type("Grass", "dummy") == [
            grass_type_pokemon
        ]
        
A primeira abordagem torna o código menos acoplado a um arquivo e nos permite utilizar qualquer objeto (que tenha o método reader) em seu lugar. Assim, essa função pode ser reutilizada, por exemplo, para ler pokemons a partir de uma requisição web ou outra fonte.
💡 Testes de unidade são muito importantes, mas não se esqueça de testar também a integração de suas funções e a funcionalidade como um todo.
