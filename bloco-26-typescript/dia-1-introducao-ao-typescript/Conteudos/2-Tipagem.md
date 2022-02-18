## Tipagem (dicas de tipo)

O grande recurso do TypeScript é o sistema de tipos. Em TypeScript podemos identificar o tipo de dado em variáveis, parâmetros ou retornos de funções utilizando a tipagem .

Tipagem , também conhecida como dicas de tipos , é a forma que utilizamos para descrever de qual tipo será o valor de um componente do nosso código, ex: variáveis, expressões, funções ou módulos. Isso proporciona uma melhor documentação do código e permite que o TypeScript valide se ele está funcionando da maneira correta.

Antes de avançarmos para como o TypeScript faz isso, vamos falar um pouco mais sobre tipagem em linguagens de programação.

Podemos categorizar a tipagem em uma linguagem de programação como:

### **Tipagem Estática:**

Não permite a pessoa desenvolvedora alterar o tipo após declarado e geralmente a verificação de tipo é feita em tempo de compilação.

A tipagem utilizada na linguagem TypeScript tem essa característica e vamos aprender sobre o seu compilador mais à frente.

### **Tipagem Dinâmica:**

Está ligada à habilidade da linguagem de programação em “escolher o tipo de dado” de acordo com o valor atribuído à variável em tempo de execução dinamicamente.

### **Tipagem Forte:**

Linguagens fortemente tipadas não realizam conversões automaticamente, ou seja, não é possível realizar operações entre valores de diferentes tipos sendo necessário que a pessoa desenvolvedora faça a conversão para um dos tipos caso seja possível.

A tipagem utilizada na linguagem TypeScript também possui essa característica.

### **Tipagem Fraca:**

A tipagem fraca está ligada a característica da linguagem de realizar conversões automaticamente entre tipos diferentes de dados, ou seja, operações entre valores de tipos diferentes podem acontecer sem a necessidade de uma conversão explícita de tipo. Porém, o resultado pode não ser o esperado e erros podem ocorrer durante a execução.

### **Inferência de tipo:**

Algumas linguagens com tipagem estática podem fazer a inferência de tipo na declaração de variáveis, mas não permite que o tipo seja alterado após a declaração.

O TypeScript é uma dessas linguagens. Podemos usar a inferência de tipo, mas o compilador apresenta um erro quando tentamos atribuir um valor de tipo diferente à variável. Isso porque ele apenas realiza a inferência do tipo inicial da variável, depois disso como a linguagem possui tipagem estática, não permite alterar o tipo.

Então TypeScript é uma linguagem fortemente tipada e estaticamente tipada que possui inferência de tipo . Veremos exemplos disso quando começarmos a escrever nossas primeiras linhas de código nas sessões a frente.

Mas antes disso vamos falar sobre Traspiladores e Compiladores e o TSC , que é o compilador do TypeScript .
