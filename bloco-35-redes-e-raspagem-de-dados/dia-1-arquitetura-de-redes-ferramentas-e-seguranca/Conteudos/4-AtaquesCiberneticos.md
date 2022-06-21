## Ataques cibernéticos

### DoS / DDoS

Imagine que temos uma aplicação publicada e nela estamos utilizando as melhores práticas de desenvolvimento, com um certificado e o protocolo HTTPS. Nosso site está hospedado em um servidor, um computador com memória, processador, disco. Esses recursos, como sabemos, são limitados, como qualquer máquina. Nossa aplicação, porém, recebe relativamente poucos acessos por dia e esses recursos são suficientes para ela funcionar normalmente.
Entretanto, nossa aplicação está publicada na internet, exposta ao mundo inteiro. Então imagine que uma pessoa mal intencionada resolveu "bombardear" nossa aplicação com diversos acessos simultâneos. Esse ataque pode ser feito de diversas formas e é chamado de DDoS (Distributed Denial of Service) ou ataque distribuído de negação de serviço, tendo como objetivo tirar o serviço do ar, tornando-o temporariamente indisponível.

Um exemplo desse ataque foi o sofrido pelo github em 2018, considerado um dos maiores já registrados. Para se ter uma ideia, foram 1,35 terabit recebidos por segundo de tráfego, porém devido à infraestrutura, o serviço só ficou fora do ar por cerca de 10 minutos e depois sofreu algumas instabilidades ao longo do dia.

O gif abaixo exemplifica como um ataque desses acontecem, utilizando diversas máquinas para enviar tráfego para alguns servidores:

<img src ='x300Ym.gif' />

Precisamos ter atenção contra esse tipo de ataque. Provavelmente não teremos que lidar com ataques de terabits, porém aplicações menores utilizam máquinas menores. Assim sendo, nesses cenários há menos capacidade para enfrentar esse tipo de ataque, tendo a possibilidade de ficarem indisponíveis com ataques de escala bem menores do que este que estamos utilizando de exemplo.

### Brute Force

Um outro ataque ao qual podemos estar vulneráveis é o conhecido como "brute force" (ou ataque de "força bruta"), no qual indivíduos, robôs ou scripts maliciosos tentam diversas combinações de usuário e senha, com o objetivo de encontrar as combinações corretas e acessar indevidamente um sistema. Existem diversos métodos de tornar esse ataque mais efetivo, como o uso de listas de palavras com senhas e usuários comuns, tal como usuário "admin" e senha "123456" (por incrível que pareça as pessoas utilizam esse tipo de senha fraca até hoje).

Para mitigar essas vulnerabilidades devemos utilizarmos senhas fortes e outros métodos de segurança pessoais com os nossos logins, como o uso de segundo fator de autenticação e outros cuidados com as senhas. Também podemos configurar camadas de proteção extra em nossos servidores.

Agora que já entendemos um pouco dos riscos e a importância da nossa atenção para isso, vamos ver como podemos proteger nossa aplicação contra esses ataques. É aqui que entram os firewalls! 🔥
