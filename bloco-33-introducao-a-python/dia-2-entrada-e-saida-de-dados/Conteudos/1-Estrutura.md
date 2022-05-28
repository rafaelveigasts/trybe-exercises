## Estruturando uma aplicação

### Módulos

Um módulo é um arquivo que contém definições e instruções em Python. O nome do arquivo é um nome acrescido de .py. Você pode importar um módulo dentro de um outro arquivo Python e ter acesso às suas funções, classes, etc.

Em linhas gerais, todo arquivo que é escrito com a linguagem Python e com a extensão .py é considerado um módulo.

Observe o arquivo my_math.py abaixo:

def sum(a, b):
  return a + b


def pot(a, b):
  return a ** b


print(sum(2, 2))
print(pot(2, 3))

Este arquivo é um módulo Python, que pode ser executado como script com o comando python3 my_math.py. Se isso ocorrer, o retorno será 4 e 8, respectivamente, devido às chamadas das funções dentro dos métodos print().

Entretanto, as funções que criamos neste arquivo podem ser reaproveitadas por outros módulos através da declaração import.

À medida que fomos avançando, esses conceitos ficarão cada vez mais claros.

## Pacotes 📦

Pacotes são módulos Python que contêm outros módulos e/ou pacotes, comumente separados por responsabilidades similares. Na prática, um pacote é um diretório que pode conter vários módulos (arquivos de extensão .py) e/ou outros pacotes.
Exemplo de tipos diferentes de imports de pacotes:

import http  # importa o pacote http como um módulo

from http import client  # importa o módulo client do pacote http

from http.client import HTTP_PORT  # importa a constante HTTP_POST do módulo client do pacote http

Tudo isso ficará mais perceptível, à medida que formos avançando no conteúdo.

## Ambiente Virtual

Imagine que em uma máquina há um projeto Python que contém alguns pacotes de terceiros instalados e, dentre eles, há uma biblioteca na versão 1.4. Imagine também que, na mesma máquina, é iniciado um novo projeto que precisa da mesma biblioteca, mas dessa vez na versão 2.0. O que fazer? As versões são compatíveis? Se eu atualizar o sistema, a versão antiga vai continuar a funcionar?

O venv entra como resposta a essas perguntas! Ele é um módulo já embutido na linguagem, e serve para isolar ambientes de projetos. Ou seja, eu consigo ter dois projetos rodando em dois ambientes diferentes, que podem ter versões diferentes de uma mesma biblioteca.

Na prática, vamos instalar as bibliotecas em um diretório que está relacionado ao projeto. Assim, cada projeto pode ter suas próprias bibliotecas na versão que quiser. A ideia é a mesma do npm que vocês já vêm usando.

O comando para criação deste ambiente isolado é python3 -m venv .venv, sendo que .venv é o nome do ambiente isolado. Este comando deve ser executado na raiz do projeto.

💡 Caso o venv não esteja instalado, utilize o comando sudo apt install python3-venv.

Este ambiente isolado será visto como um diretório criado na raiz do projeto. O ponto na frente do nome faz com que o diretório fique oculto.

Depois de criado, temos que ativar este ambiente para usá-lo. Isto é importante pois sempre que decidirmos trabalhar neste projeto devemos repetir este passo.

$ source .venv/bin/activate

<img src='environment.jpg' />


Você pode conferir se o comando de ativação do ambiente virtual deu certo com o seguinte comando:

$ which python3

O resultado será o caminho para a pasta onde você criou seu ambiente virtual (pwd), acrescido de .venv/bin/python3.

Pronto! Agora nosso ambiente está preparado para a instalação das bibliotecas que precisaremos nos nossos projetos.
