## Limpeza de dados

🧼🧽 Estamos extraindo nossos dados, porém estes dados contém algumas "sujeiras" que podem atrapalhar em nossas análises. Por exemplo, pare pra olhar o preço do livro, viu algo diferente? O preço possui um caractere estranho Â£26.08 antes do seu valor. E a descrição do livro que contém o sufixo ...more.

Seria conveniente, antes de estruturar e armazenar estes dados, que fizéssemos uma limpeza neles.

No caso do valor, poderíamos utilizar uma expressão regular para remover os outros caracteres. O padrão é conter um símbolo de libra, seguido por números, ponto para separar casas decimais e dois números como casas decimais. Essa expressão regular pode ser feita da seguinte forma: £\d+\.\d{2}.

Agora, para utilizar a expressão regular que fizemos, podemos substituir o método getall pelo método re, ou o método get por re_first. Ambos, além de recuperar valores, aplicarão a expressão regular sobre aquele valor.

Vamos primeiro fazer essas features, novamente, no arquivo de teste.py para vermos funcionando. Depois vamos implementá-las no arquivo exemplo_scrape.py:

teste.py

from parsel import Selector
import requests

response = requests.get("http://books.toscrape.com/")
selector = Selector(text=response.text)

# Extrai todos os preços da primeira página

prices = selector.css(".product_price .price_color::text").re(r"£\d+\.\d{2}")
print(prices)

Já para o caso do sufixo ...more, poderíamos utilizar fatiamento para removê-lo. Mas antes é importante verificarmos se o conteúdo possui o sufixo, evitando assim perda de conteúdo de forma acidental. Vamos ver como isso funciona no arquivo teste.py:
teste.py

from parsel import Selector
import requests

response = requests.get("http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html")
selector = Selector(text=response.text)

# Extrai a descrição

description = selector.css("#product_description ~ p::text").get()
print(description)

# "Fatiamos" a descrição removendo o sufixo

suffix = "...more"
if description.endswith(suffix):
description = description[:-len(suffix)]
print(description)

Alguns outros exemplos de "sujeiras" são valores que contém tabulações, quebras de linha ou conteúdo além do esperado.

Agora vamos implementar essas funcionalidades no nosso arquivo exemplo_scrape.py:
exemplo_scrape.py

from parsel import Selector
import requests

# URL_BASE = "http://books.toscrape.com/catalogue/"

# Define a primeira página como próxima a ter seu conteúdo recuperado

# next_page_url = 'page-1.html'

# while next_page_url:

    # Busca o conteúdo da próxima página
    # response = requests.get(URL_BASE + next_page_url)
    # selector = Selector(text=response.text)
    # Imprime os produtos de uma determinada página
    # for product in selector.css(".product_pod"):
        # Busca e extrai o título e  o preço
        # title = product.css("h3 a::attr(title)").get()
        price = product.css(".product_price .price_color::text").re(r"£\d+\.\d{2}")
        # print(title, price)

        # Busca o detalhe de um produto
        # detail_href = product.css("h3 a::attr(href)").get()
        # detail_page_url = URL_BASE + detail_href

        # Baixa o conteúdo da página de detalhes
        # detail_response = requests.get(detail_page_url)
        # detail_selector = Selector(text=detail_response.text)

        # Extrai a descrição do produto
        # description = detail_selector.css("#product_description ~ p::text").get()
        suffix = "...more"
        if description.endswith(suffix):
            description = description[:-len(suffix)]
        # print(description)

    # Descobre qual é a próxima página
    # next_page_url = selector.css(".next a::attr(href)").get()

👀 De olho na dica: Strings em Python possuem vários métodos para ajudarem nesta limpeza, como por exemplo, o strip. Para ler a documentação e procurar esses métodos, execute help(str) no seu terminal interativo.

### Fatiamento

Estruturas de dados do tipo sequência, como listas, tuplas e strings, podem ter seus elementos acessados através de um índice:

# Recupera o primeiro elemento

[1, 2, 3][0] # Saída: 1
Podemos também definir dois índices que serão o valor inicial e final de uma subsequência da estrutura. Ou três valores, sendo o último o tamanho do passo que daremos ao percorrer a subsequência:

# Quando não incluso o valor inicial, iniciaremos do índice 0

# e do índice 2 em diante, os elementos não são incluídos

(1, 2, 3, 4)[:2] # Saída: (1, 2)

# Quando omitimos o valor final

# o fatiamento ocorre até o fim da sequência

(1, 2, 3, 4)[1:] # Saída: (2, 3, 4)

# Vá do índice 3 até o 7.

# O item no índice 7 não é incluído

"palavra"[3:7] # Saída: "avra"

# Começando do elemento de índice 1, vá até o último,

# saltando de 2 em 2

[1, 2, 3, 4][1::2] # Saída: [2, 4]

Chamamos esta operação de fatiamento. Ela é muito utilizada para obtermos uma subsequência de uma sequência.

⚠️À partir da versão 3.9 do Python, teremos uma função chamada removesuffix, que é equivalente à palavra[:-len(suffix)].
