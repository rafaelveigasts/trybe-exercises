## Utilizando o Heroku

### Executando localmente

Para rodar um projeto localmente utilizando o CLI do Heroku , basta instalar as dependências do projeto e utilizar o CLI da seguinte maneira:

npm install # Instalando as dependências em um exemplo NodeJs utilizando o npm.

**heroku local web**

Seu projeto rodará na porta 5000 . Rodar localmente pode ajudar a garantir que seu código está pronto para o deploy .

### Recapitulando sobre git…

Recapitulando o que aprendemos no módulo sobre git https://app.betrybe.com/course/content/82dcab41-249a-4738-8920-f0eb2cb91d1c , ao versionar nossos projetos, nós os associamos a repositórios remotos ( remotes ). Por padrão, o nome deste repositório remoto do git é origin . Para visualizá-lo, basta executar o comando git remote -v .
Para realizar o deploy pelo Heroku, precisamos adicionar mais um remote , dessa vez apontando para o servidor do Heroku .
Vamos ver, passo a passo, como fazer isso.
