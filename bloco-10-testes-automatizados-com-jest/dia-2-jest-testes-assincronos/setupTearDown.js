/* 
Setup e Teardown

Agora veremos um vídeo que mostra como reaproveitar configurações para diversos testes.

Vamos recapitular o que você aprendeu até então com esse vídeo:

O beforeEach é executado antes de cada teste, evitando que você tenha que repetir trechos de código, como por exemplo a criação de cidades utilizada no vídeo, dentro de cada teste. Dessa forma, você escreve o trecho de código uma única vez e garante que o "ambiente" esteja preparado para os testes que precisarem.

Além do beforeEach , temos também o afterEach que foi citado no vídeo e que executa um trecho de código após cada teste. Ele é especialmente útil para resetar configurações, dados, entre outras coisas.

Assim como vimos que pode acontecer dentro dos testes, durante o vídeo tivemos a execução de código assíncrono no beforeEach . Isso reforça, novamente, que é importante sempre se atentar a esse fator e que ele pode aparecer em diferentes cenários.

Outra maneira de tunar o uso do beforeEach e do afterEach é agrupá-los através do describe , para que executem apenas para um determinado conjunto de testes, ao invés de executá-los para todos os testes, pois frequentemente um trecho de código se aplica a alguns testes, mas não a outros.

Abaixo está o código utilizado no vídeo:
 */

// index.js

let cities = [];

function getCities() {
  return cities;
}

function retrieveCitiesFromCache() {
  cities.push('Fortaleza');
  cities.push('Belo Horizonte');
}

function requestCities() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      cities.push('Fortaleza');
      cities.push('Belo Horizonte');
      cities.push('São Paulo');
      cities.push('Recife');
      cities.push('Porto Alegre');
      cities.push('Goiânia');
      cities.push('Manaus');
      cities.push('Piauí');
      resolve();
    }, 200);
  });
}

function removeCity(city) {
  const index = cities.indexOf(city);
  if (index > -1) cities.splice(index, 1);
}

function isCity(name) {
  return cities.includes(name);
}

function resetCities() {
  cities = [];
}

module.exports = {
  resetCities,
  getCities,
  removeCity,
  retrieveCitiesFromCache,
  requestCities,
  isCity,
};

// index.test.js

const {
  resetCities,
  getCities,
  removeCity,
  retrieveCitiesFromCache,
  requestCities,
  isCity,
} = require('./index');

describe('Retrieving cities from cache', () => {
  beforeEach(() => {
    retrieveCitiesFromCache();
  });

  afterEach(() => {
    resetCities();
  });

  it('should have only 1 city after remove Belo Horizonte', () => {
    removeCity('Belo Horizonte');
    expect(getCities().length).toBe(1);
  });

  it('should have 2 cities after retrieving from cache', () => {
    expect(getCities().length).toBe(2);
  });
});

describe('Requesting cities from api', () => {
  beforeEach(() => requestCities());

  afterEach(() => {
    resetCities();
  });

  it('should have 8 cities after requesting from api', () => {
    const cities = getCities();
    expect(cities.length).toBe(8);
  });

  it('should have the city of Belo Horizonte', () => {
    expect(isCity('Belo Horizonte')).toBeTruthy();
  });

  it('should have the city of Fortaleza', () => {
    expect(isCity('Fortaleza')).toBeTruthy();
  });

  it('should have the city of São Paulo', () => {
    expect(isCity('São Paulo')).toBeTruthy();
  });

  it('should have the city of Recife', () => {
    expect(isCity('Recife')).toBeTruthy();
  });

  it('should have the city of Porto Alegre', () => {
    expect(isCity('Porto Alegre')).toBeTruthy();
  });

  it('should have the city of Goiânia', () => {
    expect(isCity('Goiânia')).toBeTruthy();
  });

  it('should have the city of Manaus', () => {
    expect(isCity('Manaus')).toBeTruthy();
  });

  it('should have the city of Piauí', () => {
    expect(isCity('Piauí')).toBeTruthy();
  });
});