//Crie uma função que receba uma string e retorne true se for um palíndromo , ou false , se não for.

function checkPalindrono(palavra) {
  let invertida = palavra.split('').reverse().join('')
  if (palavra === invertida) {
    console.log("é palindrono")
  } else {
    console.log("não é palindrono")
  }
}

checkPalindrono('banana')