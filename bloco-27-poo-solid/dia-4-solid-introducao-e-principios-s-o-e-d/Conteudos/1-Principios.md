## Os princípios SOLID

A palavra SOLID (sólido) no contexto de programação, é um acrônimo para cinco princípios e que de fato, se aplicados de maneira conjunta e inteligente, geram solidez e durabilidade para sua arquitetura como um todo.

É importante ressaltar, no entanto, que o conceito de SOLID como propostos no artigo científico escrito por Robert C. Martin https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf , ao pé da letra pode gerar alguma confusão. Por isso estamos aqui para deixar tudo mais simples de se entender.

Dito isso, nas definições originais, SOLID significa o seguinte:

S ingle responsibility principle ( Princípio da responsabilidade única ): uma entidade (classe, método, função, etc) deve ter apenas uma única responsabilidade;

O pen/Closed principle ( Princípio aberto/fechado ): entidades de software devem ser abertas para extensão, mas fechadas para modificação;

L iskov substitution principle ( Princípio de substituição de Liskov ): objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa; (Ah, não se assuste com esse nome, ele faz apenas uma referência à autora do paper que o descreveu pela primeira vez em 1994, Barbara Liskov)

I nterface segregation principle ( Princípio da segregação da interface ): muitas interfaces de clientes específicas são melhores do que uma para todos os propósitos;

D ependency inversion principle ( Princípio da inversão da dependência ): entidades de alto nível não devem depender de entidades de baixo nível. Ambos devem depender de abstrações.

Uma palavra bastante importante e que deve ser ressaltada é a "Princípio" , ou seja, são boas práticas.

Isso quer dizer que nada do que está aqui deve ser considerado como obrigatório ou proibido , mas sim como recomendado ou não recomendado .

Existem situações em que pode fazer sentido ignorar um desses princípios. Por isso, não seja radical. Sempre reflita sobre o porquê de estar usando/fazendo algo.

Nunca se esqueça: ao escrever um código, o objetivo é torná-lo fácil de ser entendido e fácil de ser mantido .

Regra nenhuma, princípio nenhum e caso especial nenhum deve piorar a legibilidade ou a manutenibilidade do seu código.

Dito isso, princípios como o SOLID e regras como as do ESLint geralmente vêm para o bem. Escrever código realmente bom pode não ser intuitivo! Seguir as regras, e confiar nelas, nos coloca num caminho que, quando concluído, vai nos dar um bom código!

O objetivo da aula de hoje é entender como isso acontece e por quê.
Não se preocupe se não tiver entendido os princípios ainda.

A seguir vamos nos aprofundar com mais detalhes em cada um deles.

Hoje você irá aprender melhor sobre os princípios S , O e D , enquanto que os princípios L e I serão abordados amanhã!

Vamos lá aprender a escrever código bonito, legível e fácil de ser mantido 😎.
