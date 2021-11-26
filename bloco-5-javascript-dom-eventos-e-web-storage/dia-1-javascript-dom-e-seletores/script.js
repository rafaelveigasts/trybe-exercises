document.querySelector("#header-container").style.backgroundColor = "green";
document.querySelector("h1").style.color = "white";

document.querySelector("h1").style.color = "white";


let bgEmergencyTasks =  document.querySelectorAll('.emergency-tasks h3')
  for (let i = 0; i < bgEmergencyTasks.length; i++){
    bgEmergencyTasks[i].style.backgroundColor = 'blue'
  }

document.querySelector('.emergency-tasks').style.backgroundColor="pink";

let bgNoEmergencyTasks =  document.querySelectorAll('.no-emergency-tasks h3')
  for (let i = 0; i < bgNoEmergencyTasks.length; i++){
    bgNoEmergencyTasks[i].style.backgroundColor = 'black'
  }

document.querySelector('.no-emergency-tasks').style.backgroundColor="yellow";

document.querySelector("#footer-container").style.backgroundColor = "green ";