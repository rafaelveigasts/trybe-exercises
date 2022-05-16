## Configurando a VPS
O primeiro passo na configuração da VPS é a atualização do sistema, visto que muitas vezes são utilizadas imagens antigas e desatualizadas. Para isso, faça login no sistema (pode ser no usuário root por meio de login e senha mesmo) com o comando ssh user@ip e rode os seguintes comandos:

apt update -y && apt upgrade -y && reboot

Como o usuário é o root o comando sudo não é necessário.
Ao final de uma atualização com sucesso o sistema será reiniciado e seu terminal perderá o acesso. É importante salientar que algum prompt pedindo alguma ação sua pode ocorrer durante a atualização, então fique de olho na tela do terminal (ou olhe de tempos em tempos). Você pode tentar logar em 4 ou 5 minutos após a perda do acesso: é o temo da máquina reiniciar (se demorar demais contate seu provedor), e checar se está tudo certinho. Se o reboot não acontecer, algo deu errado durante a atualização. Dê uma investigada.
Configurando users
Faça um novo login no sistema (ainda pode continuar utilizando o root e a senha). Chegou a hora de criar um novo user, vamos chamar de tryber:

adduser tryber

A saída deverá ser algo como:

Adding user `tryber' ...
Adding new group `tryber' (1000) ...
Adding new user `tryber' (1000) with group `tryber' ...
Creating home directory `/home/tryber' ...
Copying files from `/etc/skel' ...
New password: 
Retype new password:
passwd: password updated successfully
Changing the user information for tryber
Enter the new value, or press ENTER for the default
        Full Name []: Tryber
        Room Number []:
        Work Phone []:
        Home Phone []:
        Other []:
Is the information correct? [Y/n] 

É interessante criar uma senha para tryber, e é muito bom que essa senha seja diferente da senha de root

É necessário confirmar cada dado apertando 'enter'. Caso não queira preenchê-los pode deixá-los em branco e confirmar com 'enter'. Em seguida, devemos adicionar o recém criado user ao grupo de sudoers:

usermod -aG sudo tryber
E em seguida, por segurança, vamos desabilitar o usuário root:

# troca do user root para o user tryber
su tryber
# direciona o shell do root para algo inexistente
# fazendo com que não seja possível logar com o root
sudo usermod -s /usr/sbin/nologin root
# se precisar desfazer, utilize o comando abaixo, sem o símbolo de comentário (#)
# sudo usermod -s /bin/bash root

Com isso ninguém vai conseguir fazer login como root tão facilmente, o que adiciona uma camada de segurança.

A partir de agora vamos utilizar somente o user tryber, visto que além de invasores não conseguirem logar como root, você também não conseguirá. Isso é muito bom pois sempre que você precisar utilizar um comando que precise de poderes de superuser, será necessário adicionar o comando sudo na frente. Isso deixa explícito que o comando que você vai digitar vai ter todas as permissões que um superuser tem, podendo danificar o sistema, bem como evita que você faça coisas que não deveria sem querer quando esquecer de digitar o sudo.

## Configurando SSH server
A próxima etapa é configurar o servidor SSH da VPS. Abra uma nova instância do terminal na máquina local (não feche a que já está conectada na VPS pois isso causará a perda definitiva de acesso à VPS) e vamos  a chave pública por meio do utilitário ssh-copy-id:

ssh-copy-id -i ~/.ssh/id_rsa.pub tryber@191.252.218.185 # Essa é a linha do comando
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/USERNAME/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to 
install the new keys
tryber@191.252.218.185's password: # DIGITE A SENHA AQUI

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'tryber@191.252.218.185'"
and check to make sure that only the key(s) you wanted were added.
Com isso sua chave pública local (id_rsa.pub) foi copiada para o arquivo ~/.ssh/authorized_keys do user tryber na VPS.

Agora vamos ajustar o SSH Server para que ele só aceite conexões utilizando a chave, não mais aceitando senha. Para isso você precisará utilizar um editor de texto via linha de comando. Pode ser o Vim, o nano ou qualquer outro que você prefira (dá até pra acoplar o VS Code em uma VPS). Aqui usarei o Vim, portanto se atente a ajustar os comandos caso utilize outro editor de texto.
Abra o arquivo de configurações do SSH Server:

sudo vim /etc/ssh/sshd_config
Vamos editar algumas linhas (para entrar no modo de inserção/edição do Vim é só apertar a letra i):

A primeira linha interessante de alterar é a que contém a porta do SSH
Substitua a linha que contém #Port 22 por Port X, onde X é o número da porta
Repare que o #, que representa um comentário, portanto vamos remover

Como a porta padrão do protocolo SSH é a 22, muitos hackers tentam invadir seu servidor tentando conexões com senhas aleatórias nessa porta, portanto convém mudar para outra porta (pode ser qualquer uma, desde que não seja utilizada por outro protocolo e que você a libere no firewall)

A título de exemplo, utilizarei a porta 77
A segunda linha a se alterar é a que permite login como superuser (root)
Observe que não permitir login como root via SSH é diferente do que fizemos ao desabilitar o shell do root após criarmos o user tryber
Substitua a linha que contém PermitRootLogin yes por PermitRootLogin no
A última linha a se alterar é a que permite login com senha
Como já possuímos um par de chaves, não vamos aceitar senhas na VPS, já que elas podem ser adivinhadas via métodos de força bruta e podem vazar com maior facilidade
Substitua a linha que contém PasswordAuthentication yes por PasswordAuthentication no
Salve as alterações (no Vim você deve apertar a sequência de teclas ESC : w q ENTER). Em seguida vamos aplicar as alterações ao server:

sudo systemctl reload sshd.service

⚠ Cuidado! Neste momento você modificou o servidor SSH. Não saia da VPS no terminal atual, ou você pode ficar trancado fora do servidor, perdendo tudo e tendo que formatar/reinstalar o servidor. Abra uma nova guia de terminal para testar se as novas configurações funcionam e se não funcionarem utilize a guia já logada para tentar consertar. ⚠

Vamos testar em uma nova guia de terminal na máquina local as novas configurações:

ssh -p 77 tryber@191.252.218.185

O parâmetro -p é a porta que será usada. Se você não mudou a porta do padrão (22) esse parâmetro é desnecessário. Se você mudou a porta para alguma outra que não a 77, coloque a porta que você usou. Se seu par de chaves não é o padrão (~/.ssh/id_rsa), você deve utilizar o parâmetro -i e passar para ele o caminho da sua chave privada, por exemplo ssh -p 77 -i path/to/private_key tryber@191.252.218.185. Se sua chave privada não tem senha, você vai logar automaticamente. Se ela tiver senha, digite a senha (não do user root ou do user tryber da VPS, mas da chave privada que você criou mais cedo). Se o login não ocorrer com sucesso, confira se você alterou corretamente o arquivo /etc/ssh/sshd_config na VPS, utilizando a guia de terminal que você deixou logada.

Melhorando a configuração do SSH Client

Agora que o SSH Server terminou de ser configurado, vamos criar um pequeno arquivo na máquina local que vai nos permitir acessar a VPS mais facilmente. Até o momento você tem que digitar o comando ssh -p PORTA -i CAMINHO/DA/CHAVE_PRIVADA USER@IP, sendo que o IP é geralmente difícil de lembrar. Vamos resolver isso criando o arquivo ~/.ssh/config e colocar o seguinte conteúdo:

h
Host vps
  HostName 191.252.218.185
  User tryber
  Port 77
  IdentityFile /home/USERNAME/.ssh/id_rsa

Na primeira linha, logo após a palavra Host vem o nome do acesso que você quer criar. Aqui deixei como vps, mas como você pode ter vários hosts definidos neste arquivo, pode ser algo do tipo maquina1 ou meuPcRemoto. Quanto menor o nome, mais fácil fica para digitar.

A partir da segunda linha temos uma tabulação, que indica que estamos criando configurações específicas para o Host vps. Se quiser criar mais hosts, se atente à tabulação!

A segunda linha contém o HostName, que nada mais é do que o nome do computador que queremos acessar. Como esse computador não possui um nome na rede local, colocamos o endereço IP. 
Lembre-se de ajustar para o endereço IP da sua VPS.

Na terceira linha temos o username que será utilizado no computador remoto (ou seja, na VPS). No nosso exemplo aqui estamos utilizando o user tryber.

Na quarta linha temos a porta que será utilizada para o acesso. Como mudamos na configuração do server para a 77, é esta que vamos colocar aqui. Caso você tenha deixado na porta padrão (22), essa linha pode ser omitida.

Por último temos o IdentityFile, que nada mais é do que o caminho para a nossa chave privada. Aqui estou assumindo que você está utilizando uma chave recém criada na pasta .ssh, dentro da home de seu user local. Ajuste essa linha para apontar para o arquivo correto!

Com essa configuração pronta, você deverá conseguir acessar a vps simplesmente digitando o comando ssh NOME_DO_HOST, o que é muito prático. No nosso exemplo é só digitar ssh vps (e em seguida digitar a senha da chave privada, caso você tenha colocado senha nela) e o login estará concluído.

## Configurando o firewall

O firewall garante que o servidor só permitirá acessos de rede sob determinadas condições. Podemos utilizar o firewall para limitar o acesso a portas específicas, a IPs específicos (lembre-se que o IP que recebemos dos provedores de Internet, na imensa maioria dos casos, é dinâmico e mudará constantemente), fluxos somente de entrada ou somente de saída, dentre algumas outras opções.

Vamos realizar uma configuração simplificada de firewall. Existem diversos firewalls no mercado, mas vamos utilizar um bem simples apenas para demonstração: o UFW (Uncomplicated Firewall, ou Firewall descomplicado). Apesar de simples, ele pode ser utilizado em produção, desde que configurado corretamente. Verifique se ele está instalado com o comando sudo ufw status, e se não estiver instalado utilize o comando sudo apt install ufw -y para instalá-lo.

Precisamos:
Habilitar o firewall
Habilitar por padrão todo o tráfego de saída
Desabilitar por parão todo o tráfego de entrada
Habilitar tráfego de entrada na porta do SSH
⚠ Cuidado! Antes de fazer logout da VPS, habilite a entrada na porta do ssh teste o login em outro terminal para não se trancar fora do servidor.

sudo ufw enable # Habilita o firewall

sudo ufw default allow outgoing # Habilita por padrão o tráfego de saída da VPS em qualquer porta
sudo ufw default deny incoming # Desabilita por padrão o tráfego de entrada da VPS em todas as portas
sudo ufw allow 77 # Habilita porta do SSH (tanto saída quanto entrada)
# O comando acima é
# sudo ufw allow PORTA_CONFIGURADA_PARA_O_SSH
# ou
# sudo ufw allow ssh
sudo ufw status # Verifique se a regra que abre a porta do SSH está aparecendo
Após isso só deve ser possível acessar a VPS via SSH.
