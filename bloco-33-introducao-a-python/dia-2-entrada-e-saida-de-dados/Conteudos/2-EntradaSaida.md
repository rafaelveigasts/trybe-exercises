## Entrada e Saída

Funções podem receber argumentos das pessoas que usam o programa, processá-los e retornar algum valor. Mas como estes argumentos chegam a elas? E o resultado do nosso processamento, como exibi-lo para a pessoa utilizando nossa aplicação?
De modo geral, podemos dizer que um programa seria menos útil se não pudéssemos coletar valores de pessoas usuárias, e muito menos agradável de se utilizar caso o resultado apresentado fosse pouco legível.
Existem algumas maneiras de nos comunicarmos com o exterior do programa em Python para receber dados, assim como existem maneiras de melhorar a exibição dos nossos resultados.

## Entrada

Uma das maneiras que existem de receber valores em nossos programas é através da função input, que vem embutida na própria linguagem. Esta função está vinculada à entrada padrão do sistema operacional e tem como parâmetro opcional o prompt que, caso seja fornecido, exibirá a mensagem passada para ele em tela. O valor recebido através da função será do tipo texto (str):

input("Digite uma mensagem:")

O programa permanece parado até que algum dado seja fornecido. Isto pode ser feito digitando algum conteúdo, teclando Enter, ou podemos também ter os dados redirecionados de um arquivo ou outra fonte. Veja um exemplo de um programa com entrada de dados fornecido pela pessoa usuária:

import random

random_number = random.randint(1, 10)  # escolhe um número aleatório entre 1 e 10
guess = ""

while guess != random_number:  # enquanto não adivinhar o número
    guess = int(input("Qual o seu palpite? "))  # pergunte a pessoa usuária um número

print("O número sorteado era: ", guess)

💡 Fazemos uma conversão do palpite para um número inteiro, pois entrada de dados é sempre str.
💡 Para rodar o exemplo acima, não crie um arquivo chamado random para inserir o código, pois o módulo que estamos importando se chama random e isso pode causar um erro! Lembre-se que, para rodar o código, você deve executar o comando python3 nome_do_arquivo.py no terminal.

Outra maneira de recebermos valores externos na execução de nossos programas é utilizando o módulo sys. Quando executamos um script e adicionamos parâmetros, os mesmos estarão disponíveis através de uma variável chamada sys.argv, que é preenchida sem que precisemos fazer nada. Na prática, podemos escrever o conteúdo abaixo em um arquivo e passar alguns parâmetros ao executá-lo.

import sys


if __name__ == "__main__":
    for argument in sys.argv:
        print("Received -> ", argument)

Podemos executar o código usando os parâmetros através do comando abaixo:

$ python3 arquivo.py 2 4 "teste"

A saída será:

Received ->  arquivo.py
Received ->  2
Received ->  4
Received ->  teste

## Saída

Como já visto, a função print — que já vem embutida na linguagem — é a principal função para imprimirmos um valor em "tela". Normalmente esta função escreve na saída padrão do sistema operacional, mas veremos que é possível modificar este e outros comportamentos.
Esta função recebe parâmetros de forma variável, ou seja, pode receber nenhum, um, dois ou n parâmetros durante sua invocação.

print("O resultado é", 42)  # saída: O resultado é 42
print("Os resultado são", 6, 23, 42)  # saída: Os resultados são 6 23 42

O separador padrão dos argumentos é um espaço em branco, que pode ser alterado.

print("Maria", "João", "Miguel", "Ana")  # saída: Maria João Miguel Ana
print("Maria", "João", "Miguel", "Ana", sep=", ")  # saída: Maria, João, Miguel, Ana

Além do separador, podemos também alterar o caractere de fim de linha que, por regra, é uma quebra de linha:

print("Em duas ")
print("linhas.")

Saída:

Em duas
linhas.
Alterando o padrão:

print("Na mesma", end="")
print("linha.")

Saída:

Na mesma linha.

Já sabemos que erros podem acontecer e o sistema operacional normalmente espera que um programa escreva seus erros na saída de erros.
Existe um parâmetro que nos permite modificar a saída padrão para a saída de erros:

import sys


err = "Arquivo não encontrado"
print(f"Erro aconteceu: {err}", file=sys.stderr)

💡 Em Python, podemos fazer interpolação de variáveis e expressões utilizando f-string. Adicionamos um f antes das aspas e o valor de saída entre chaves. Essa dica é importante, pois é a maneira mais eficiente de formatar strings.

x = 5
y = 3
print(f"{x} / {y} = {x / y:.2f}")  # saída: 5 / 2 = 1.67
# {x} é substituído por 5
# {y} é substituído por 3
# {x / y:.2f} O que vem após os dois pontos são formatadores, como nesse exemplo, duas casas decimais (.2f).
print(f"{x:.^3}")  # saída: ".5."
# . é o caractere utilizado para preencher
# ^ indica que o valor será centralizado
# 3 são o número de caracteres exibidos

Antes de prosseguirmos, vamos resolver alguns exercícios.
Exercício 1: Faça um programa que solicite o nome de uma pessoa usuária e imprima-o na vertical. Exemplo:

F
U
L
A
N
O

Exercício 2: Escreva um programa que receba vários números naturais e calcule a soma desses valores. Caso algum valor da entrada seja inválido (por exemplo uma letra), uma mensagem deve ser exibida na saída de erros no seguinte formato: "Erro ao somar valores, {valor} é um valor inválido". Ao final, você deve imprimir a soma dos valores válidos.

🦜 Receba os valores em um mesmo input, solicitando à pessoa usuária que separe-os com um espaço. Receba os valores no formato str e utilize o método split para pegar cada valor separado. O método isdigit, embutido no tipo str, pode ser utilizado para verificar se a string corresponde a um número natural.
