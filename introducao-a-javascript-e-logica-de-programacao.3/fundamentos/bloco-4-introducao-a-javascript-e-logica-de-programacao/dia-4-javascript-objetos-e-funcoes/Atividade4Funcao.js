//Crie uma função que receba um array de nomes e retorne o nome com a maior quantidade de caracteres.

let nomes = ['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana']; 

let maiorNome = [0]

function maiorPalavra(){
for (let key in nomes){
  if (maiorNome.length< nomes[key].length){
    maiorNome = nomes[key]
  }
  }
  return maiorNome;
}

console.log(maiorPalavra(nomes))