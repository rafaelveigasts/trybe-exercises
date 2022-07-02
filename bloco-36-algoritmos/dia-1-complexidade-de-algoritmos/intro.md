## O que vamos aprender?

"Quão eficiente é esse algoritmo?"
Essa pergunta talvez já tenha passado pela sua cabeça ao olhar para os códigos que desenvolveu. E é natural que seja assim, pois a eficiência de um algoritmo é um dos principais requisitos não funcionais listados em levantamentos de requisitos https://engsoftmoderna.info/cap3.html , tanto por clientes quanto por membros das equipes de desenvolvimento.

Uma pessoa usuária de um site não quer que sua busca por determinada informação demore muito tempo para trazer um retorno. Por exemplo, não é frustrante quando algum programa causa lentidão à nossa máquina em função da quantidade de recursos que consome!? 😠

Entretanto, não é somente em experiência da pessoa usuária que a eficiência de um algoritmo se mostra importante. Há diversos projetos e pesquisas científicas que dependem, por exemplo, do processamento e armazenamento de bases enormes de dados, e que dependem de investimentos financeiros elevados.

Por esse motivo, é fundamental que as pessoas desenvolvedoras sejam capazes de aumentar a eficiência de seus algoritmos, reduzindo custos envolvidos e entregando a resolução de problemas.

### Referências bibliográficas do bloco

Para este bloco, a bibliografia tomada como referência é:

Introduction to Algorithms, 3rd Edition (The MIT Press) por Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein;

Entendendo Algoritmos: Um Guia Ilustrado Para Programadores e Outros Curiosos, 24 abril 2017 por Aditya Y. Bhargava;

The Algorithm Design Manual, 6 novembro 2020 por Steven S. Skiena

### Você será capaz de

Descrever a capacidade de analisar o desempenho de um algoritmo como importante para processos seletivos de Big Techs, como Google, Amazon, Facebook, etc.
Definir o que é algoritmo;
Definir o que é um algoritmo correto;
Compreender a importância da análise de algoritmos;
Definir Ordem de Complexidade, ou Complexidade Assintótica;
Compreender as notações que representam a complexidade de um algoritmo, a saber: O(1), O(n), O(log n), O(n^2), O(n^3) e O(n!);
Definir Complexidade de Tempo e Complexidade de Espaço;
Definir a categoria de problemas NP-Completo;
Combinar funções matemáticas para analisar complexidade de algoritmos;
Definir o melhor, o pior e o caso médio de uma Ordem de Complexidade.

### Por que isso é importante?

Em geral, para funções com um valor de entrada pequeno, não costumamos nos importar com a eficiência do algoritmo.
Entretanto, quando nossa função tiver que lidar com valores de entrada muito grandes, por exemplo: mil valores ao mesmo tempo? Ou quem sabe milhões de valores? Nesses casos, a eficiência do que estamos fazendo tornar-se importante e nós, pessoas desenvolvedoras, precisamos ser capazes de lidar com esses cenários!

⚠️ Aviso: Embora pareça que estamos falando de quantidades irreais, há uma série de exemplos que comprovam que problemas gerados por entradas de dados grandiosas são bastante comuns.

O famoso Discord, por exemplo, já enfrentou a demanda de ordenar alfabeticamente uma lista de amigos com até 250.000 pessoas. E você sabe o tempo máximo que o algoritmo tinha pra rodar? Menos de um segundo e meio! Um desafio e tanto que pôde ser solucionado com o conhecimento sobre Algoritmos.

De olho na dica 👀: Esse conhecimento é tão importante no mundo da tecnologia, que as famosas Big Techs como: Google, Amazon e Facebook, fazem processos seletivos nos quais a capacidade de fazer esse tipo de análise é obrigatória.

Em suma, quando cresce a escala, esse conhecimento se torna essencial. E com esse conhecimento você vai perceber a existência de certos tipos de problemas que ainda não têm solução, mesmo reunindo toda a capacidade computacional do planeta.

⚠️ Aviso: Parece exagero? Mas acredite, não é. Vamos seguir para o conteúdo e isso ficará mais nítido para você. 🙂

### Conteúdos

Você pode estar se perguntando: "Como saber quais algoritmos são mais eficientes para cada caso?” 🤔

Resposta: O conteúdo de hoje tem o objetivo de te conduzir a essa resposta! Vamos aprender uma métrica universal para calcular a eficiência de um algoritmo que é válida para qualquer linguagem e paradigma de programação, e que será a base para avaliarmos a eficiência de nossos algoritmos daqui em diante.

Vamos nessa? 😉
