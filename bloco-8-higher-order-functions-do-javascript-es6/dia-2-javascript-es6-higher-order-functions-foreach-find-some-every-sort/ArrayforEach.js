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

