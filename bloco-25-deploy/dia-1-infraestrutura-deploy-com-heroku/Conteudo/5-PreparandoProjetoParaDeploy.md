## Preparando um projeto para deploy

Vamos fazer nosso primeiro deploy no Heroku! 🎉
Para isso, inicie um projeto React:

npx create-react-app meu-primeiro-deploy-heroku
Em seguida, entre na pasta do projeto. Normalmente, o comando create-react-app já inicia um projeto git, mas, caso isso não aconteça, execute o comando para iniciar o projeto:

git init
git add .
git commit -m ‘Initialize project using Create React App’

## Listando os remotes

Para listar os remotes de seu projeto, execute o seguinte comando:

**git remote -v**
Como acabamos de iniciar o projeto git , não temos nenhum remote vinculado à nossa aplicação. Com isso, vá no seu GitHub e crie um repositório meu-primeiro-deploy-heroku .

Após ter criado o repositório, vá ao terminal e execute o comando para vincular a sua aplicação ao repositório criado no GitHub. Para isso, você pode:
Utilizar chave ssh:

git remote add origin git@github.com:[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git

Ou, se preferir, utilizar HTTPS também:

git remote add origin https://github.com/[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git

Por fim, execute novamente o comando git remote -v . Você verá que, dessa vez, aparecerá algo parecido com:

origin git@github.com:[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git (fetch)

origin git@github.com:[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git (push)

## Heroku remote

Para adicionar o remote do Heroku , basta usar o comando create do CLI dentro da pasta da aplicação, da seguinte maneira:

## heroku create

Após esse comando, liste novamente os remotes e você verá um novo remote chamado heroku , apontando para um repositório em https://git.heroku.com/ .

Heroku gera automaticamente um nome aleatório para o repositório, de forma que o nome seja único. Algo parecido com nameless-plateau-10138 .

Nota : Antes de executar novamente o comando heroku create , remova o heroku que já existe no remote da aplicação, caso contrário será criado um novo repositório no Heroku sem a associação a nenhum remote . Para excluir um remote:

**git remote rm heroku**

Para dar um nome específico para o repositório, você pode informá-lo logo após o comando heroku create , como mostrado no exemplo abaixo:

**heroku create meu-primeiro-deploy-2930**

Como esse nome deve ser único, caso já exista algum repositório com este nome no Heroku , será retornado um erro solicitando que seja escolhido um novo. Por isso, um número aleatório no final pode evitar que esse erro ocorra. 😉

Ao executar o comando heroku create em seu projeto, ele passa a ser um app do Heroku. Isso significa que o Heroku pode entendê-lo e gerenciá-lo. E neste caso qual será o remote associado a este novo app? Como você excluiu o remote anterior, ele é associado a um remote chamado heroku , como no início.

## Nomeação do remote

Por padrão, o CLI vai nomear todos os remotes criados como heroku . Porém, podemos criar o nosso remote passando um nome diferente. Isso pode ser feito utilizando a flag --remote :

**heroku create meu-deploy-de-testes-29302 --remote heroku-homolog**

Com o comando acima, nós mantemos o remote heroku e adicionamos o novo remote heroku-homolog com o nome meu-deploy-de-testes-29302 . 🙂

## Repositórios Remotos Atuais

Podemos, também, renomeá-los utilizando o comando git remote rename . Vale lembrar que o comando abaixo não vai manter o remote heroku , ele vai renomear o remote heroku para heroku-origin .

**git remote rename heroku heroku-origin**

Criar um outro remote da forma que fizemos ou renomear seu remote pode ser útil se você tiver múltiplos apps do Heroku usando o mesmo código fonte. Por exemplo, uma versão para o ambiente de testes e outra para um ambiente de produção. Nesse caso, cada app do Heroku tem seu próprio remote no seu repositório local.

Nota: Mantenha os remotes do seu projeto como heroku e heroku-homolog .

## Vincular um app existente a um novo remote

Você já sabe renomear e até remover um remote que estava associado a um app do Heroku. Suponhamos que agora seja necessário vincular um app a um outro remote , pois ao removê-lo anteriormente com git remote rm nome-do-remote , o app que estava associado a ele, ficou sem um remote .

Utilize a sintaxe **heroku git:remote -a nome-do-seu-app-heroku --remote nome-do-seu-remote .**

Nota: No caso de haver mais de uma aplicação em seu repositório, você pode usar o comando -a que é um alias de --app para escolher a aplicação que será usada.

Acesse este link para ver mais comandos do Heroku Cli https://devcenter.heroku.com/articles/heroku-cli-commands

**heroku git:remote -a meu-deploy-de-testes-29302 --remote heroku-test**

**app meu-deploy-de-testes-29302 associado a um novo remote chamado heroku-test**

## Buildpack

Em alguns casos, precisamos rodar algum script ou realizar alguma configuração para publicar nosso app. Por exemplo, para publicar uma aplicação React precisamos "servi-la" com um server-side app (back-end), como, por exemplo, um server com express .

Porém, para facilitar, existem os buildpacks, que automatizam esses e outros processos. Existem buildpacks oficiais do Heroku mas também existem aqueles criados e publicados pela comunidade. Seja como for, eles podem agregar muito em nosso processo de Deploy .

Com um buildpack, conseguimos fazer facilmente o deploy da nossa aplicação criada em React. Faremos isso utilizando o buildpack mars/create-react-app https://github.com/mars/create-react-app-buildpack#usage . Além disso, ele utilizará Nginx, https://nginx.org/en/ , o que vai prover uma otimização da performance e da segurança ao nosso app .

Legal, né? E o melhor: é muito simples utilizá-los.

Vamos mostrar no próximo tópico como usaremos o buildpack https://elements.heroku.com/buildpacks que mencionamos com nosso exemplo em React.
Você pode consultar o catálogo de buildpack aqui.
