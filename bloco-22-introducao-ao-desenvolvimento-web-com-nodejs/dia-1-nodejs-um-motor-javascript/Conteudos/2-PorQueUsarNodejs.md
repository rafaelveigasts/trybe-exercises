## Por que usar Node.js

Ele está por toda a parte

Como dito anteriormente, o uso do Node.js pelo mercado de tecnologia vem crescendo muito nos últimos anos. Dados do site ModuleCounts.com  https://www.modulecounts.com/ mostram que, atualmente, o NPM, que é onde os pacotes Node.js são disponibilizados, é o repositório com mais pacotes quando comparado a repositórios de outras grandes linguagens, como mostra o gráfico abaixo:

<img src="modulecounts.png" />

Gráfico extraído no dia 17 de novembro de 2021, mostrando a quantidade de pacotes em vários repositórios.

Ter muitos pacotes publicados no repositório atual nos dá uma ideia de duas grandes vantagens que o Node.js tem sobre tecnologias concorrentes: uma comunidade extremamente ativa e uma grande quantidade de ferramentas para resolver os mais diversos tipos de problema.

### Performance

Quando comparado a outras grandes tecnologias, o Node.js nos permite escrever softwares servidores de requisições HTTP de forma muito mais eficiente. Isso se dá pelo fato de que toda leitura e escrita que ele realiza, tanto no disco quanto na rede, é feita de forma não bloqueante . Ou seja, quando o servidor recebe uma requisição e precisa, por exemplo, buscar dados no banco de dados, as demais requisições não precisam esperar que a primeira termine para que possam ser atendidas. Em outras palavras, o Node.js realiza todas as suas operações de entrada e saída de dados de forma assíncrona , utilizando processamento concorrente (veremos mais sobre fluxo assíncrono nos próximos dias).

Por serem mais eficientes e otimizadas que outras tecnologias, as aplicações feitas em Node.js acabam por consumir menos recursos dos servidores que as executam, tornando o Node.js uma tecnologia, em geral, mais barata que suas concorrentes.

### Aplicações em tempo real

A natureza não bloqueante do Node.js permite que alguns recursos sejam implementados na plataforma para facilitar o trabalho com operações em tempo real.

Bibliotecas como o socket.io  https://socket.io/ permitem que, com poucas linhas de código, aplicações em tempo real relativamente complexas (como chats com suporte a múltiplos usuários, conversas privadas e em grupo e outros recursos) sejam criadas por completo.

Num mundo em que a tecnologia está cada vez mais inserida em diversas áreas, ter suporte nativo da plataforma que utilizamos para aplicações em tempo real com certeza é muito bem-vindo.

### JavaScript

Muitas das vantagens do Node.js vêm do fato de que a linguagem executada por ele é o JavaScript.

Como já falamos antes, o JavaScript tem se mostrado uma linguagem extremamente versátil, estando presente em diversos ambientes, como a Web, Desktop, Mobile, dispositivos IoT (internet das coisas) e até mesmo em aparelhos televisores!

A versatilidade e baixa curva de aprendizado do JavaScript conferem ao Node um poder incrível para resolver as mais diversas situações.

### Então Node.js é a melhor tecnologia para tudo?

Você acabou de ver alguns dos motivos pelos quais o Node.js é a ferramenta ideal para vários tipos de projeto. No entanto, é importante lembrar que não existe bala de prata quando o assunto é tecnologia: a melhor ferramenta sempre depende do caso de uso e dos recursos disponíveis para desempenhar uma determinada tarefa.
