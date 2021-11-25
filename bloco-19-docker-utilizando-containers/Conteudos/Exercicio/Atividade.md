## Agora a prática ##

Vamos juntar tudo o que aprendemos até aqui e exercitar mais ainda nosso aprendizado!

1) No Docker Hub https://hub.docker.com/search?q=&type=image , utilizando a caixa de busca ( "Search for great content" ) , busque pela imagem da Distribuição Linux Debian ;

2) Uma vez que encontrar a imagem oficial , acesse-a (clicando em seu card) e verifique na página de detalhes, se existe algum comando para baixarmos a imagem localmente sem ter que criar um container para isso ;

R: docker pull debian

3) Baixe a imagem utilizando a tag : stable-slim , que é uma versão reduzida da distribuição;

R: docker pull debian:stable-slim

4) Após baixar a imagem para seu computador local, crie e execute um container no modo interativo utilizando essa imagem como referência (não esqueça referenciar a tag ) ;

docker container run -it debian:stable-slim

5) No terminal, você deve conseguir rodar o comando cat /etc/*-release , que vai retornar os dados da distribuição Debian que está sendo rodada dentro do container ;

  root@8bbd23bdcdab:/# cat / etc/*-release
cat: /: Is a directory
PRETTY_NAME="Debian GNU/Linux 11 (bullseye)"
NAME="Debian GNU/Linux"
VERSION_ID="11"
VERSION="11 (bullseye)"
VERSION_CODENAME=bullseye
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"


6) Encerre o terminal ;

exit

7) Verifique na sua lista de containers , qual o container é referente ao exercício que acabou de praticar;

R: docker container ls -a

8) Inicie o mesmo container novamente , sem criar outro. Valide se ele está ativo na lista de containers;

docker container start id

9) Retome o container que foi criado anteriormente nesse exercício ;
R: á que o container foi inicializado anteriormente de modo interativo, pudemos retomar seu terminal. 
  docker attach id


10) Rode o comando cat /etc/debian_version que deve retornar a versão atual do sistema do container ;

R: 11.1

11) Encerre o terminal ;

R: exit

12) Remova somente o container criado para esse exercício ;

R: docker container rm id

13) (Bônus) Crie e rode de modo interativo em modo 'Cleanup' , a imagem andrius/ascii-patrol ;

R: docker container run --rm andrius/æscii-patrol

14) (Bônus) Encerre o container utilizando os botões [ ctrl ] + [ c ].