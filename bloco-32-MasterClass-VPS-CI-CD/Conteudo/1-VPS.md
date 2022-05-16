O que é uma VPS
VPS é um acrônimo para Virtual Private Server (Servidor Privado Virtual). É basicamente um computador que você pode alugar e acessar remotamente (geralmente por um preço bem acessível).


<img src = 'server-db.gif'>



É privado pois o acesso ao sistema é feito somente por quem o alugou, não compartilhando o sistema com outras pessoas: quem aluga é root user. É virtual pois por mais que o sistema (software) não seja compartilhado, o hardware (a máquina física) é.
As VPSs geralmente possuem IPs públicos, o que possibilita expôr uma aplicação em uma determinada porta para que fique acessível para toda a internet. Por este motivo, é normalmente utilizada para a disponibilização de projetos na internet, tais como:
armazenamento de arquivos
bancos de dados
back-ends de jogos
sistemas de e-mail
sites e sistemas web
Estes são só alguns exemplos.
Dando um pouco mais de detalhes, uma VPS é uma máquina virtual rodando em uma infraestrutura gerenciada pela empresa que a oferece. Por ser uma máquina virtual os recursos de hardware são compartilhados entre outros hospedeiros, mas os recursos de software não. Como a infraestrutura é gerenciada pela empresa que a disponibiliza, você escolhe um sistema operacional, manda instalar e recebe um IP e as credenciais de conexão. A partir daí, é contigo!
Uma ótima forma de compreender melhor o que é uma VPS é comparando-a com algumas outras soluções para aluguel de computadores e disponibilização de projetos na internet.

## VPS vs PaaS vs Hospedagem vs Servidor dedicado vs Infraestrutura própria

### VPS vs Infraestrutura própria

Imagina só ter que escolher as peças, montar os computadores, colocá-los numa sala refrigerada, com segurança, restrição de acesso, proteção contra desastres naturais, fazer os cabeamentos de energia e internet, bem como os sistemas de redundância e tolerância a quedas de energia, fazer a checagem das peças e a substituição das defeituosas, etc.

Muita coisa né? E você só queria colocar um sisteminha web no ar.
É isso que é gerenciar uma infraestrutura própria.
Por outro lado, quando você aluga uma VPS é responsabilidade da empresa de locação cuidar de tudo isso. Você só precisa se preocupar em administrar as coisas no nível de sistema operacional para cima.
Além disso, por mais que ter sua própria infraestrutura possa vir a custar menos ou dar uma certa flexibilidade, as necessidades de empresas que precisam disso costumam ser bem específicas. Não só isso, a VPS costuma ser mais barata a priori, visto que existem máquinas a partir de uns 20 reais por mês ao passo que contratar um computador inteiro, mesmo usado e antigo, custa a partir de centenas de reais para adquirir.

## VPS vs PaaS
Se uma pessoa desenvolvedora quer colocar um site ou sistema web no ar, as chances são grandes de que ela pense em usar um Platform as a Service (PaaS, plataforma como serviço), como por exemplo o Heroku. Um PaaS fornece à pessoa desenvolvedora toda a plataforma que ela precisa para rodar seu software. Tudo que a pessoa tem que prover é o software em si. Ao utilizar um PaaS você não precisa se preocupar com sistema operacional utilizado pelas máquinas, configuração desse sistema, controle de acesso, etc. Basta você dizer algo do tipo "roda esse meu código aqui" e magia, seu sistema está de pé. Por mais que o PaaS seja bem simples, existem alguns pontos negativos do PaaS ao compararmos com uma VPS:
Como o gerenciamento do sistema é completamente delegado, o preço do serviço costuma ser mais alto

Existe uma falta de flexibilidade no que diz respeito à plataforma: se você precisar subir um banco de dados específico, ou um projeto em uma linguagem específica, pode ser que seu provedor de PaaS não tenha suporte para eles.
Há uma dependência da plataforma: é mais difícil mudar de um provedor de PaaS para outro, visto que cada provedor pode oferecer plataformas com recursos e limitações diferentes.
Se por um lado é uma desvantagem ter que administrar todo o sistema, por outro é uma vantagem poder configurá-lo para melhor se adequar a aplicação. Em alguns casos onde a aplicação utiliza tecnologias específicas, possui necessidades específicas de ambiente de execução ou similares, utilizar VPS (ou outros sistemas que permitam administrar o sistema operacional) é estritamente necessário. Além de tudo isso, após configurá-la, a VPS tende a ficar estável e custar menos no longo prazo, principalmente para projetos que não dão retorno financeiro (como por exemplo para experimentações, portfolio e etc), ou para projetos internos de empresas.


## VPS vs Hospedagem
Existem diversos provedores de serviços que oferecem hospedagem de sites, inclusive muitos dos provedores também fornecem VPSs. A diferença principal entre estes serviços de hospedagem de sites e as VPSs é que hospedagem de sites costuma ser em um servidor compartilhado com outras pessoas/outros projetos, bem como possuem limitações de linguagens e tecnologias. Hospedagem compartilhada é muito boa quando se quer colocar um site simples no ar, quando a quantidade de acessos for baixa e as tecnologias utilizadas forem mais comuns (por exemplo um site estático com somente HTML, CSS e JavaScript), mas não são muito boas para hospedar, por exemplo, um sistema web com um back-end completo.
A vantagem da hospedagem é que ela é mais simples de configurar e costuma ser um pouco mais barata. Já como desvantagens, principalmente para web developers experientes, é a falta de flexibilidade para rodar aplicações mais complexas e específicas, a impossibilidade de escalar o desempenho conforme a quantidade de acessos cresce e a lista limitada de tecnologias que podem ser utilizadas.


## VPS vs Servidor dedicado
A diferença entre estes é a mais simples: um servidor dedicado é tipo uma VPS, só que o servidor inteiro fica disponível para você utilizar. Geralmente é o mesmo que uma VPS mais cara, visto que você tem uma máquina específica onde vai ter só coisa sua. Os servidores dedicados costumam ser bem mais caros que VPSs de entrada (chegando a alguns milhares de reais por mês), mas o modo de uso é quase o mesmo. Um bom uso de servidores dedicados pode ser quando alguma regulamentação exija que os dados não fiquem em discos compartilhados, ou quando toda a performance do servidor é necessária para uma aplicação exclusiva que não responde bem a escalonamento horizontal, somente vertical.

## VPS vs Servidor dedicado
A diferença entre estes é a mais simples: um servidor dedicado é tipo uma VPS, só que o servidor inteiro fica disponível para você utilizar. Geralmente é o mesmo que uma VPS mais cara, visto que você tem uma máquina específica onde vai ter só coisa sua. Os servidores dedicados costumam ser bem mais caros que VPSs de entrada (chegando a alguns milhares de reais por mês), mas o modo de uso é quase o mesmo. Um bom uso de servidores dedicados pode ser quando alguma regulamentação exija que os dados não fiquem em discos compartilhados, ou quando toda a performance do servidor é necessária para uma aplicação exclusiva que não responde bem a escalonamento horizontal, somente vertical.

## Por que usar uma VPS
Uma VPS é uma ótima escolha de uso quando:
Você precisa de uma máquina barata
Você precisa/quer configurar o sistema
Você pretende disponibilizar mais de uma aplicação em um único sistema
