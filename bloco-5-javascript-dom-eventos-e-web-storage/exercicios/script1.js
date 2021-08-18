//Recupere o elemento que contém o título da página e faça algo com ele, como alterá-lo para o nome do seu filme favorito.

document.getElementById("page-title").innerHTML = "O poderoso chefão";

//Agora recupere o segundo parágrafo e use sua criatividade para alterá-lo.

document.getElementById("second-paragraph").innerText = "Eu que alterei"

//Por fim, recupere o subtítulo e altere-o também.

document.getElementById("subtitle").innerText = "Por que é o melhor filme?"
const paragraph = document.getElementById("paragraph");
paragraph.style.color = "red";

/*Utilizando o mesmo template de exercício anterior:
Adicione uma classe igual para os dois parágrafos.
Recupere os seus parágrafos via código JavaScript , usando a função getElementsByClassName ;
Altere algum estilo do primeiro deles.
Recupere o subtítulo e altere a cor dele usando a função getElementsByTagName .
*/
document.getElementsByClassName("paragrafo")[0] = paragraph.style.color="blue";

// const subtitle = document.getElementsByTagName("h4"); 
// subtitle[0].style.color = "dark Blue"
// subtitle[0].style.backgroundColor = "orange"
document.getElementsByTagName("h4")[0].style.color = "green"