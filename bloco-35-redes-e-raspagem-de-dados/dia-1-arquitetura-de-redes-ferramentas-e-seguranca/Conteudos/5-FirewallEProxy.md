## Firewall e Proxy

### O que são firewalls?

Firewall, em uma tradução mais livre, significa muro de fogo, ou porta corta fogo, que são aquelas portas "de escada", utilizadas para evitar a passagem de fogo em caso de incêndios. De maneira semelhante, os firewalls são responsáveis por impedir ou permitir a passagem de determinados tráfegos em uma rede, seja de entrada ou saída.

### Iptables e Netfilter

Na maioria dos sistemas operacionais existem subsistemas de filtragem de pacotes e ferramentas para gerenciamento de firewall. O sistema padrão para filtragem de pacotes do linux é o Netfilter http://netfilter.org/ . Existe uma ferramenta utilizada para configurar o Netfilter chamada Iptables, que opera nas camadas 2 e 3 do modelo OSI. O Iptables é, então, o firewall padrão do linux e está presente na maioria das distros.

### Como funciona o Iptables?

Ele compara o tráfego de rede que recebe ou envia com um conjunto de regras preestabelecidas. Essas regras definem as características que um pacote deve possuir e a ação que deve ser tomada para esse tipo de pacote. Podemos criar regras por protocolo, porta de origem/destino, endereço IP, entre outros. Quando ocorre a correspondência de um pacote a uma característica estabelecida em uma regra é então tomada a ação, que pode ser, por exemplo, se aquele pacote será aceito, rejeitado ou registrado em um arquivo de log.

Como diz o próprio nome, a arquitetura do Iptables é formada por "tabelas". Essas tabelas também são conhecidas como cadeias e cada uma possui tipos de regras específicas. Por exemplo, a cadeia "filter", que possui todas as políticas (regras) responsáveis por controlar o tráfego que entra ou sai do computador.

### Fail2ban

O fail2ban é um IPS (Intrusion Prevention System - Sistema de Prevenção de intrusos). Essa ferramenta monitora os logs da rede e cria regras no iptables ao detectar comportamento suspeito, como diversas requisições de um mesmo IP ou diversas tentativas de login SSH, de modo a rejeitar aquele endereço de IP específico por determinado tempo.

### Proxy

Outro componente que pode fornecer mais uma camada de segurança quando falamos de redes é o proxy. O proxy provém uma camada a mais de controle entre a internet e os dispositivos da rede, e pode ser utilizado para diversos fins.

Um uso comum dos proxies é como uma espécie de filtro, que através de características de uma conexão ou tráfego consegue determinar se esse tráfego deve ser feito ou não. Por exemplo, para evitar acessos a redes sociais em escritórios o proxy pode ser utilizado para reconhecer palavras-chave em URLs e então recusá-las. Além disso, eles podem impedir que pessoas usuárias acessem sites com conteúdos impróprios ou com potencial de ser uma página maliciosa.
