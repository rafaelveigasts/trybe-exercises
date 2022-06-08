## O que vamos aprender?
Abordaremos técnicas que contribuirão com a construção de códigos limpos e que necessitem de menos manutenção. Vamos definir um padrão de projeto, estratégia tradicional e difundida de soluções para problemas que aparecem com frequência.
O objetivo aqui é fazer com que você desenvolva códigos para facilitar sua manutenção e seu uso por parte de outras pessoas desenvolvedoras.

## Você será capaz de
Definir o que são os padrões de projetos;
Utilizar o padrão iterator;
Utilizar o padrão adapter;
Utilizar o padrão strategy.

## Por que isso é importante?
Escrever códigos que resolvem problemas é tranquilo. Complexo mesmo é fazer a manutenção de um código já escrito. E caso você ainda não saiba, dar a manutenção de códigos não elaborados por nós faz parte do cotidiano das pessoas desenvolvedoras.

Todo software, desde seu desenvolvimento até o fim de sua vida útil, precisa de manutenção. Os motivos são vários: atualizações de funcionalidade, adaptação às mudanças em plataformas ou bibliotecas, descoberta de bugs ou falhas de segurança...

Para assegurar que o software seja legível e alterável, utilizam-se padrões, que funcionam como as regras de um código. Esses padrões tanto buscam evitar erros comuns quanto propõem um alinhamento de expectativa do que será encontrado no código.

Para ilustrar a importância dos padrões, pensemos em um projeto web que possui um portal onde os usuários podem navegar, ler o conteúdo e postar comentários. Se eu lhe disser que você precisa acessar o código-fonte desse portal, o que você imagina encontrar nele? Imagine agora que tudo esteja em um só arquivo, sem nenhuma classe definida, com mais de 8 mil linhas... Bate um desespero em trabalhar nesse código, não? 😫

Código com mais e 8 mil linhas

Spoiler, resolveremos isso ainda hoje

Para melhorar nossa vida, um caminho indicado é aplicar alguns padrões. Quem sabe organizar arquivos HTML e JS na camada de View, e arquivos de rotas e controllers para responder às requisições web? Ou também arquivos de Model/Classes de Objetos para representar as entidades do banco, arquivos para a comunicação com o banco de dados, arquivos de testes, etc... Com padrões como esses, as pessoas que trabalham com o código entenderão como o projeto foi construído — e o que fazer para resolver os problemas que podem aparecer.

Padrão de Projetos MVC
Padrão de Arquitetura MVC

A esta altura do seu desenvolvimento, você já deve ter utilizado um framework e percebido que rapidamente foram criadas com devida qualidade conexões, páginas e formulários. Possivelmente você não precisou ter contato com o código interno do framework, pois sua complexidade interna é abstraída. Muito disso se deve ao fato de a comunidade ter se reunido para padronizar muitos códigos, levando um Framework com arquitetura MVC, por exemplo, a reunir internamente vários padrões de projeto: Observer, Composite, Strategy, Factory Method, Decorator.

Uma das grandes vantagens dos frameworks é o fato de já implementarem o trabalho denso, permitindo que foquemos em como utilizá-lo. Mesmo nesse cenário, não podemos deixar o código que iremos inserir desorganizado.

Identificar e decidir a melhor forma de implementar uma solução é um dos papéis de uma pessoa desenvolvedora. Afinal, com a evolução de seu código, é desejável que ele se mantenha limpo, fácil de dar manutenção e legível para que outras pessoas desenvolvedoras venham a contribuir, entregando valor para as pessoas que o utilizarem.

