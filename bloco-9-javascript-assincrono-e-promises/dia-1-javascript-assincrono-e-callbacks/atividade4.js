// 4 - Suponha que você precise simular uma mensagem enviada do robô Curiosity de Marte para a Terra. O Curiosity envia para a Terra a temperatura atual em Marte, gastando um tempo variável de até 5 segundos para que termine o envio. Crie a função sendMarsTemperature , que imprime a temperatura em Marte.

const messageDelay = () => Math.floor(Math.random() * 5000);

const getMarsTemperature = () => {
  const maxTemperature = 58;
  return Math.floor(Math.random() * maxTemperature);
};

const sendMarsTemperature = () => {
  setTimeout(() => console.log('Mars temperature is 20 graus Celcius'),(Math.random()*5000)+1);

  // Obs.: no set time out mesmo usando o math.random o tempo tem que ser em milisegundos

  // setTimeout(()=> console.log("Returned planet: ", mars), 4000);

}
sendMarsTemperature(); // imprime "Mars temperature is: 20 degree Celsius", por exemplo
