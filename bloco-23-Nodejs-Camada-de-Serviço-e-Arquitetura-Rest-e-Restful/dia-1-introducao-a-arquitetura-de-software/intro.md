## O que vamos aprender?

Neste bloco, você vai aprender a melhorar a organização e a divisão de responsabilidades em suas aplicações Node.js e Express,utilizando um dos padrões arquiteturais mais famosos do mercado: o MSC !

Além disso, você verá como acessar um banco MySQL e entenderá o que é a arquitetura de cliente-servidor.

## Introdução
### O que é "Arquitetura de Software"?

Existem várias definições formais para essa pergunta. Uma ótima definição foi dada por Martin Fowler:

  Arquitetura é um conhecimento compartilhado por desenvolvedores experientes sobre como organizar um sistema de software.

É a maneira como o sistema se organiza, quais são seus componentes, como eles conversam entre si, como as responsabilidades são distribuídas e etc. Podemos, inclusive, fazer um paralelo com a arquitetura civil.

Se você tem uma casa na neve, provavelmente o telhado dessa casa terá um formato de "V" bastante inclinado para que a neve não se acumule no topo da residência. Já uma casa para um clima quente não necessariamente precisa seguir esse padrão de telhado, visto que ele nunca vai ver neve na vida. Se a casa ficar em um local com alta criminalidade, vamos ver mais muros do que em uma área com menos criminalidade e por aí vai.

Se você trabalhasse com engenharia civil e fosse construir uma casa, você com certeza não tentaria fazê-la "da sua cabeça". Quais materiais você usaria, como iria integrá-los, que técnicas utilizar para construir a casa, onde cada coisa ficaria ? Para tudo isso já existem padrões e métodos testados. Você pode combinar soluções, adaptá-las, estendê-las, mas utilizará um conhecimento testado e compartilhado por outras pessoas profissionais da área.

A mesma coisa se aplica à arquitetura de um software. Existem padrões de arquitetura específicos para problemas específicos.

Mas uma coisa que podemos ver quase sempre, independente da arquitetura utilizada, é a divisão de responsabilidades por camadas .

### Regras de negócio

Antes de falarmos de camadas, precisamos falar de regras de negócio , pois esse é um conceito essencial para entender a motivação por trás das arquiteturas. Você, provavelmente, já ouviu ou leu bastante essa expressão, mas sabe o que ela significa?

Como o próprio nome dá a entender, regras de negócio definem ou restringem algum aspecto de um negócio . São elas que definem como o negócio deve se comportar, quando uma ação deve ser tomada e etc. As regras de negócio devem ser muito bem definidas e documentadas, pois guiam as tomadas de decisões e moldam processos. Em princípio, as regras de negócio podem ser executadas manualmente, mas tem se tornado cada vez mais comum automatizá-las com a ajuda de sistemas de software.

Para tornar o conceito menos abstrato, vamos a alguns exemplos.

Imagine um sistema que permite cadastro de pessoas usuárias. Estas são algumas regras de negócio que o sistema poderia ter:

- Uma pessoa usuária deve necessariamente informar seu nome, sobrenome e email;

- O email deve ser único, ou seja, não pode haver outra pessoa usuária no sistema com o mesmo email;

- Por conter material sensível, a pessoa deve ser maior de 18 anos e declarar estar de acordo com os termos de uso da plataforma;

- Sempre que uma nova pessoa usuária se cadastrar, um email de confirmação deve ser enviado para o email cadastrado. Novas pessoas usuárias somente poderão acessar a plataforma após serem verificadas.

Como outro exemplo, imagine uma rede social fictícia em que as pessoas podem fazer posts sobre os mais diferentes assuntos. Algumas regras de negócio que essa rede social poderia ter:

- Cada post pode ter no máximo 300 caracteres;

- Pessoas podem comentar nas postagens umas das outras;

- Uma pessoa só pode editar ou excluir suas próprias postagens;

- Contudo, ela pode bloquear outras pessoas usuárias, impedindo-as de comentar e ver as suas postagens.

Naturalmente, em sistemas de software, as regras de negócio se traduzem em códigos que controlam o comportamento das aplicações.

Com o conceito de regras de negócio bem entendido, podemos falar das três camadas do MSC e quais são as responsabilidades de cada uma.

### Arquitetura MSC

Ao longo desse bloco iremos abordar a arquitetura MSC. Vamos entrar em detalhes ao longo dos conteúdos de cada dia, mas, fazendo um resumo, podemos definir as três camadas das seguinte forma:

*Camada de Modelo (M):* Arquivos onde iremos executar as operações do banco de dados, como criar conexões e executar queries.

*Camada de Serviço (S):* Arquivos onde iremos estruturar nossas regras de negócio, geralmente é quem chama os métodos definidos na camada de modelo.

*Camada de Controladores (C):* Interface mais próxima da pessoa usuária ou de uma requisição, vai processar e chamar as devidas funções da camada de serviço.

A imagem abaixo ilustra essa arquitetura.

<img src="arquitetura_msc.png" />

Obs.: Algumas vezes a camada de Controladores pode se comunicar direto com a camada de Modelo, dispensando o uso da camada de Serviço, principalmente em situações em que não temos uma regra de negócio tão complexa. Mas cuidado, isso deve ser usado apenas em casos específicos, e uma vez que um endpoint exija o uso de uma camada de Serviço, o ideal é que todos os outros também utilizem essa camada, para que a arquitetura seja respeitada e a aplicação não torne-se "bagunçada".

### Recursos adicionais

Software Architecture Guide - Martin Fowler
https://martinfowler.com/architecture/

O que são regras de negócio e quais as vantagens de aplicá-las em uma empresa
https://www.heflo.com/pt-br/automacao-processos/o-que-sao-regras-de-negocio/

Entenda o que são e confira 10 exemplos de regras de negócio
https://www.heflo.com/pt-br/definicoes/regra-de-negocio/