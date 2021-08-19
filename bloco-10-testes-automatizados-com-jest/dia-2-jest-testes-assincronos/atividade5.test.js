// 5 - Para este exercício, tente adivinhar a saída dos console.log dos testes abaixo sem executá-los, e veja se compreendeu bem o funcionamento do beforeEach e do afterEach .

beforeEach(() => console.log('1 - beforeEach')); // antes do teste 1 e 2 pois executa antes de CADA TESTE
afterEach(() => console.log('1 - afterEach')); // depois do teste 1 e 2 pois executa antes de CADA TESTE

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeEach(() => console.log('2 - beforeEach')); // antes do teste 2
  afterEach(() => console.log('2 - afterEach'));// depois do teste 2

  test('', () => console.log('2 - test'));
});

/*
O beforeEach é executado antes de cada teste, evitando que você tenha que repetir trechos de código, como por exemplo a criação de cidades utilizada no vídeo, dentro de cada teste. Dessa forma, você escreve o trecho de código uma única vez e garante que o "ambiente" esteja preparado para os testes que precisarem.

Além do beforeEach , temos também o afterEach que foi citado no vídeo e que executa um trecho de código após cada teste. Ele é especialmente útil para resetar configurações, dados, entre outras coisas.
*/