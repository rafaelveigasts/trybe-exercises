## Single Responsibility Principle

Há uma regra do ESLint (Provida pelo plugin sonarjs https://github.com/SonarSource/eslint-plugin-sonarjs ) que assombra várias pessoas desenvolvedoras em algum momento: a regra de Complexidade Cognitiva ( sonarjs/cognitive-complexity ) .

Em poucas palavras, essa regra, como outras em conjunto ( Complexidade Ciclomática https://eslint.org/docs/rules/complexity , Número máximo de linhas por função https://eslint.org/docs/rules/max-lines-per-function , Número máximo de caracteres por linha https://eslint.org/docs/rules/max-lines-per-function , entre outros) garante que nenhuma de suas funções é complicada demais.

Se ela é muito grande e/ou muito confusa, a regra te alerta para que deixe seu código menor e mais simples.

Mas muitas vezes isso é meio desafiador, certo? "Como raios eu deixo essa função do tamanho que se pede?!". Uma forma de se orientar a fazer isso é justamente o princípio da responsabilidade única .

<img src='SRP.jpeg' />

Vamos construir um exemplo?

## SRP Iniciando o exemplo

Em uma nova pasta, inicie uma aplicação utilizando o comando npm init -y ;

Configure os scripts de teste e linter no arquivo package.json (se a tag scripts já existir, basta substituir os valores pelos abaixo):

  "scripts": {
    "test": "mocha -r ts-node/register ./tests/**/*.{test,spec}.{t,j}s",
    "lint": "eslint  -c .eslintrc.json src/**/*.{t,j}s"
  },


Coloque as dependências que vamos utilizar em desenvolvimento no arquivo package.json :


"devDependencies": {
    "typescript": "^4.4.2",
    "ts-node": "^10.2.1",
    "eslint": "^7.32.0",
    "eslint-config-trybe-backend": "^1.0.4",
    "chai": "^4.3.4",
    "mocha": "^9.1.1",
    "sinon": "^11.1.2",
    "@typescript-eslint/eslint-plugin": "^4.30.0",
    "@typescript-eslint/parser": "^4.30.0",
    "@types/chai": "^4.2.21",
    "@types/jest": "^27.0.1",
    "@types/mocha": "^9.0.0",
    "@types/sinon": "^10.0.2"
  },


Instale as dependências com o comando npm i
Crie o arquivo de configuração do TypeScript com o comando tsc --init

Adicione um arquivo .eslintrc.json na raiz do projeto, com o seguinte conteúdo:

{
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "trybe-backend"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "ignorePatterns": ["tests/", "node_modules/"],
    "env": { "es2021": true },
    "plugins": ["@typescript-eslint"]
}

Crie duas pastas, tests e src , para nossos exemplos. Crie um arquivo index.ts na pasta src ;

## SRP Exemplo ruim

Suponha que você deve construir uma aplicação para gerenciar a situação de estudantes numa escola. A sua primeira tarefa é criar uma função que, ao ser chamada, determina a aprovação ou não de uma pessoa estudante e atualiza seu status no banco de dados como Aprovada ou Reprovada . Além disso, as notas marcadas de 0% a 100% (0.0 a 1.0) devem ser convertidas para os conceitos de A a F .
Aí você escreve o seguinte:

// ./src/index.ts

type Discipline = {
  name: string;
  grade: number;
  letterGrade?: string;
};

type Student = {
  name: string;
  disciplines: Discipline[];
};

function setApproved(students: Array<Student>) {
  const studentsWithLetterGrade = students.map((student) => {
    const disciplinesWithLetterGrade = student.disciplines.map((discipline) => {
      if (discipline.grade >= 0.9) discipline.letterGrade = 'A';
      else if (discipline.grade >= 0.8) discipline.letterGrade = 'B';
      else if (discipline.grade >= 0.7) discipline.letterGrade = 'C';
      else if (discipline.grade >= 0.6) discipline.letterGrade = 'D';
      else if (discipline.grade >= 0.1) discipline.letterGrade = 'E';
      else discipline.letterGrade = 'F';

      return discipline;
    });

    return {
      name: student.name,
      disciplines: disciplinesWithLetterGrade,
    };
  });

  const approvedStudents = studentsWithLetterGrade.filter(({ disciplines }) =>
    disciplines.every((discipline) => discipline.grade > 0.7));

  /* Finja que o console.log é algo que atualiza uma base de dados */
  approvedStudents.map(({ name, disciplines }) => {
    console.log(`A pessoa com nome ${name} foi aprovada!`);
    disciplines.map(({ name, letterGrade }) =>
      console.log(`${name}: ${letterGrade}`));
  });
}

/* Abaixo temos um exemplo de execução */
const students = [
  {
    name: 'Lee',
    disciplines: [
      { name: 'matemática', grade: 0.8 },
      { name: 'história', grade: 0.6 },
    ],
  },
  {
    name: 'Clementine',
    disciplines: [
      { name: 'matemática', grade: 0.8 },
      { name: 'história', grade: 0.9 },
    ],
  },
];

setApproved(students);

/*
Saída:
A pessoa com nome Clementine foi aprovada!
matemática: B
história: A
*/

Rode o código utilizando o comando ts-node src . Rode o linter utilizando o comando npm run lint .

Veja bem: nossas variáveis e funções têm bons nomes, o código faz o que se pede, usa Higher Order Functions e outros recursos do Typescript, mas ele está tão... difícil de entender! Não está? Podemos não saber exatamente o motivo, mas definitivamente precisamos quebrar a cabeça para acompanhar seu funcionamento. Não por acaso, no backend, esse código dispara vários erros no ESLint , além de alertar a alta complexidade cognitiva!

Outro ponto de atenção que devemos ter é referente aos testes. Imagine que iremos escrever testes para a função setApproved , e perceba quantos comportamentos distintos precisaremos garantir para uma única função. Ou seja, a testabilidade desse código também não está legal.


## SRP Exemplo "menos pior"

Certo, então como escrevemos um código melhor? É aí que podemos acionar o single responsibility principle .

O primeiro passo para acionar o princípio é ler atentamente o que foi pedido .

No nosso caso, foi isso: "A sua primeira tarefa é criar uma função que, ao ser chamada, determina a aprovação ou não de uma pessoa estudante e atualiza seu status no banco de dados como Aprovada ou Reprovada . Além disso, as notas marcadas de 0% a 100% (0.0 a 1.0) devem ser convertidas para os conceitos de A a F " .

Observe com atenção os termos destacados: a especificação pede que nosso código determine a aprovação, atualize seu status e converta as notas para conceitos de A a F . Fazemos tudo o que foi pedido, mas repare que a especificação descreve o que deve ser feito com três verbos: determinar, atualizar e converter. Daí já temos um code smell , uma pista. Devemos fazer três coisas diferentes!

Vamos começar separando esses três comportamentos em funções diferentes:

// ./src/index.ts

type Discipline = {
  name: string;
  grade: number;
  letterGrade?: string;
};

type Student = {
  name: string;
  disciplines: Discipline[];
};

/* "Converter" */
const percentageGradesIntoLetters = ({ name, disciplines }: Student) => ({
  name,
  disciplines: disciplines.map(({ name, grade }) => {
    let letterGrade;

    if (grade >= 0.9) letterGrade = 'A';
    else if (grade >= 0.8) letterGrade = 'B';
    else if (grade >= 0.7) letterGrade = 'C';
    else if (grade >= 0.6) letterGrade = 'D';
    else if (grade >= 0.1) letterGrade = 'E';
    else letterGrade = 'F';

    return { name, grade, letterGrade };
  })});

/* "Determinar" */
const approvedStudents = ({ disciplines }: Student): boolean =>
  disciplines.every(
    ({ grade }) => grade > 0.7
  );

/* "Atualizar" */
const updateApprovalData = ({ name: studentName, disciplines }: Student): void => {
  console.log(`A pessoa com nome ${studentName} foi aprovada!`);

  disciplines.map(({ name, letterGrade }) =>
    console.log(`${name}: ${letterGrade}`));
};

function setApproved(students: Student[]): void {
  students
    .map(percentageGradesIntoLetters)
    .filter(approvedStudents)
    .map(updateApprovalData);
}

/*
  Não se esqueça que é necessário exportar ao final as funções para que você
  possa testa-las
*/
export {
  percentageGradesIntoLetters,
  approvedStudents,
  updateApprovalData,
  setApproved,
};

Tudo que fizemos aqui foi jogar cada parte da lógica para uma função diferente. Pode parecer pouco, mas releia a função setApproved . Compare com a versão anterior. Só de separarmos nosso código em várias funções a leitura da função fica muito mais fácil!

Agora não precisamos ler todo o código para saber exatamente o que a função faz! Além disso nosso código está mais testável, podemos escrever testes unitários para cada função muito mais facilmente.

Podemos, por exemplo, testar unitariamente se a função approvedStudents está se comportando conforme esperado:

// ./tests/approvedStudents.spec.ts

import { expect } from "chai";
import { approvedStudents } from "../src";

const disciplinesDict = {
  mathematics: 'matemática',
  history: 'história',
};

describe('Testando a função "approvedStudents"', function () {
  describe('quando todas as notas são maiores que 0.7', function () {
    it('retorna "true"', function () {
      const disciplines = [
        { name: disciplinesDict.mathematics, grade: 0.8 },
        { name: disciplinesDict.history, grade: 0.9 },
      ];
      const student = {
        name: "test",
        disciplines: disciplines
      };
      const result = approvedStudents(student);

      expect(result).to.be.equal(true);
    });
  });

  describe('quando todas as notas são menores que 0.7', function () {
    it('retorna "false"', function () {
      const disciplines = [
        { name: disciplinesDict.mathematics, grade: 0.1 },
        { name: disciplinesDict.history, grade: 0.2 },
      ];
      const student = {
        name: "test",
        disciplines: disciplines
      };
      const result = approvedStudents(student);

      expect(result).to.be.equal(false);
    });
  });

  describe('quando parte das notas são menores que 0.7', function () {
    it('retorna "false"', function () {
      const disciplines = [
        { name: disciplinesDict.mathematics, grade: 0.5 },
        { name: disciplinesDict.history, grade: 0.9 },
      ];
      const student = {
        name: "test",
        disciplines: disciplines
      };
      const result = approvedStudents(student);

      expect(result).to.be.equal(false);
    });
  });
});


Também podemos testar de maneira isolada a função "percentageGradesIntoLetters":


// ./tests/percentageGradesIntoLetters.spec.ts

import { expect } from "chai";
import { percentageGradesIntoLetters } from "../src";

const disciplinesDict = {
  mathematics: 'matemática',
};

describe('Testando a função "percentageGradesIntoLetters"', function () {
  describe('quando a nota é maior ou igual a 0.9', function () {
    it('retorna "A"', function () {
      const student = {
        name: 'Lee',
        disciplines: [
          { name: disciplinesDict.mathematics, grade: 0.9 },
        ],
      };

      const {
        disciplines: [{ letterGrade }],
      } = percentageGradesIntoLetters(student);

      expect(letterGrade).to.be.equals('A');
    });
  });

  describe('quando a nota é maior ou igual a 0.8 e menor que 0.9', function () {
    it('retorna "B"', function () {
      const student = {
        name: 'Lee',
        disciplines: [
          { name: disciplinesDict.mathematics, grade: 0.8 },
        ],
      };

      const {
        disciplines: [{ letterGrade }],
      } = percentageGradesIntoLetters(student);

      expect(letterGrade).to.be.equals('B');
    });
  });

  describe('quando a nota é maior ou igual a 0.7 e menor que 0.8', function () {
    it('retorna "C"', function () {
      const student = {
        name: 'Lee',
        disciplines: [
          { name: disciplinesDict.mathematics, grade: 0.7 },
        ],
      };

      const {
        disciplines: [{ letterGrade }],
      } = percentageGradesIntoLetters(student);

      expect(letterGrade).to.be.equals('C');
    });
  });

  describe('quando a nota é maior ou igual a 0.6 e menor que 0.7', function () {
    it('retorna "D"', function () {
      const student = {
        name: 'Lee',
        disciplines: [
          { name: disciplinesDict.mathematics, grade: 0.6 },
        ],
      };

      const {
        disciplines: [{ letterGrade }],
      } = percentageGradesIntoLetters(student);

      expect(letterGrade).to.be.equals('D');
    });
  });

  describe('quando a nota é maior ou igual a 0.1 e menor que 0.6', function () {
    it('retorna "E"', function () {
      const student = {
        name: 'Lee',
        disciplines: [
          { name: disciplinesDict.mathematics, grade: 0.1 },
        ],
      };

      const {
        disciplines: [{ letterGrade }],
      } = percentageGradesIntoLetters(student);

      expect(letterGrade).to.be.equals('E');
    });
  });

  describe('quando a nota é menor que 0.1', function () {
    it('retorna "F"', function () {
      const student = {
        name: 'Lee',
        disciplines: [
          { name: 'matemática', grade: 0.05 },
        ],
      };

      const {
        disciplines: [{ letterGrade }],
      } = percentageGradesIntoLetters(student);

      expect(letterGrade).to.be.equals('F');
    });
  });
});

Você pode testar usando o comando npm run test ;

Rode o linter utilizando o comando npm run lint para validarmos o que fizemos até agora.

Deixamos o nosso código muito melhor de ser lido e testado, o que é ótimo! Mas, ainda assim, o ESLint levanta o alerta para a complexidade cognitiva . Agora ele acusa a função percentageGradesIntoLetters de ser complexa demais. Então vamos dividi-la em partes ainda menores!


## SRP Exemplo bom

Para dividir a função percentageGradesIntoLetters , descreva textualmente o que a função faz e observe os verbos. Por exemplo: "A função itera sobre cada pessoa estudante e a cada iteração, itera sobre todas as disciplinas delas. Para cada disciplina ela faz a conversão de porcentagem para letra e ao final monta e retorna o objeto com o nome da pessoa estudante e com suas disciplinas" .

Vemos na nossa descrição quatro verbos! Significa que precisamos dividir nossa função em quatro funções menores? Talvez sim, mas talvez não. Vamos passo a passo para ver o que acontece. Primeiro, vamos extrair o verbo faz a conversão :


// ./src/index.ts

type Discipline = {
  name: string;
  grade: number;
  letterGrade?: string;
};

type Student = {
  name: string;
  disciplines: Discipline[];
  school?: string;
};

/* Apoio para a função `getGradeLetter` */
const GRADE_DICT = {
  numbers: [0.9, 0.8, 0.7, 0.6, 0.1],
  letters: ['A', 'B', 'C', 'D', 'E'],
};

/* Função menor para remover o uso excessivo de `if{}else`s */
const getGradeLetter = (gradeNumber: number): string => {
  const gradeNumbers = GRADE_DICT.numbers;
  const gradeLetters = GRADE_DICT.letters;
  for (let i = 0; i < gradeNumbers.length; i += 1) {
    if (gradeNumber >= gradeNumbers[i]) return gradeLetters[i];
  }
  return 'F';
};

/* Coletar notas */
const getLetterGrades = (discipline: Discipline): Discipline => ({
  ...discipline,
  letterGrade: getGradeLetter(discipline.grade)});

/* "Converter" */
const percentageGradesIntoLetters = (student: Student): Student => ({
  ...student,
  disciplines: student.disciplines.map(getLetterGrades)});

/* "Determinar" */
const approvedStudents = ({ disciplines }: Student): boolean =>
  disciplines.every(({ grade }) => grade > 0.7);

/* "Atualizar" */
const updateApprovalData = (student: Student): void => {
  console.log(`A pessoa com nome ${student.name} foi aprovada!`);

  student.disciplines.forEach(({ name, letterGrade }) =>
    console.log(`${name}: ${letterGrade}`));
};

function setApproved(students: Student[]): void {
  students
    .map(percentageGradesIntoLetters)
    .filter(approvedStudents)
    .map(updateApprovalData);
}

export {
  percentageGradesIntoLetters,
  approvedStudents,
  updateApprovalData,
  setApproved,
  getLetterGrades,
};

Rode o linter utilizando o comando npm run lint para validarmos o que fizemos até agora.
E pronto! A função percentageGradesIntoLetters está ou não está mais legível agora?! A cada iteração estamos fazendo pequenas melhorias no código separando suas responsabilidades, mas ao fazer isso estamos, aos poucos, deixando ele melhor! E, simplesmente fazendo um esforço para separar responsabilidades, a complexidade cognitiva sumiu! No que se refere ao Single Responsibility Principle , nossa missão está concluída!

Vamos também adaptar um novo teste usando o percentageGradesIntoLetters.spec.ts como base, para chamar diretamente a nova função getLetterGrades :

// ./tests/getLetterGrades.spec.ts

import { expect } from 'chai';
import { getLetterGrades } from '../src';

const disciplinesDict = {
  mathematics: 'matemática',
};

describe('Testando a função "getLetterGrades"', function () {
  describe('quando a nota é maior ou igual a 0.9', function () {
    it('retorna "A"', function () {
      const discipline = { name: disciplinesDict.mathematics, grade: 0.9 };

      const {
        letterGrade,
      } = getLetterGrades(discipline);

      expect(letterGrade).to.be.equals('A');
    });
  });

  describe('quando a nota é maior ou igual a 0.8 e menor que 0.9', function () {
    it('retorna "B"', function () {
      const discipline = { name: disciplinesDict.mathematics, grade: 0.8 };

      const {
        letterGrade,
      } = getLetterGrades(discipline);

      expect(letterGrade).to.be.equals('B');
    });
  });

  describe('quando a nota é maior ou igual a 0.7 e menor que 0.8', function () {
    it('retorna "C"', function () {
      const discipline = { name: disciplinesDict.mathematics, grade: 0.7 };

      const {
        letterGrade,
      } = getLetterGrades(discipline);

      expect(letterGrade).to.be.equals('C');
    });
  });

  describe('quando a nota é maior ou igual a 0.6 e menor que 0.7', function () {
    it('retorna "D"', function () {
      const discipline = { name: disciplinesDict.mathematics, grade: 0.6 };

      const {
        letterGrade,
      } = getLetterGrades(discipline);

      expect(letterGrade).to.be.equals('D');
    });
  });

  describe('quando a nota é maior ou igual a 0.1 e menor que 0.6', function () {
    it('retorna "E"', function () {
      const discipline = { name: disciplinesDict.mathematics, grade: 0.1 };

      const {
        letterGrade,
      } = getLetterGrades(discipline);

      expect(letterGrade).to.be.equals('E');
    });
  });

  describe('quando a nota é menor que 0.1', function () {
    it('retorna "F"', function () {
      const discipline = { name: disciplinesDict.mathematics, grade: 0.05 };

      const {
        letterGrade,
      } = getLetterGrades(discipline);

      expect(letterGrade).to.be.equals('F');
    });
  });
});

Rode novamente os testes usando o comando npm run test ;

Rode novamente o linter utilizando o comando npm run lint . Agora não é esperado nenhum problema.

Perceba que da mesma forma como simplificamos o entendimento de nosso código simplificamos também a testabilidade dele, sendo possível escrever testes cada vez mais simples e legíveis.

Compare o código do começo com o de agora. O entendimento está ou não está melhor? Se precisássemos fazer alguma alteração no código, ou escrever testes, em qual dos dois códigos você iria preferir trabalhar?


## Para Fixar

Observe o código abaixo e faça as alterações necessárias para que ele passe a respeitar o Princípio da Responsabilidade Única (SRP) .

// ReadingTracker.ts
type Book = {
  book: string;
  author: string;
  genre: string;
}

class ReadingTracker {
  private readingGoal: number;
  private booksRead: number;
  private wishlist: Book[];

  constructor(readingGoal: number) {
    this.readingGoal = readingGoal;
    this.booksRead = 0;
    this.wishlist = [];
  }

  trackReadings(readsCount: number) {
    this.booksRead += readsCount;
    if (this.booksRead >= this.readingGoal) {
      this.progressNotification(
        "Congratulations! You've reached your reading goal!"
      );
      return;
    }
    this.progressNotification(
      "There are still some books to go!"
    );
  }

  addToWishList(book: Book): void {
    this.wishlist.push(book);
  }

  showWishlist(): void {
    console.log(this.wishlist);
  }

  progressNotification(message: string): void {
    console.log(message);
  }
}

const readTracker = new ReadingTracker(20);
readTracker.addToWishList({'The Road', 'Cormac McCarthy', 'Dystopia'});
readTracker.showWishlist();
readTracker.trackReadings(12);
readTracker.trackReadings(9);

## SRP Conclusão

A mesma ideia utilizada aqui para as funções se aplica às classes: cada classe deve possuir somente uma finalidade. Isso também se aplica, em certo nível, à organização dos arquivos que contém nosso código.

O código apresentado aqui foi um exemplo. Todas as funções ficaram no mesmo arquivo.

Possivelmente as funções que fazem a conversão das notas numéricas em letras devessem ficar em um arquivo separado das funções que checam se a pessoa estudante foi aprovada ou não, visto que se agrupam de forma a obter resultados que não estão necessariamente ligados.

Mas atenção!

Você pode estar se perguntando agora: "Ora, mas era possível eu separar as funções em ainda mais responsabilidades diferentes! Eu não deveria fazer isso?". Não necessariamente!

Como toda e qualquer técnica, esse princípio não é uma bala de prata . Ele não vai resolver todos os problemas do seu código. Além disso, o exercício de descrever o que a função faz e separar seus comportamentos de acordo com os verbos sempre será carregado de certa subjetividade.

Sempre será possível dividir a sua função em partes menores, então lembre-se: o objetivo é ter código legível!

Use o princípio para que ele te ajude a melhorar seu código mas não se torne refém dele. É só pensar que um código com várias funções pequenas demais também fica confuso e também dispara o alerta de complexidade cognitiva .

Simplicidade e limpeza do código! É isso que você precisa buscar sempre. 😎
