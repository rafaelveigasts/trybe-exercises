## Instalando MySQL Server
Agora vamos instalar as ferramentas que você usará neste curso: o MySQL Server e o MySQL Workbench .
Linux

Observação: Em função das diversas distribuições do Linux, é recomendado pesquisar as instruções de instalação específicas para sua distribuição. Exemplo: "Install MySQL Workbench on {Nome da sua distribuição}". Nosso curso dá preferência para utilização das últimas versões LTS (Long-term Support, Suporte de longo prazo) do Ubuntu (Assim como das variantes descritas no manual da pessoa estudante) ainda suportadas. Verifique o suporte do seu S.O. na pagina oficial .

Digite sudo apt update na linha de comando:

sudo apt update

Digite sudo apt install mysql-server e aperte enter, logo em seguida aceite a instalação digitando y e tecle enter.

sudo apt install mysql-server

Cadastrando uma senha no mySql:

sudo mysql_secure_installation

digite y para continuar

