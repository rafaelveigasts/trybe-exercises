## Recursos obtidos à partir de outro recurso

Agora que estamos coletando todos os livros, que tal coletarmos também a descrição de cada livro?
O problema é que a descrição só pode ser acessada navegando até a página específica de cada livro.

Descrição do livro está em sua página de detalhes
▶️ O primeiro passo é investigarmos como descobrir a URL que nos leva até a página de detalhes de um produto. 🔍

Descrição do livro está em sua página de detalhes

Com esse seletor em mãos, precisamos recuperar o atributo href que contém o link para a página de detalhes do livro. Vamos criar um outro arquivo, apenas para fazer o teste da feature que queremos implementar, depois vamos alterar o código do arquivo exemplo_scrape.py para realmente implementar a função. ⚠️Lembre-se de criar o arquivo no mesmo diretório que já estava utilizando.

teste.py

from parsel import Selector
import requests

URL_BASE = "http://books.toscrape.com/catalogue/"

# Vamos testar com a primeira página

response = requests.get(URL_BASE + "page-1.html")
selector = Selector(text=response.text)

# Recupera o atributo href do primeiro elemento que combine com o seletor

href = selector.css(".product_pod h3 a::attr(href)").get()
print(href)

# Para obter a url completa, basta adicionar a nossa URL_BASE

print(URL_BASE + href)
▶️ Em seguida, acessamos a página de detalhes do produto, e inspecionamos a descrição do produto.

Inspecionando a descrição de um livro.

▶️ A descrição do produto está uma tag p, "irmã" de uma tag com id product_description. Isto pode ser expresso através do seletor a.
No código, precisamos realizar uma nova requisição à página de detalhes e depois analisaremos seu conteúdo em busca da descrição do produto. Para isso, vamos alterar todo o conteúdo novamente, porém dessa vez será o conteúdo do arquivo teste.py:
teste.py

from parsel import Selector
import requests

URL_BASE = "http://books.toscrape.com/catalogue/"

response = requests.get(URL_BASE + "page-1.html")
selector = Selector(text=response.text)

href = selector.css(".product_pod h3 a::attr(href)").get()
detail_page_url = URL_BASE + href

# baixa o conteúdo da página de detalhes

detail_response = requests.get(detail_page_url)
detail_selector = Selector(text=detail_response.text)

# recupera a descrição do produto

# ~ significa a tag irmã

description = detail_selector.css("#product_description ~ p::text").get()
print(description)
▶️ Por fim, vamos adicionar a lógica para buscar a descrição do produto no nosso código existente:
exemplo_scrape.py

# from parsel import Selector

# import requests

# URL_BASE = "http://books.toscrape.com/catalogue/"

# Define a primeira página como próxima a ter seu conteúdo recuperado

# next_page_url = 'page-1.html'

while next_page_url: # Busca o conteúdo da próxima página # response = requests.get(URL_BASE + next_page_url) # selector = Selector(text=response.text) # Imprime os produtos de uma determinada página
for product in selector.css(".product_pod"): # Busca e extrai o título e o preço # title = product.css("h3 a::attr(title)").get() # price = product.css(".price_color::text").get() # print(title, price)

        # Busca o detalhe de um produto
        detail_href = product.css("h3 a::attr(href)").get()
        detail_page_url = URL_BASE + detail_href

        # Baixa o conteúdo da página de detalhes
        detail_response = requests.get(detail_page_url)
        detail_selector = Selector(text=detail_response.text)

        # Extrai a descrição do produto
        description = detail_selector.css("#product_description ~ p::text").get()
        print(description)

    # Descobre qual é a próxima página
    # next_page_url = selector.css(".next a::attr(href)").get()
