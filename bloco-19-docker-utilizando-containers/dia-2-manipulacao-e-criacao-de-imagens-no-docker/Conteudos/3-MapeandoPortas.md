## Mapeamento de Portas ##
 
Agora que já entendemos um pouco mais sobre containers, imagens e suas respectivas diferenças, faremos o uso de containers e imagens de uma forma um pouco mais complexas.

Vamos criar um container para manter um servidor *HTTP Apache*, para entendermos também como funciona a parte de redes em Docker .

  * Veremos melhor futuramente, mas um Servidor HTTP (Ou servidor web) é um aplicativo capaz de disponibilizar arquivos (como páginas de internet) através de requisições via protocolo de comunicação HTTP , que é o mais utilizado na navegação via internet.

  Existem vários servidores http no mercado. No nosso exemplo, utilizaremos o Servidor HTTP Apache , bastante popular entre pessoas desenvolvedoras da linguagem PHP .

Para começarmos, rode o seguinte comando para baixar a imagem do servidor:

  docker run -d -P httpd:2.4

Veremos mais adiante, mas aqui você já deve ter notado o uso do parâmetro -P , ele é utilizado para que o Docker faça um mapeamento de portas automático para acesso ao container.


A imagem será baixada e poderemos ver a instalação da imagem com suas respectivas camadas que citamos anteriormente:


Unable to find image 'httpd:2.4' locally
4: Pulling from library/httpd
ac1a72c06a: Pull complete
bfe7b4bf0: Pull complete
afd2f9c4a94: Pull complete
fc9247a27: Pull complete
a9b714c567d8: Pull complete
Digest: sha256:307e3a2f43cd2c58ac37a093dd9adfc2598d00ca4cc0dd978cb1a56ccad4a39f
Status: Downloaded newer image for httpd:2.4
f9f61da552b994f39fb4e363f6e0ca295c77f6944e923871671e2b11ab93f05a

Se rodarmos o comando docker ps , podemos perceber o seguinte na coluna PORTS:
  docker ps

CONTAINER ID   IMAGE       COMMAND              CREATED         STATUS         PORTS                                     NAMES
f9f61da552b9   httpd:2.4   "httpd-foreground"   4 minutes ago   Up 4 minutes   0.0.0.0:55000->80/tcp, :::55000->80/tcp   brave_maxwell

Servidores http necessitam de uma porta de acesso . No nosso caso, é possível ver que ocorreu um mapeamento automático da porta padrão do container Apache (porta 80 ), para uma das portas do nosso sistema hospedeiro (aqui esse valor foi 55000 , mas no seu computador pode ser outro)*.
* Aqui é interessante pensar em um exemplo com aplicações em React, já que quando estamos desenvolvendo, frequentemente testamos nosso App em um micro servidor web, cujo acesso se dá via protocolo http, na porta padrão 3000: http://localhost:3000
Desse modo, se quisermos acessar o site estático mantido pelo servidor Apache , podemos acessar o endereço http://localhost:55000 (Ou a porta que seu Docker definir para a imagem) no navegador.
É importante ressaltar que a porta 80 é a porta interna que é enxergada somente dentro do container e a porta 55000 é a porta externa, ou seja, aquela que pode ser acessada em nossa máquina.

<img src="giphy.gif" />

Uma analogia que podemos fazer sobre esse assunto é do filme Alice no País das Maravilhas . Existe um momento em que Alice se depara com as portas que dividem o mundo real do País das Maravilhas.

Dessa forma, podemos entender que a porta 55000 é a porta do mundo real (nossa máquina) e a porta 80 é do País das Maravilhas ( Docker ). A ligação entre essas portas conecta os dois mundos para que possamos transitar entre eles.

Depois de criado esse vínculo na rede entre o Docker e nossa máquina, qualquer coisa que esteja na nossa máquina e que seja preciso rodar no servidor dentro do container funcionará a partir de uma comunicação efetiva entre esses dois ambientes.

A forma que temos de identificar os containers é por meio do CONTAINER ID , porém, esses números complexos podem acabar nos confundindo na execução de algum comando.

Para resolver isso, existe a possibilidade de nomear seu container. Dessa forma, não precisamos depender de ids aleatórios que o Docker atribui e assim ficará mais fácil parar ou remover o container.

Para dar um nome ao container, basta utilizar a flag --name :

  docker run -d -P --name site-trybe httpd:2.4  docker run -d -P --name site-trybe httpd:2.4

