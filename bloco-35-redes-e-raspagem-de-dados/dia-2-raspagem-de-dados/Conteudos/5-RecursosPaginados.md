## Recursos paginados

Tudo certo, temos 20 livros, mas sabemos que na verdade este site possui 1000 livros. Que tal coletarmos todos?!

### Navegação até a página 2

Navegando um pouco por entre as páginas, percebemos que cada página possui uma referência para a próxima. Mas, se a URL é sequencial, por que não jogamos valores até a página avisar que o recurso não foi encontrado? 🤔

Acontece que podemos evitar fazer requisições desnecessárias, já que a página nos informa a próxima.

O que precisamos fazer é criar um seletor com a página, extrair os dados, buscar a nova página e repetir todo o processo, até termos navegados em todas as páginas.
Até a parte da extração nós já fizemos, vamos então dar uma olhada em como buscar a próxima página:

Inspecionando o botão de próximo
exemplo_scrape.py

# ...

# for product in selector.css(".product_pod"):

# title = product.css("h3 a::attr(title)").get()

# price = product.css(".price_color::text").get()

# print(title, price)

# Existe uma classe next, que podemos recuperar a url através do seu elemento âncora

next_page_url = selector.css(".next a::attr(href)").get()
print(next_page_url)

Agora que sabemos como recuperar a próxima página, podemos iniciar na primeira página e continuar buscando livros enquanto uma nova página for encontrada. Cada vez que encontrarmos uma página, extraímos seus dados e continuamos até acabarem as páginas. Então vamos alterar tudo que tínhamos escrito no arquivo exemplo_scrape.py para o código abaixo:
exemplo_scrape.py

from parsel import Selector
import requests

# Define a primeira página como próxima a ter seu conteúdo recuperado

URL_BASE = "http://books.toscrape.com/catalogue/"

next_page_url = 'page-1.html'
while next_page_url: # Busca o conteúdo da próxima página
response = requests.get(URL_BASE + next_page_url)
selector = Selector(text=response.text) # Imprime os produtos de uma determinada página
for product in selector.css(".product_pod"):
title = product.css("h3 a::attr(title)").get()
price = product.css(".price_color::text").get()
print(title, price) # Descobre qual é a próxima página
next_page_url = selector.css(".next a::attr(href)").get()

Nossa, quantos livros! 📚
