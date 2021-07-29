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