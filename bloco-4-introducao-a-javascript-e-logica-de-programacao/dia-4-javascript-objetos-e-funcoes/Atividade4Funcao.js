//Crie uma função que receba um array de nomes e retorne o nome com a maior quantidade de caracteres.

let nomes = ['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana'];

let maiorNome = [0]

function maiorPalavra() {
  for (let key in nomes) {
    if (maiorNome.length < nomes[key].length) { // No array nome verifica o tamanho da posicao key e compara com maiorNome.lengt que é zero e atribui a maior nome para nova comparação
      maiorNome = nomes[key]
    }
  }
  return maiorNome;
}

console.log(maiorPalavra(nomes))