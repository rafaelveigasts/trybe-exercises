## Um pouco de contexto

Quando escrevemos testes, pensamos em cenários distintos que podem ocorrer ao nosso sistema: "dado um arquivo com as seguintes linhas", "visto que temos um banco de dados com um dado registro" ou "a partir de um cliente web". Damos o nome de test fixture (ou apenas fixture) às precondições ou estados necessários para a execução de um teste.

Cada teste pode ter seu próprio cenário (contexto) ou compartilhá-lo com outros testes.
test_codigo.py

# get_most_ordered_dish_per_costumer é uma função que retorna o prato mais pedido por uma
# determinada pessoa cliente, considerando que os pedidos estão em uma lista.

# get_order_frequency_per_costumer é uma função que retorna a frequência que uma determinada
# pessoa cliente pede um determinado prato , considerando que os pedidos estão em uma lista.


# uma fixture utilizando a biblioteca pytest
# é definida utilizando a sintaxe abaixo
@pytest.fixture
def orders():
    """Nosso cenário (contexto) temos os seguintes pedidos"""
    return [
        {"customer": "maria", "order": "pizza", "day": "terça-feira"},
        {"customer": "joao", "order": "hamburger", "day": "terça-feira"},
        {"customer": "maria", "order": "pizza", "day": "quarta-feira"},
        {"customer": "maria", "order": "hamburger", "day": "quinta-feira"},
    ]

# estamos adicionando a fixture orders ao teste
# ou seja temos um contexto onde os pedidos são os definidos anteriormente
def test_get_most_ordered_dish_per_costumer_when_customer_is_maria(orders):
    assert get_most_ordered_dish_per_costumer(orders, "maria") == "pizza"

# novamente adicionamos um cenário (contexto) ao teste onde os pedidos realizados são os
# definidos na fixture
def test_get_order_frequency_per_costumer_when_customer_is_joao_and_order_is_pizza(orders):
    assert get_order_frequency_per_costumer(orders, "joao", "pizza") == 0

def test_get_order_frequency_per_costumer_when_customer_is_maria_and_order_is_hamburger(orders):
    assert get_order_frequency_per_costumer(orders, "maria", "hamburger") == 1
É importante ressaltar que este contexto poderia ser a abertura de uma conexão com o banco de dados, uma referência à conexão a um cliente web, um arquivo temporário ou qualquer outro contexto. Também vale lembrar que é possível usar mais de um contexto por teste caso seja necessário, bem como um contexto dentro de outro.
⚠️ Atenção: Você deve ter notado o uso de um @ no código. Ele é o decorator do Python. Com ele podemos adicionar funcionalidades aos nossos códigos, "decorando" o que uma outra função faz (no caso acima, a função pytest.fixure). Não se preocupe com essa sintaxe por enquanto. Você poderá ler mais sobre decorators aqui. https://docs.python.org/pt-br/3/glossary.html#term-decorator
