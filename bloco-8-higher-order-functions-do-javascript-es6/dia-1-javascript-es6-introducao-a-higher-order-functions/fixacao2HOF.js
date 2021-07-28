// 2 - Desenvolva uma HOF que retorna o resultado de um sorteio. Esta HOF irá gerar um número aleatório entre 1 e 5 recebendo como parâmetros o número apostado e uma função que checa se o número apostado é igual ao número sorteado. O retorno da sua HOF deve ser uma string (Ex: "Tente novamente" ou "Parabéns você ganhou").

const checarNumero = (meuNumero, numero) => meuNumero === numero;

const resultadoLoteria = (meuNumero, callback) => {
  const numero = Math.round(Math.random() * 5);
  console.log(numero)

  if (meuNumero === numero) {
    return `Parabéns você ganhou`;
  } else {
    return `Tente novamente`;
  }
return callback()
};

console.log(resultadoLoteria(1, checarNumero));