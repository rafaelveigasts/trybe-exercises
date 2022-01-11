## Testes automatizados

### Ferramentas

Automatizar testes é uma necessidade tão presente no dia-a-dia dos times de desenvolvimento que é assunto constante de discussões e evoluções.

Hoje, já é um assunto amplamente difundido e é possível encontrar diversos tipos, técnicas, implementações e ferramentas diferentes. Essa base sólida sobre o assunto nos ajuda bastante, já que temos diversas ferramentas já consolidadas prontas para serem utilizadas.

Já vimos algumas outras ferramentas desse tipo em conteúdos anteriores, como o Jest e o assert .

Para implementar testes no back-end iremos utilizar a dupla mocha e chai . Apesar de serem duas ferramentas diferentes, elas se completam.

⚠️ Importante: Conforme dito, existem diversas ferramentas disponíveis para teste, e inclusive é possível utilizar o próprio Jest, que vimos em conteúdos anteriores, para testes no back-end também. 

Porém, como o objetivo é desenvolver uma mentalidade de testes independente das ferramentas, utilizaremos essa stack específica, mas, os conceitos são os mesmos.

Para utilizarmos essas ferramentas precisamos primeiro fazer a instalação, repare que utilizaremos a flag -D . Esses módulos só serão utilizados em fase de desenvolvimento e não serão utilizados para executar nossa aplicação quando ela for publicada. Dessa forma, evitamos instalar pacotes desnecessários em nossa versão de produção.

npm install -D mocha chai

Feita a instalação já podemos importá-las em um arquivo .js e escrever nossos testes.
