## Mãos à obra, vamos executar!

1. Iniciando o MongoDB
No Linux:

*sudo service mongod start*

No MacOS:

*brew services start mongodb-community*

2. Verifique se o MongoDB foi iniciado com sucesso
No Linux:

*sudo service mongod status*

No MacOS:

*brew services list | grep mongodb-community*

Você também pode checar o arquivo de log que, por padrão, é localizado em /var/log/mongodb/mongod.log , no Linux. Ou em /usr/local/var/log/mongodb , no Mac. Você pode verificar se a instância está rodando e pronta para conexões através da linha abaixo:

[initanlisten] waiting for connections on port 27017**
Parando a instância

No Linux:

*sudo service mongod stop*

No MacOS:

*brew services stop mongodb-community*

Reiniciando a instância

No Linux:

*sudo service mongod restart*

No MacOS:

*brew services restart mongodb-community*

### Configurando a inicialização do servidor do MongoDB

Por padrão, após a instalação, seu servidor vai estar configurado para não iniciar junto ao sistema. Caso queira ativar o início automático quando ligar o computador, utilize o comando:

*sudo systemctl enable mongod.service*

Caso não queira mais que isso aconteça (para poupar memória RAM, por exemplo), você pode desativar o início automático utilizando o comando:

*sudo systemctl disable mongod.service*

Na primeira vez que for utilizar o MongoDB após ligar o computador, será necessário iniciar o servidor com o comando:

*sudo service mongod start*
