/*Imprima no console uma mensagem de boas-vindas para a personagem acima, incluindo seu nome.
Valor esperado no console: Bem-vinda, Margarida*/


//requisito 1 Imprima no console uma mensagem de boas-vindas para a personagem acima, incluindo seu nome.

let info = {
  personagem: 'Margarida',
  origem: 'Pato Donald',
  nota: 'Namorada do personagem principal nos quadrinhos do Pato Donald',
  recorrente: "Sim"
};
console.log("___________________")
//requisito 2 Insira no objeto uma nova propriedade com o nome de chave 'recorrente' e o valor 'Sim' e, em seguida, imprima o objeto no console.

for (let pessoa in info) {
  console.log(pessoa + " : " + info[pessoa])
}
console.log("___________________")
// requisito 3 Faça um for/in que mostre todas as chaves do objeto.

for (let pessoa in info) {
  console.log(pessoa)
}
console.log("___________________")
//requisito 4 Faça um novo for/in , mas agora mostre todos os valores das chaves do objeto.

for (let pessoa in info) {
  console.log(info[pessoa])
}
console.log("___________________")

//requisito 5 Agora, defina um segundo objeto com a mesma estrutura (as mesmas chaves) do primeiro e os seguintes valores: 'Tio Patinhas', 'Christmas on Bear Mountain, Dell's Four Color Comics #178', 'O último MacPatinhas', 'Sim'. Então, imprima os valores de cada objeto juntos de acordo com cada uma das chaves.


let info = {
  personagem: 'Margarida',
  origem: 'Pato Donald',
  nota: 'Namorada do personagem principal nos quadrinhos do Pato Donald',
  recorrente: "Sim",
  info2: {
    personagem: 'Tio Patinhas',
    origem: 'Christmas on Bear Mountain, Dells Four Color Comics # 178',
    nota: 'O último MacPatinhas',
    recorrente: "Sim"
  }
}
for (let pessoa in info) {
  if (info[pessoa] === info.info2[pessoa]) {
    console.log("ambos recorrentes")
    break;
  } else {
    console.log(pessoa + " : " + info[pessoa])
  }
}


console.log("___________________")