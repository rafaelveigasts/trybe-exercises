## Open/Closed Principle

O princípio aberto/fechado diz que:

Você deve ser capaz de estender um comportamento de uma entidade sem modificar seus comportamentos já existentes.

## OCP Exemplo ruim

Imagine, para o nosso exemplo, o seguinte cenário: somos uma empresa que administra notas de escolas. Cada escola tem seu corte de aprovação (no nosso caso, 0.7 ). Ótimo. Fizemos nosso produto, ele funcionou, e agora uma segunda escola quer ser nossa cliente! Mas o corte de aprovação dela é 0.8 .

Precisamos que nosso sistema contemple essa nova realidade. Aí alteramos as funções approvedStudents e a deixamos assim:

// ./src/index.ts

///...

const approvedStudents = ({ disciplines, school }: Student): boolean =>
  disciplines.every(({ grade }) => (
    school === 'Standard' ? grade >= 0.7 : grade >= 0.8
  ));

/* Abaixo temos o exemplo de execução com algumas adições */
const students = [
  {
    name: 'Lee',
    school: 'Standard',
    disciplines: [
      { name: 'matemática', grade: 0.8 },
      { name: 'história', grade: 0.9 },
    ],
  },
  {
    name: 'Albus',
    school: 'Hogwarts',
    disciplines: [
      { name: 'divination', grade: 0.8 },
      { name: 'potions', grade: 0.9 },
    ],
  },
];

// setApproved(students);

Essa solução funciona, mas não está boa! Nós tivemos que mudar nossa função para acrescentar o novo comportamento a ela! O que acontecerá quando surgir uma terceira escola? Talvez uma quarta, quinta, etc?

Pois bem! Conforme estabelecemos no início, o que o princípio aberto/fechado nos diz que devemos ser capazes de estender um comportamento de uma função sem modificar seus comportamentos já existentes .

Beleza, mas o que isso significa? Significa que, caso você não deve precisar alterar trechos de código existentes para acrescentar um novo comportamento. Veja bem: quando um código funciona e está em produção numa aplicação enorme, queremos evitar mudar aqulo que já existe e funciona.

Mas todo código precisa ser atualizado com o tempo. Como podemos, então, atualizar o nosso código sem alterar o que já existe? O que se deve buscar fazer é escrever o código de modo que, no futuro, você possa acrescentar comportamentos sem mudar os comportamentos que já existem .

## OCP Exemplo bom

No nosso caso, respeitar o OCP é ser capaz de obter o corte de aprovação e os nomes dos conceitos de quaisquer escolas sem alterar a lógica da nossa aplicação! Isso requer que refatoremos o nosso código para deixá-lo aberto para extensões , mantendo-o fechado para modificações .
Para isso, vamos criar um novo tipo para uma escola, e vamos remodelar nossa função approvedStudents :

// ./src/index.ts

//...

type School = {
  name: string;
  approvalGrade: number;
};

type Student = {
  name: string;
  disciplines: Discipline[];
  school: School; // Agora não é mais uma string
};

const approvedStudents = ({ disciplines, school }: Student): boolean =>
  disciplines.every(({ grade }) => grade >= school.approvalGrade);

// Para testar:
const students = [
  {
    name: 'Lee',
    school: { name: 'Standard', approvalGrade: 0.7 },
    disciplines: [
      { name: 'matemática', grade: 0.8 },
      { name: 'história', grade: 0.9 },
    ],
  },
  {
    name: 'Albus',
    school: { name: 'Hogwarts', approvalGrade: 0.8 },
    disciplines: [
      { name: 'divination', grade: 0.8 },
      { name: 'potions', grade: 0.9 },
    ],
  },
];

// setApproved(students);

Observe que, agora, a nossa função approvedStudents está totalmente genérica . Quando quisermos acrescentar mais uma escola, ou duas, ou cem, basta adicionar os dados dela à nossa "base". Aqui, simulamos as escolas criando-as diretamente nas duas pessoas estudantes, mas estas poderiam ser criadas separadamente. Conseguiremos, assim, estender o nosso comportamento sem modificar a função mais. Agora ela respeita o Open/Closed !

Nossos testes também ficarão muito mais legíveis e genéricos quanto ao critério de aprovação:

// ./tests/percentageGradesIntoLetters.spec.ts

import { expect } from "chai";
import { percentageGradesIntoLetters } from "../src";


describe('Testando a função "percentageGradesIntoLetters"', function () {
  describe('quando é passado um array de disciplinas válidas', function () {
    const disciplines = [
      { name: "name", grade: 0.9 },
      { name: "name", grade: 0.8 },
      { name: "name", grade: 0.7 },
      { name: "name", grade: 0.6 },
      { name: "name", grade: 0.1 },
      { name: "name", grade: 0.05 },
    ];
    const resultDisciplines = percentageGradesIntoLetters(disciplines);

    const expectedGrades = ['A', 'B', 'C', 'D', 'E', 'F'];
    const givenGrades = [...resultDisciplines.map(discipline => discipline.letterGrade)];

    for (let index = 0; index < disciplines.length; index += 1) {
      it(`retorna ${expectedGrades[index]} para a nota ${disciplines[index].grade}`, () => {
        expect(givenGrades[index]).to.be.equals(expectedGrades[index]);
      });
    }
  });
});

// ./tests/approvedStudents.spec.ts

import { expect } from "chai";
import { approvedStudents } from "../src";

const disciplinesDict = {
  mathematics: 'matemática',
  history: 'história',
};

describe('Testando a função "approvedStudents"', function () {
  const APPROVAL_GRADE = 0.7;

  describe('quando todas as notas são maiores que o critério de aprovação', function () {
    it('retorna "true"', function () {
      const disciplines = [
        { name: disciplinesDict.mathematics, grade: 0.8 },
        { name: disciplinesDict.history, grade: 0.9 },
      ];
      const school = {
        name: "School",
        approvalGrade: APPROVAL_GRADE
      };

      const result = approvedStudents({ name: "Student", disciplines, school });

      expect(result).to.be.equal(true);
    });
  });

  describe('quando todas as notas são menores que o critério de aprovação', function () {
    it('retorna "false"', function () {
      const disciplines = [
        { name: disciplinesDict.mathematics, grade: 0.1 },
        { name: disciplinesDict.history, grade: 0.2 },
      ];
      const school = {
        name: "School",
        approvalGrade: APPROVAL_GRADE
      };

      const result = approvedStudents({ name: "Student", disciplines, school });

      expect(result).to.be.equal(false);
    });
  });

  describe('quando parte das notas são menores que o critério de aprovação', function () {
    it('retorna "false"', function () {
      const disciplines = [
        { name: disciplinesDict.mathematics, grade: 0.5 },
        { name: disciplinesDict.history, grade: 0.9 },
      ];
      const school = {
        name: "School",
        approvalGrade: APPROVAL_GRADE
      };

      const result = approvedStudents({ name: "Student", disciplines, school });

      expect(result).to.be.equal(false);
    });
  });
});

## Para Fixar

Observe o código abaixo e faça as alterações necessárias para que ele passe a respeitar o Princípio do Aberto/Fechado (OCP) .

export default function progressNotification(
  message: string,
  notificationType: string
): void {
  switch (notificationType) {
    case 'Email':
      console.log('Email: ', message);
      break;
    case 'Phone':
      console.log('Phone: ', message);
      break;
    case 'Console':
      console.log('Console: ', message)
      break;
  }
};