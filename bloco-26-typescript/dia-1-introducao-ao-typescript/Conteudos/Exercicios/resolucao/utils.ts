/* Opa! Mas nosso código ficou identico em todos os exercícios, vamos reescrever algumas partes e diminuir nossa repetição de código.
Vamos criar um arquivo chamado utils.ts que vai centralizar nossas funções em comum, nesse caso as funções convert e a função makeError : */

// ./utils.ts

function makeError(unity: string) {
  throw new Error(`A unidade ${unity} não é uma unidade válida.`)
}

// nossa função convert gora recebe como primeiro parâmetro um array de strings com as unidades de medida
function convert(units: string[], value: number, forUnity: string, toUnity: string): number {

  if (!units.includes(forUnity)) makeError(forUnity); // se a unidade base não for válida lançamos um erro
  if (!units.includes(toUnity)) makeError(toUnity); // se a unidade para a conversão não for válida lançamos um erro

  const forIndex = units.indexOf(forUnity); // pegamos o index da unidade base no array
  const toIndex = units.indexOf(toUnity); // pegamos o index da unidade para a conversão
  const exponent = (toIndex - forIndex); // calculamos o expoente a partir da diferença dos index

  return value * Math.pow(10, exponent);
}

// exportamos nossa função para que os demais scripts possam utilizar
export default {
  convert
}

// Agora vamos mudar nossos scripts para utilizarem o nosso utils.ts :
