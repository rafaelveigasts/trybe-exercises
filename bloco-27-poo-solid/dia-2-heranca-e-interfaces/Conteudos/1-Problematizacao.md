## Problematização

Você precisa, de forma eficiente, criar entidades que representem pessoas físicas e pessoas jurídicas, compartilhando alguns elementos em comum, tais como nome e data de nascimento, mas com alguns elementos específicos de cada uma delas, como cpf e cnpj.

Além disso, você precisa criar uma interface para contratos, que devem possuir cláusulas e devem poder ser assinados por pessoas diversas.

Existem inúmeras formas de se fazer isso, mas com o conteúdo de hoje você perceberá como será bem mais fácil.

Cronometre ⏲️ dois minutos para pensar como você faria isso com seu conhecimento atual e siga adiante!

class Person {
  private _name: string;
}

class PersonPJ extends Person {
  private _cnpj: string;
}

class PersonPF extends Person {
  private _cpf: string;
}

class Contratos {
  private _clausulas: string[];
  private _assinantes: Person[];
}