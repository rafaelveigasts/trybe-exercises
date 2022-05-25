## Escrevendo os primeiros arquivos

Até aqui, programamos utilizando o terminal interativo e tínhamos uma resposta logo em seguida. Mas, se fecharmos o terminal vamos perder tudo que fizemos até agora, além disso programas do dia a dia não funcionam assim.

Por isso, vamos começar a escrever nossos primeiros arquivos de código? Mas antes de seguirmos, que tal darmos uma olhadinha no Guia de configuração de ambiente Python? https://app.betrybe.com/course/real-life-engineer/python/

Antes de escrever nosso primeiro arquivo, precisamos saber que todo arquivo com extensão .py é considerado um módulo.

Módulos são declarados utilizando snake case, ou seja, com nomes minúsculos e quando possuírem mais de uma palavra, devem ser separadas por underscore (_).
Vamos agora criar o arquivo area.py, declarando funções que calculam a área de algumas figuras geométricas.

area.py

PI = 3.14  # PI é uma "constante" em nosso módulo


def square(side):
    '''Calculate area of square.'''
    return side * side


def rectangle(length, width):
    '''Calculate area of rectangle.'''
    return length * width


def circle(radius):
    '''Calculate area of circle.'''
    return PI * radius * radius

    

Observe que esse código segue algumas boas práticas para legibilidade, tais como:

Entre cada função temos um espaço de 2 linhas;
As funções são declaradas com nomes em letras minúsculas;
A constante PI é definida em letras maiúsculas.

⚠️Aviso: Existe uma convenção de declarar valores considerados constantes com letras maiúsculas, e o respeito por outros programadores de não alterarem aquele valor.

Abra um terminal e para executar o módulo em python, escreva python3 area.py. Se não houve nenhum erro de digitação, nada deve ter acontecido. Neste módulo só temos definições das funções e valores, mas não estamos executando nenhuma delas. Isto é o que chamamos de execução do módulo como script.

Hora de testá-lo! No fim do arquivo, vamos adicionar algumas linhas para imprimir a área de algumas figuras geométricas.

print("Área do quadrado:", square(10))
print("Área do retângulo:", rectangle(2, 2))
print("Área do círculo:", circle(3))

Vamos utilizar o nosso módulo de calcular área de figuras planas. Escreva um novo arquivo com nome people.py e ele será um script para calcular pessoas que estão presentes em um show, dado a área do mesmo.
Este script será escrito da seguinte maneira:
people.py

import area


PEOPLE_AT_CONCERT_PER_SQUARE_METER = 2  # numero de pessoas por metro quadrado em média
FIELD_LENGTH = 240  # em metros
FIELD_WIDTH = 45  # em metros
PEOPLE_AT_CONCERT = area.rectangle(FIELD_LENGTH, FIELD_WIDTH) // PEOPLE_AT_CONCERT_PER_SQUARE_METER


print("Estão presentes no show aproximadamente", PEOPLE_AT_CONCERT, "pessoas")

Anota aí ✏️: O import é utilizado para termos todas as funções do módulo disponíveis em outro arquivo. Uma outra maneira de utilizarmos é escrevendo from area import rectangle, por exemplo, se quisermos importar apenas rectangle a partir de area. Porém, tome cuidado com conflitos de nomes caso use essa segunda maneira.

Ao executá-lo com o comando python3 people.py, vemos que a saída não foi bem como esperávamos.

Execução exibe os testes feitos no módulo de área.

Os nossos valores de teste estão sendo exibidos quando importamos o módulo. Mas não queremos que isso aconteça.

Para corrigir, podemos acrescentar uma condicional ao módulo para somente exibir esses valores de teste quando o módulo for executado como script.

A variável __name__ é utilizada pelo interpretador Python para identificar o arquivo que esta sendo executado e seu valor será "__main__" quando invocamos um módulo como script.
area.py
# ...


if __name__ == "__main__":
    print("Área do quadrado:", square(10))
    print("Área do retângulo:", rectangle(2, 2))
    print("Área do círculo:", circle(3))
Ao executarmos novamente nosso script, agora tudo está ok! 🎉

Execução só exibe o resultado correto.
Agora que já conhecemos sobre a linguagem de programação Python, chegou a hora de avaliarmos nosso aprendizado por meio do quiz do dia !
