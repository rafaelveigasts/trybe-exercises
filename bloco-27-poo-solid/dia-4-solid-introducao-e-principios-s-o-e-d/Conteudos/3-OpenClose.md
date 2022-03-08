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
