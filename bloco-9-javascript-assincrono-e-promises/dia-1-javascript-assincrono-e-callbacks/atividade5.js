// 5 - Agora que você fez a função que envia a temperatura de Marte, suponha que você consiga enviar para o robô Curiosity o que você deseja fazer, uma vez obtida com sucesso a temperatura em Marte. Logo, adicione na função sendMarsTemperature um callback que contenha as ações a serem tomadas em cima da temperatura.

const messageDelay = () => Math.floor(Math.random() * 5000);

const getMarsTemperature = () => {
  const maxTemperature = 58;
  return Math.floor(Math.random() * maxTemperature);
};


const toFahrenheit = (degreeCelsius) => (degreeCelsius * 9/5) + 32;

const temperatureInFahrenheit = (temperature) =>
  console.log(`It is currently ${toFahrenheit(temperature)}ºF at Mars`);

const greet = (temperature) =>
  console.log(`Hi there! Curiosity here. Right now is ${temperature}ºC at Mars`);

  // definição da função sendMarsTemperature...
  const sendMarsTemperature = (onSucess) => {
    const currentTemperature = getMarsTemperature();
    setTimeout(() => {
      onSucess(currentTemperature)
    }, 5000);
  }
  
// Observação: onSucess é a função callback, pegamos a temperatura pela função getMarsTemperature e armazenamos numa variavel e definimos um timer para executar a função onSucess.

sendMarsTemperature(temperatureInFahrenheit); // imprime "It is currently 47ºF at Mars", por exemplo
sendMarsTemperature(greet); 
// imprime "Hi there! Curiosity here. Right now is 53ºC at Mars", por exemplo