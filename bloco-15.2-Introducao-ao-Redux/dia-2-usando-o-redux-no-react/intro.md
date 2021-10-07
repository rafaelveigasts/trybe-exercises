O que vamos aprender?
Você vai aprender a utilizar o Redux em suas aplicações React .

Você será capaz de:
Criar um store Redux em aplicações React
Criar reducers no Redux em aplicações React
Criar actions no Redux em aplicações React
Criar dispatchers no Redux em aplicações React
Conectar Redux aos componentes React


Por que isso é importante?

Redux é uma ferramenta para gerenciar o estado de uma aplicação JavaScript . Antes de entender o porquê de utilizar React com Redux , deve-se entender o porquê de utilizarmos uma biblioteca externa para controlar e gerenciar o estado de uma aplicação.

A maioria das bibliotecas, como React , Angular etc, possuem uma forma interna de gerenciar o estado da aplicação sem o auxílio ou necessidade de uma ferramenta externa. Isto funciona bem para aplicações que possuem poucos componentes mas, à medida que a aplicação cresce, o gerenciamento de estados compartilhados entre componentes torna-se uma tarefa complicada e desgastante.

Em uma aplicação em que muitos dados são compartilhados entre componentes, pode não ficar muito nítido onde cada dado deve ficar. Além disso, algumas vezes pode-se criar uma implementação que não é ideal. Por exemplo: em uma aplicação onde é necessário compartilhar os dados com vários componentes filhos, necessariamente esse dado deve ficar no componente pai. Aplicações maiores também apresentam a necessidade de compartilhar dados entre componentes que não estão na mesma árvore de componentes. Para esse compartilhamento ser feito, esse dado terá de passar através de muitos componentes até chegar em seu componente alvo.

Com todos estes exemplos, fica nítido que o gerenciamento de estado torna-se confuso à medida que a aplicação cresce. Por isso, utilizar uma ferramenta externa para gerenciar o estado, como o Redux , facilitará o desenvolvimento e crescimento das aplicações.

Conteúdos
Antes de começar o dia
Hoje é um dia muito importante para sua trilha de desenvolvimento web full-stack e você precisa se empenhar para absorver cada trecho do conteúdo do dia, portanto, antes de prosseguir com o conteúdo:

1 - Acesse a URL: Eu sou um repositório legal de exercícios react-redux .
Faça um fork do repositório para o seu repositório GitHub. https://github.com/tryber/exercises-redux-step-by-step

2 - Clique no botão "Fork" do repositório.
3 - Selecione seu usuário do GitHub.
4 - Escolha a URL remota (SSH, HTTPS) para fazer o clone do repositório.
5 - Agora é só dar um git clone na sua máquina e começar a codar.

