// Como foi visto nos exemplos anteriores, o forEach percorre o array e executa a função passada para cada um dos seus valores. O forEach não retorna nenhum valor .
// Assista a seguir o vídeo em que o nosso querido Cairo explica como o método forEach funciona.

// Exemplo.: enviar email para varias pessoas da listaDePessoasAprovadas;

let listaDePessoasAprovadas = [
  'fulano@hotmail.com',
  'beltrano@hotmail.com',
  'ciclano@hotmail.com',
];

const enviarEmail = (email) => {
  console.log(`emial para ${email} foi enviado`);
};

  listaDePessoasAprovadas.forEach((item, position, array) =>{
    enviarEmail(item);
    console.log(`sua colocação é ${position +1} de ${array.length}`);
  })

// ForEach espera uma função de no máximo 3 parâmetros, o primeiro parâmetro é o nosso próprio item, o segundo parâmetro é a posição desse item no array, e o terceiro é a própria lista que ele está percorrendo. 

// Agora vamos usar o forEach , para realizar a tabuada do 2. Veja o exemplo abaixo:

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


const tabuada2 = (elemento) => {
  console.log(`${elemento*2}`)};

  numbers.forEach(tabuada2);

//   No exemplo acima, foi executado para cada elemento do array a função multipliesFor2 , que imprime o parâmetro element * 2 no console.
// Agora estamos tratando de uma HOF , sendo assim é possível se utilizar também dos demais parâmetros para se resolver um problema. Como se pode fazer isso? Veja este exemplo abaixo com o uso de index no forEach :

const names = ['Bianca', 'Camila', 'Fernando', 'Ana Roberta'];

const convertToUpperCase = (name, index) => {
  names[index] = name.toUpperCase();
};

const convertToLowerCase = (nome, index) =>{
  names[index] = nome.toLowerCase();
}

names.forEach(convertToLowerCase);
// names.forEach(convertToUpperCase);
console.log(names); // [ 'BIANCA', 'CAMILA', 'FERNANDO', 'ANA ROBERTA' ]

// Para fixar
// 1 - Use o método forEach chamando a callback showEmailList para apresentar os emails

const emailListInData = [
  'roberta@email.com',
  'paulo@email.com',
  'anaroberta@email.com',
  'fabiano@email.com',
];

const showEmailList = (email) => {
  console.log(`O email ${email} esta cadastrado em nosso banco de dados!`);
};

emailListInData.forEach((item, position) => {
  showEmailList(item);
  console.log(`email enviado número ${position+1}`);
})

// 2 - Leia e entenda este exemplo do forEach feito no CodePen. https://codepen.io/pen/?editors=0010

// Array contendo a lista de emails.
const emailList = [
  "isa@myemail.com",
  "lipe@myemail.com",
  "digo@myemail.com",
  "greg@myemail.com"
];

// Função callback que recebe o array emailList como parâmetro.
const showEmailList = (list) => {
  const div = document.querySelector("#email-list");
  div.innerHTML = '';
// Para cada e-mail da lista, a função cria uma tag <p> com a frase '${email}: Enviado com sucesso'
  list.forEach((email) => {
    const p = document.createElement("p");
    p.innerHTML = `${email} : Enviado com sucesso!`;
    div.appendChild(p);
  });
}

const btnFilter = document.querySelector("#btn-filter");
btnFilter.addEventListener("click", () => showEmailList(emailList));

