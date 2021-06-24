let custo = 1
let venda = 3

const imposto = (20/100)

let custoTotal = custo+imposto
console.log(custoTotal)

if (custo < 0 || venda <0){
  console.log("erro")
} 

console.log(venda-custoTotal)
