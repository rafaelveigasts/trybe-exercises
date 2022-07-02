## Requisições web

A comunicação com servidores HTTP e HTTPS se dá através de requisições, nas quais utilizamos o verbo para indicar que tipo de ação deve ser tomada para um dado recurso. Devemos informar na requisição em qual recurso estamos atuando e no cabeçalho passamos algumas informações que podem ser importantes, como o tipo de resposta aceita ou o tipo de conteúdo sendo enviado.

O Python possui um pacote para lidar com o protocolo HTTP, porém este não é tão amigável para seres humanos. Por isso vamos utilizar a biblioteca requests, que possui uma interface bem mais amigável. Ela pode ser instalada utilizando o comando abaixo, mas lembre-se de criar um ambiente virtual antes de instalar bibliotecas.
Para recordar como criar um ambiente isolado, acesse este conteúdo.

$ python3 -m pip install requests

Abaixo vamos ver alguns exemplos de como utilizar a biblioteca requests:

import requests

# Requisição do tipo GET

response = requests.get("https://www.betrybe.com/")
print(response.status_code) # código de status
print(response.headers["Content-Type"]) # conteúdo no formato html

# Conteúdo recebido da requisição

print(response.text)

# Bytes recebidos como resposta

print(response.content)

# Requisição do tipo post

response = requests.post("http://httpbin.org/post", data="some content")
print(response.text)

# Requisição enviando cabeçalho (header)

response = requests.get("http://httpbin.org/get", headers={"Accept": "application/json"})
print(response.text)

# Requisição a recurso binário

response = requests.get("http://httpbin.org/image/png")
print(response.content)

# Recurso JSON

response = requests.get("http://httpbin.org/get")

# Equivalente ao json.loads(response.content)

print(response.json())

# Podemos também pedir que a resposta lance uma exceção caso o status não seja OK

response = requests.get("http://httpbin.org/status/404")
response.raise_for_status()
