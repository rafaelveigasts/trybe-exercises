## Desinstalando o MongoDB

Caso sua instalação tenha retornado algum problema, siga os passos abaixo para desinstalar e tente realizar a instalação novamente.

### Preste muita atenção aos comandos ###
Pare sua instância do mongodb:

*sudo service mongod stop*

Primeiro, remova todos os pacotes instalados:

*sudo apt-get purge mongodb-org*

Agora, remova os arquivos de dependências que não são mais necessários. Em seguida, remova as versões antigas dos arquivos de pacotes.

*sudo apt-get autoremove*

*sudo apt-get autoclean*

Após isso, remova os arquivos do mongodb que podem ter ficado para trás.

*sudo rm -rf /var/log/mongodb*

*sudo rm -rf /var/lib/mongodb*

Se a desinstalação for concluída com sucesso, o comando mongod --version não deve retornar a versão do seu mongodb.

### Informação importante

Por padrão, o MongoDB só permite conexões locais. Ou seja, apenas de clients que estejam rodando na mesma máquina onde a instância estiver sendo executada. Para alterar essa configuração e permitir conexões remotas, veja sobre IP Binding https://docs.mongodb.com/manual/core/security-mongodb-configuration/ na documentação.
