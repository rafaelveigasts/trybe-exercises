## Manipulação de arquivos

Seja para armazenar alguma informação processada, para manipular imagens, áudios, vídeos ou recuperar dados de uma planilha, precisamos manipular arquivos.

Podemos fazer uma operação de leitura, de escrita ou até de ambas, a depender da nossa necessidade. Porém, independentemente da operação executada, é preciso sempre fechar o arquivo após operá-lo.

A função open é a responsável por abrir um arquivo, tornando possível sua manipulação. Seu único parâmetro obrigatório é o nome do arquivo. Por padrão, arquivos são abertos somente para leitura, mas podemos modificar isto passando o modo com que vamos abrir o arquivo. No exemplo abaixo, estamos utilizando mode="w", ou seja, estamos abrindo o arquivo para escrita:

file = open("arquivo.txt", mode="w")  # ao abrir um arquivo para escrita, um novo arquivo é criado mesmo que ele já exista, sobrescrevendo o antigo.

Para escrevermos um conteúdo em um arquivo utilizamos a função write:

# file = open("arquivo.txt", mode="w")

file.write("nome idade\n")
file.write("Maria 45\n")
file.write("Miguel 33\n")

💡 Só é possível escrever em um arquivo após abri-lo em um modo que permita escrita.

Assim como podemos redirecionar a saída do nosso programa para a saída de erros, podemos redirecionar o conteúdo digitado dentro de print para um arquivo. Ou seja, também podemos escrever em um arquivo através do print.

#
# file.write("Miguel 33\n")


# Não precisa da quebra de linha, pois esse é um comportamento padrão do print
print("Túlio 22", file=file)

Para escrever múltiplas linhas podemos utilizar a função writelines. Repare que a função espera que cada linha tenha seu próprio caractere de separação (\n):

#
# print("Túlio 22", file=file)


LINES = ["Alberto 35\n", "Betina 22\n", "João 42\n", "Victor 19\n"]
file.writelines(LINES)
Abrimos o arquivo e escrevemos seu conteúdo. Vamos então fechá-lo:

# file.writelines(LINES)


file.close()

Mas por que devemos sempre fechar um arquivo? A resposta vem do sistema operacional: temos uma quantidade limite de arquivos que podemos abrir de uma só vez e um erro é retornado quando atingimos esse limite. Vamos ver um código para demonstrar a ocorrência de um erro ao abrir muitos arquivos ao mesmo tempo:

arquivos = []
for index in range(10240):
    arquivos.append(open(f"arquivo{index}.txt", "w"))

O número que o programa irá falhar pode variar, pois o sistema operacional mantém alguns arquivos abertos para seu próprio uso.

Outro motivo importante para se fechar os arquivos é que normalmente a manipulação de arquivos é feita através de buffers. Ou seja, a escrita em disco pode não ser imediata. Quando fechamos o arquivo, garantimos que tudo aquilo que ainda não está escrito seja persistido.

A leitura do conteúdo de um arquivo pode ser feita utilizando a função read. Para experimentar, vamos escrever em um arquivo e lê-lo logo em seguida!

# escrita
file = open("arquivo.txt", mode="w")
file.write("Trybe S2")
file.close()

# leitura
file = open("arquivo.txt", mode="r")
content = file.read()
print(content)
file.close()  # não podemos esquecer de fechar o arquivo
Um arquivo é também um iterável, ou seja, pode ser percorrido em um laço de repetição. A cada iteração, uma nova linha é retornada. Vamos fazer igual ao exemplo anterior, porém dessa vez vamos escrever mais de uma linha!

# escrita
file = open("arquivo.txt", mode="w")
LINES = ["Olá\n", "mundo\n", "belo\n", "do\n", "Python\n"]
file.writelines(LINES)
file.close()

# leitura
file = open("arquivo.txt", mode="r")
for line in file:
    print(line)  # não esqueça que a quebra de linha também é um caractere da linha
file.close()  # não podemos esquecer de fechar o arquivo
Além de arquivos textuais (como os que manipulamos até agora), também existem arquivos binários. Eles são arquivos que contêm uma série de bytes e a sua leitura pode variar de acordo com o arquivo. Nesse caso, devemos acrescentar um b ao parâmetro mode, indicando que será utilizado o modo binário.
As operações são similares a de um arquivo textual. Porém tanto a escrita quanto a leitura devem ser feitas utilizando bytes.

# escrita
file = open("arquivo.dat", mode="wb")
file.write(b"C\xc3\xa1ssio 30")  # o prefixo b em uma string indica que seu valor está codificado em bytes
file.close()

# leitura
file = open("arquivo.dat", mode="rb")
content = file.read()
print(content)  # saída: b'C\xc3\xa1ssio 30'
file.close()  # não podemos esquecer de fechar o arquivo
