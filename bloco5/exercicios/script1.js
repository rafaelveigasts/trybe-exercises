//Recupere o elemento que contém o título da página e faça algo com ele, como alterá-lo para o nome do seu filme favorito.

document.getElementById("page-title").innerHTML = "O poderoso chefão";

//Agora recupere o segundo parágrafo e use sua criatividade para alterá-lo.

document.getElementById("second-paragraph").innerText = "Eu que alterei"

//Por fim, recupere o subtítulo e altere-o também.

document.getElementById("subtitle").innerText = "Por que é o melhor filme?"
const paragraph = document.getElementById("paragraph");
paragraph.style.color = "red";