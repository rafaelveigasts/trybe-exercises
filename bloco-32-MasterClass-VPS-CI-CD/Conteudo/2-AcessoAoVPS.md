Acessando uma VPS
Por questões de segurança, o acesso à VPS deve ser feito via SSH, preferencialmente utilizando criptografia assimétrica. A criptografia assimétrica funciona por meio de duas chaves, uma pública e uma privada. A chave privada deve ficar somente com você, e ninguém mais deve ver (isso inclui outros computadores, ou seja, nada de compartilhar a chave privada). Já a chave pública pode ser tranquilamente compartilhada.
Acesso com login e senha
Apesar do uso de uma dupla de chaves ser o mais seguro e melhor, por mais que algumas fornecedoras de VPS ofereçam a opção de colar uma chave pública ou já criar um par de chaves, é provável que, ao contratar uma VPS, você receba um endereço IP https://pt.wikipedia.org/wiki/Endere%C3%A7o_IP e te peçam para criar uma senha.
Para acessar a VPS basta utilizar o comando ssh user@ip e digitar a senha quando for solicitado, onde user neste primeiro momento é root e ip é o endereço IP estático na VPS. Exemplo:


ssh root@191.252.218.185
The authenticity of host '191.252.218.185 (191.252.218.185)' can't be established.
ECDSA key fingerprint is SHA256:PVUGwMtsJqw1JD130syKCY0RgOcw3msh7u5lghirIqs.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '191.252.218.185' (ECDSA) to the list of known hosts.
root@191.252.218.185's password:
                          ./+o+-       root@vps17111
                  yyyyy- -yyyyyy+      OS: Ubuntu 20.04 focal
               ://+//////-yyyyyyo      Kernel: x86_64 Linux 5.4.0-104-generic
           .++ .:/++++++/-.+sss/`      Uptime: 3h 55m
         .:++o:  /++++++++/:--:/-      Packages: 630
        o:+o+:++.`..```.-/oo+++++/     Shell: sh
       .:+o:+o/.          `+sssoo+/    Disk: 6.0G / 61G (11%)
  .++/+:+oo+o:`             /sssooo.   CPU: Intel Xeon E5-2630 v4 @ 2x 2.2GHz
 /+++//+:`oo+o               /::--:.   RAM: 431MiB / 1944MiB
 \+/+o+++`o++o               ++////.
  .++.o+++oo+:`             /dddhhh.
       .+.o+oo:.          `oddhhhh+
        \+.++o+o``-````.:ohdhhhhh+
         `:o+++ `ohhhhhhhhyo++os:
           .o:`.syhhhhhhh/.oo++o`
               /osyyyyyyo++ooo+++/
                   ````` +oo+++o\:
                          `oo++.

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon 28 Mar 2022 03:48:16 PM UTC

  System load:  0.14              Processes:             129
  Usage of /:   9.4% of 58.99GB   Users logged in:       0
  Memory usage: 18%               IPv4 address for eth0: 191.252.218.185
  Swap usage:   0%

 * Super-optimized for small spaces - read how we shrank the memory
   footprint of MicroK8s to make it the smallest full K8s around.

   https://ubuntu.com/blog/microk8s-memory-optimisation
 updates can be applied immediately.


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

Last login: Mon Mar 28 15:47:27 2022 from 201.50.15.91
root@vps17111:~#


A tela de início do sistema varia de acordo com sistema operacional, versão desse sistema e customização da empresa que fornece a VPS (visto que ela pode fornecer uma imagem customizada do sistema para já atender necessidades internas)
Reiterando: por mais que na primeira vez que você acessar a VPS recém contratada você consiga fazer isso utilizando login e senha, esta não é a forma mais segura. É interessante neste caso configurar o acesso via SSH por meio de um conjunto de chaves pública e privada. Para isso, o primeiro passo é criar estas chaves.


Configurando o SSH client
Se você já tem ou já sabe gerar um par de chaves, pode pular esta parte. Utilizando o utilitário ssh-keygen (que vem junto com a instalação do OpenSSH https://www.openssh.com/ , já inclusa no Ubuntu) podemos gerar as duas chaves de uma só vez:


ssh-keygen

⚠ Cuidado! Se você já tiver um par de chaves com o nome padrão, pode sobrescrever estas chaves e perder acesso a recursos (VPS, GitHub, etc) que terão de ser reconfigurados. Se vir na saída do comando algo como /home/USERNAME/.ssh/id_rsa already exists. Overwrite (y/n)? digite n e pressione enter para cancelar a operação ⚠
A saída do comando deve ser algo como


Generating public/private rsa key pair.
Enter file in which to save the key (/home/USERNAME/.ssh/id_rsa):
Created directory '/home/USERNAME/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/USERNAME/.ssh/id_rsa
Your public key has been saved in /home/USERNAME/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:j7ZD5afT/hwHtxKCSog5Gn1cv9C9tChL+HfrTYcEmYE USERNAME@HOSTNAME
The key's randomart image is:
+---[RSA 3072]----+
|        ..+      |
|    .  E +       |
|   . . .  .      |
|  . o o . ..     |
| . + . .S*..... .|
|  . . . =o=o+..o.|
|       +oo+*.+...|
|       .+=+.=.+o |
|       .==+=.+o  |
+----[SHA256]-----+


Alguns valores foram alterados pois este é só um exemplo.
Importante deixar explícito que quando foi solicitada uma senha (passphrase) eu digitei uma, só que ela não é exibida na saída do terminal.
É interessante que você também coloque uma senha, fazendo com que o acesso a máquinas que utilizem essa chave precisem de um duplo fator de autenticação: será necessário ter tanto a chave (que é um arquivo) quanto a senha da chave.
Na saída acima, USERNAME é o nome de usuário da sessão atual, e HOSTNAME o nome do host (computador) em que você está executando os comandos. Por padrão as duas chaves serão geradas no diretório /home/USERNAME/.ssh (que será criado caso não exista), e terão os nomes id_rsa e id_rsa.pub, sendo esta última a chave pública.
Idealmente as permissões do diretório ~/.ssh, da chave privada ~/.ssh/id_rsa e da chave pública ~/.ssh/id_rsa devem ser, respectivamente, 700, 600 e 644, ou as representações gráficas drwx------, -rw------- e -rw-r--r--.
Caso queira consultar, as permissões, utilize o comando ls -lah nas pastas /home/USER e /home/USER/.ssh, e utilize a tabela presente nesta seção linkada https://en.wikipedia.org/wiki/File-system_permissions#Numeric_notation como referência.
Se precisar alterar as permissões, utilize o comando chmod.
Guarde as chaves criadas, pois as usaremos mais pra frente na hora de configurar o SSH server na VPS.
