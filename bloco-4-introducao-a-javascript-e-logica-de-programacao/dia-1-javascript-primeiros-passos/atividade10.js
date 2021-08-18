let custo = 1
let venda = 3

const imposto = (20/100)


if (custo < 0 || venda <0){
  console.log("erro")
} 



let custoTotal = custo+imposto
console.log(custoTotal)

console.log(venda-custoTotal)
