let peca = "BISPO"
peca = peca.toLocaleLowerCase()


switch (peca){
  case "rei":
  console.log("Anda uma casa em todas as direções")
  break
  case "dama":
  console.log("Anda em todas as posições a vontade")
  break
  case "bispo":
  console.log("Anda nas diagonais a vontade")
  break
  case "cavalo":
  console.torre("Anda em L no 2x1")
  break
  case "peão":
  console.log("Anda só pra frente")
  break

}