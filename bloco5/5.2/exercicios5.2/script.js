// E a prática? Aqui!
// Crie um irmão para elementoOndeVoceEsta .

let divPai = document.querySelector('#pai');
let irmaoElementoOndeVoceEsta = document.createElement('div')
irmaoElementoOndeVoceEsta.id = "irmaoElementoOndeVoceEsta"
divPai.appendChild(irmaoElementoOndeVoceEsta)

// Crie um filho para elementoOndeVoceEsta .

let divElementoOndeVoceEsta = document.querySelector('#elementoOndeVoceEsta');
let filhoElementoOndeVoceEsta = document.createElement('div');
filhoElementoOndeVoceEsta.id = "filhoElementoOndeVoceEsta";
divElementoOndeVoceEsta.appendChild(filhoElementoOndeVoceEsta);

// Crie um filho para primeiroFilhoDoFilho .

let divPrimeiroFilhoDoFilho = document.querySelector('#PrimeiroFilhoDoFilho');
let filhoDoPrimeiroFilhoDoFilho = document.createElement('div');
filhoDoPrimeiroFilhoDoFilho.id = 'filhoDoPrimeiroFilhoDoFilho';
divPrimeiroFilhoDoFilho.appendChild(filhoDoPrimeiroFilhoDoFilho);


// A partir desse filho criado, acesse terceiroFilho .
document.querySelector('#primeiroFilhodoFilho').childNodes[0]



// Para praticar:
// Remova todos os elementos filhos de paiDoPai exceto pai , elementoOndeVoceEsta e primeiroFilhoDoFilho .

let conteudo = document.querySelectorAll('div');

for ( let i of conteudo){
  let elemento = conteudo[i]
  console.log(elemento)
  if ((elemento.id !== 'pai') || (elemento.id !=='elementoOndeVoceEsta') || (elemento.id !=='primeiroFilhoDoFilho') ){
    conteudo.parentElement.removeChild(elemento)
  }
}
