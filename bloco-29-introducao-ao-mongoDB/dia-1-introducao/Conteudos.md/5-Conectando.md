## Conectando

Você vai aprender como se conectar ao MongoDB através do terminal.
Conectando-se ao Mongo via terminal

Veja no vídeo abaixo como você pode se conectar ao MongoDB Shell :

Como você viu durante a instalação, um dos componentes do pacote do MongoDB é o MongoDB Shell . Esse componente é uma interface de linha de comando (CLI - command line interface) que lhe permite conectar e administrar uma instância do MongoDB .

Para acessar o MongoDB Shell é muito simples. Com a instância rodando, basta abrir o terminal e executar o comando abaixo:

*mongo*

Assim, você já estará dentro da instância, que por padrão está rodando na porta 27017 (a porta padrão para instâncias MongoDB ). Se você quiser acessar uma instância em outra porta, basta passar o parâmetro --port :

*mongo --port 19000*

O retorno deve ser algo parecido com:

*MongoDB shell version v4.4.3*

connecting to: mongodb://127.0.0.1:19000/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("f0c79e43-ead0-42d9-bd7d-c8d6857e7221") }
MongoDB server version: 4.4.3
>

Você tem duas informações importantes:
na primeira linha, é exibida a versão do MongoDB Shell . Nesse caso, é v4.4.3
na penúltima linha, é exibida a versão do MongoDB Server, que também é a mesma: v4.4.3
A partir de agora, tudo o que você digitar será dentro da instância MongoDB . 

Veremos alguns comandos ao longo do bloco.

Para sair da instância e voltar ao terminal da sua máquina, basta digitar:

*exit*

Veja mais parâmetros permitidos no MongoDB Shell aqui . https://docs.mongodb.com/manual/reference/mongo-shell/

Existem outras interfaces visuais para o MongoDB que podem facilitar muito sua vida na hora de manipular seus bancos de dados. Algumas dessas interfaces são:

MongoDB Compass - https://www.mongodb.com/try/download/compass

MongoDB for VS Code - https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode

NoSQLBooster for MongoDB - https://nosqlbooster.com/downloads/mongodb/

No entanto, vale ressaltar que o MongoDB Shell já contempla tudo que será utilizado durante o curso, tornando essas interfaces visuais opcionais, e sua escolha como algo pessoal.