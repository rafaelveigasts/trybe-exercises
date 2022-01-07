### Sistema de módulos

Já citamos acima que uma das maiores vantagens do Node.js é a grande quantidade de pacotes e bibliotecas disponíveis publicamente no npm ; agora chegou a hora de aprendermos o que é um pacote Node e como podemos utilizá-los no nosso código.

Pra começar, vamos entender o que é um módulo em Node.js: um módulo é um "pedaço de código" que pode ser organizado em um ou mais arquivos, e que possui escopo próprio, ou seja: suas variáveis, funções, classes e afins só estão disponíveis nos arquivos que fazem parte daquele módulo. Em outras palavras, um módulo é uma funcionalidade ou um conjunto delas que se encontram isoladas do restante do código.

O Node.js possui três tipos de módulos: internos, locais e de terceiros.

### Módulos internos

Os módulos internos (ou core modules ) são inclusos no Node.js e instalados junto com ele quando baixamos o runtime . Alguns exemplos de core modules são:

Clique no nome de cada módulo para abrir a documentação oficial (em inglês).

fs : Fornece uma API para interagir com o sistema de arquivos de forma geral; https://nodejs.org/api/fs.html

url : Provê utilitários para ler e manipular URLs; https://nodejs.org/api/url.html

querystring : Disponibiliza ferramentas para leitura e manipulação de parâmetros de URLs; https://nodejs.org/api/querystring.html

util : Oferece ferramentas e funcionalidades comumente úteis a pessoas programadoras. https://nodejs.org/api/util.html

### Módulos locais

Módulos locais são aqueles definidos juntamente à nossa aplicação. 

Representam funcionalidades ou partes do nosso programa que foram separados em arquivos diferentes.

Módulos locais podem ser publicados no NPM para que outras pessoas possam baixá-los e utilizá-los, o que nos leva ao nosso próximo e último tipo de módulo.

### Módulos de terceiros

Módulos de terceiros são aqueles criados por outras pessoas e disponibilizados para uso através do npm . Conforme mencionado, nós também podemos criar e publicar nossos próprios módulos, quer seja para utilizarmos em diversas aplicações diferentes, quer seja para permitir que outras pessoas os utilizem. Veremos como fazer isso ainda hoje.

Ufa! São alguns conceitos diferentes pra se acostumar, né? Mas tudo bem, você está indo bem. Resumindo o que acabamos de ver sobre módulos no Node.js: módulos são "caixinhas" que isolam suas funções, variáveis e afins de outras partes do código; eles podem ser internos (que vêm com o Node.js), locais (criados por nós na nossa máquina) ou de terceiros (baixados do NPM). Além disso, o NPM é o site em que publicamos nossos pacotes, e npm é a ferramenta de linha de comando que realiza o gerenciamento desses pacotes pra nós.
