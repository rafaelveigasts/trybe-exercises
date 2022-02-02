## Entendendo o JWT

O resultado final do JWT dá-se através da assinatura criptográfica de dois blocos de JSON codificados em base64 https://pt.wikipedia.org/wiki/Base64 . Esses dois blocos JSON codificados são o header (cabeçalho) e payload (carga) que mencionamos acima. A signature (assinatura) é a junção dos hashes gerados a partir do header e payload.

### **Header**

O Header contém duas propriedades: o tipo do token, que é JWT, e o tipo do algoritmo de hash , como HMAC-SHA256 ou RSA :

{
  "alg": "HS256",
  "typ": "JWT"
}

### **Payload (dados do usuário)**

Esta é a segunda parte do token, que contém os "dados". Esses "dados" são declarações sobre uma entidade (geralmente, o usuário):

{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
### **Signature**

Para gerar a assinatura, você deve usar o header e o payload codificados em base64 , usando o algoritmo definido no header:

Código de exemplo:

import { hmac } from 'bibliotecaDeHmac';

function base64 (string) {
  return Buffer.from(string).toString('base64');
}

const header = JSON.stringify({
  alg: 'HS256',
  type: 'JWT'});

const payload = JSON.stringify({
  sub: '1234567890',
  name: 'John Doe',
  admin: true});

const secret = 'MinhaSenhaMuitoComplexa123';

const assinatura = hmac(`${base64(header)}.${base64(payload)}`, secret);

const token = `${base64(header)}.${base64(payload)}.${base64(assinatura)}`;

PS: você verá código de verdade daqui a pouco :)

O resultado terá a seguinte estrutura:
(Header em base64).(Payload em base64).(Signature em base64)

Exemplo de resultado:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNTQ3OTc0MDgyfQ.2Ye5_w1z3zpD4dSGdRp3s98ZipCNQqmsHRB9vioOx54

Nesse caso, temos:

**Header**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

**Payload**: eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNTQ3OTc0MDgyfQ
Signature: 2Ye5_w1z3zpD4dSGdRp3s98ZipCNQqmsHRB9vioOx54

Um exemplo de envio de um JWT via header em uma requisição HTTP:

 GET /foo/bar HTTP/1.1
 Host: www.exemplo.com
 Authorization: Bearer (Header em base64).(Payload em base64).(Signature em base64)

Ou seja, por ser algo que é transmitido via HTTP, JWT pode ser usado com qualquer linguagem que suporte os requisitos mínimos para gerar o token e enviar uma requisição HTTP, como, por exemplo, Java, C#, PHP ou Python.

O diagrama abaixo ilustra como um JWT é gerado a partir do header, do payload e da chave secreta.

<img src='pipeline.png' />
