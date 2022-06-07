## Método Construtor/Inicializador

Após modelada nossa Classe do objeto, podemos partir para o Construtor. Na maioria das linguagens, o construtor cria a instância do objeto e já inicializa os seus atributos.

Em python, esta operação é dividida em dois métodos:

new (Construtor)
init (Inicializador).

Anota aí ✏️: O Python já implementa estes métodos por padrão para cada nova classe criada. Mas, você pode implementá-los novamente, ou seja, reescrevê-los. É desse modo que customizamos nosso construtor/inicializador.
Basta recriar o método init dentro de nossa classe, conforme exemplo a seguir:

class Liquidificador:
    def __init__(self, cor, potencia, voltagem):
        self.__cor = cor
        self.__potencia = potencia
        self.__voltagem = voltagem
        self.__ligado = False
        self.__velocidade = 0
        self.__velocidade_maxima = 3

O primeiro parâmetro, o self, representa a instância do objeto, ou seja, tem acesso ao objeto na memória. Com o método init, inicializamos os atributos do objeto apenas atribuindo um valor a cada nova chave.

Exemplo: self.ligado = False.

Os próximos parâmetros são os que permitem criar de forma customizada nosso objeto, como a cor: self._cor = cor.

Agora podemos criar nossos primeiros liquidificadores:

liquidificador_azul = Liquidificador('Azul', 200, 127)
liquidificador_vermelho = Liquidificador('Vermelho', 250, 220)

Perceba que é possível ter atributos que não precisam ser passados por parâmetros na chamada do construtor, por exemplo: os booleanos __ligado e __velocidade, pois o construtor vai iniciá-los sempre com um valor padrão, nestes casos, False e 0, respectivamente.

