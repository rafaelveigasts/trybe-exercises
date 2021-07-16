const states = document.getElementById('state');
const estadosOpcao = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins']
const botaoSubmmit = document.getElementById('submit-btn');
const botaoCheckBox = document.getElementById('checkEmprego');
const botaoDataSaida = document.getElementById('saida');

function criarOpcaoEstado() {

  for (let i = 0; i < estadosOpcao.length; i++) {
    let opcoes = estadosOpcao[i];
    let elemento = document.createElement('option');
    elemento.text = opcoes;
    elemento.value = opcoes;
    states.add(elemento);
  }
}
window.onload = criarOpcaoEstado

datePickerId.max = new Date().toISOString().split("T")[0];

rarara.max = new Date().toISOString().split("T")[0];
//stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today

// botaoSubmmit.addEventListener('click',function(event){
//   event.preventDefault()
//   console.log("ola ")
  
//   // validar os dados
//   let name = document.querySelector('[name=nome]');
//   if (name.value.length > 40 || name.value.length === 0){
//     alert('Nome inválido.')
//   }
// } )

botaoCheckBox.addEventListener('click', function(){
  let display = botaoDataSaida.style.display;
  if (display == "none")
  botaoDataSaida.style.display = 'block';
  else
  botaoDataSaida.style.display = 'none'
})
