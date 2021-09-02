State vs Props

Você pode entender a diferença props vs state da seguinte forma:
props são uma forma de passar dados de pai para filho.
state é reservado para dados que seu componente controla.
O conceito é: state , ou estado do componente, deve servir para guardar valores do Componente que mudam com o uso do mesmo. As props são valores fixos que um componente recebe e não altera.
Pelos princípios do React você nunca deve tentar alterar o que um componente recebe como props como no exemplo abaixo:

this.props.name = 'novo nome';