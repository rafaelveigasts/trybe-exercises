/*3- Agora inverta o lado do triângulo. Por exemplo:
n = 5

    *
   **
  ***
 ****
*****
Atenção! Note que esse exercício é bem mais complexo que o anterior! Não basta, aqui, imprimir somente asteriscos. Você precisará de uma lógica para imprimir espaços também.*/




let number = 5;

for (let index = 1; index <= number; index++) {

  let line = '';
  let asterisco = number - index;

  for (let otherIndex = 0; otherIndex < number; otherIndex++) {
    if (line.length < asterisco) {
      line += ' '
    } else {
      line += '*'
    }
  }

  console.log(line);
}
