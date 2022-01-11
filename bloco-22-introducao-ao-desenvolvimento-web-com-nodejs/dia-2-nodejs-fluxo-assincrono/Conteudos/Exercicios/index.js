function doMath(a,b,c,) {
  return new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') 
      reject ('Argumentos inválidos');
      const result = (a + b) * c;
      if (result < 50) {
        return reject ('Resultado menor que 50');
      }
      return resolve (result);
  });
}


doMath(10, 10, 10)
  .then(resolve => console.log(resolve))
  .catch(error => console.log(error))

doMath(1, 1, 'a')
  .then(resolve => console.log(resolve))
  .catch(error => console.log(error))

doMath(1, 1, 1)
  .then(resolve => console.log(resolve))
  .catch(error => console.log(error))


function getRandomNumber(){
  return Math.floor(Math.random()*100+1);
}

// function callDoMath() {
//   /* Criamos um novo array de 3 posições
//    * e utilizamos o `map` para gerar um número aleatório
//    * para cada posição do Array
//    * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/from
//    */
//   const randomNumbers = Array.from({ length: 3 }).map(getRandomNumber);

//   doMath(...randomNumbers)
//     .then(resolve => console.log(resolve))
//     .catch(error => console.log(error))
// }


/* para passar o código anterior para async/await*/

 async function callDoMath(){
  /* Criamos um novo array de 3 posições
  * e utilizamos o `map` para gerar um número aleatório
  * para cada posição do Array
  * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  */
 const randomNumbers = Array.from({ length: 3 }).map(getRandomNumber);
 
 try {
   const result = await doMath(...randomNumbers);
   console.log(result);
  } catch (error) {
    console.log(error);
  }
}

callDoMath();