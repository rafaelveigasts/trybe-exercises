## O que é o JWT?

O JWT (JSON Web Token) é um token gerado a partir de dados "pessoais" que pode ser trafegado pela internet ao fazer requisições para APIs e afins. Mas atenção: toda a informação que colocamos no JWT é pública , e qualquer pessoa com o token consegue ler essas informações. O mecanismo de segurança do JWT permite, no entanto, que apenas quem tem a senha consiga alterar as informações contidas em um token.

A coisa toda funciona assim:
  
  O navegador solicita que o usuário digite seu login e senha.
  
  O navegador então envia esse login e senha ao servidor, para verificar que esses dados estão corretos.
  
  Uma vez que valida login e senha, o servidor cria dois objetos: um contendo informações sobre o token que será gerado, que chamamos de header , e outro contendo os dados do usuário e as permissões que aquela pessoa têm, ao qual chamamos de payload .
  
  O servidor então converte esses dois objetos em JSON, junta-os em uma mesma string e utiliza um algoritmo chamado HMAC para "criptografar" essa string usando um "segredo" que só ele sabe, gerando o que chamamos de assinatura , que nada mais é do que Header + Payload criptografados.
  
  Por fim, o servidor combina o header, o payload originais e a assinatura, criando assim o token .
  
  O token é enviado ao cliente, que o armazena para utilizá-lo nas próximas requisições.

Chamamos de autenticação o processo pelo qual a pessoa usuária consegue, utilizando informações confidenciais como email e senha, efetuar login com sucesso em uma aplicação, tendo como retorno um JSON Web Token pelo qual é possível acessar suas permissões de navegação.

**Na próxima requisição...**

  O navegador envia ao servidor os dados para, por exemplo, cadastrar um novo produto. Juntamente a esses dados, o navegador envia o token que recebeu ao realizar o login.

  Quando recebe os dados, a primeira coisa que o servidor faz é obter o Header e o Payload do token e criptografá-los, gerando, mais uma vez, a assinatura.

  O servidor, então, compara a nova assinatura com a assinatura que foi enviada pelo cliente. Se ambas forem iguais, quer dizer que o conteúdo do Header e do Payload não foram modificados desde o login.

  Agora que já sabe que o token é válido, o servidor continua processando a requisição e, por fim, entrega a resposta para o cliente.

O JWT também é usado para autorização, quando precisamos fazer o processo de atestar as permissões de uma pessoa usuária que deseja acessar uma rota ou recurso protegido. Isso exige o envio do token, normalmente no header Authorization, a partir do qual são acessadas as informações necessárias para a verificação.

Mas o que acontece se, antes de tentar cadastrar um produto, a pessoa que está usando nossa aplicação tentar alterar o token?

Suponha que o payload do token possui uma propriedade chamada admin e que, no token da pessoa em questão, possui o valor false . A pessoa, a fim de tentar obter privilégios de administradora indevidamente, altera o payload, setando o valor de admin para true . Ela então armazena esse token modificado na aplicação e tenta cadastrar um produto. Nesse caso, o que acontece do lado do servidor?

Antes de continuar a leitura, tente descrever o processo que acontece do lado do servidor

Acontece o seguinte:

  O cliente envia, para o servidor as informações do produto e o token modificado

  O servidor extrai o payload e header do token e, utilizando essas duas informações, gera uma assinatura.

  Ao comparar a assinatura nova com a assinatura enviada pelo cliente, o servidor percebe que há uma diferença! Isso acontece porque criptografar { "admin": false } sempre vai gerar um resultado (uma assinatura, nesse caso) diferente de criptografar { "admin": true } .

  Como a assinatura é diferente, o servidor rejeita a requisição, devolvendo um status de erro com uma mensagem informando que o token é inválido.

Perceba que, para que a pessoa usuária consiga alterar o seu token e obter privilégios a mais, ela precisaria gerar uma nova assinatura. Acontece que, para gerar uma nova assinatura, é necessário possuir o segredo, que apenas o servidor possui. Sendo assim, é virtualmente impossível adulterar um token JWT, o que torna essa tecnologia muito confiável para tratar de autenticação.

### Autenticação e Autorização

É importante ressaltar que autenticação e autorização são coisas diferentes. Autenticação é usada para atestar que alguém é quem diz ser, verificando sua identidade, comumente feita por meio de informações confidenciais como email e senha. Já a autorização verifica as permissões de uma pessoa para acessar ou executar determinadas operações.

Um exemplo simples que evidencia essa diferença é quando você faz log in em uma rede social. Depois de atestar que o nome e senha conferem, você está devidamente autenticado e pode navegar pela aplicação e fazer diversas operações. Mas ao tentar, por exemplo, apagar uma foto de outra pessoa, você provavelmente não terá êxito, uma vez que geralmente, cada cliente só tem autorização para apagar suas próprias postagens.

O simples fato de se estar autenticado pode dar várias permissões para a pessoa usuária, mas ainda pode haver situações em que sejam exigidas autorizações extras, além da autenticação inicial. A partir disso, podemos concluir que a autenticação sempre precede a autorização.

Abaixo, vamos explicar mais sobre o HMAC e a criptografia envolvida no processo, mas não se assuste: não vamos implementar nada disso na mão; tudo está encapsulado nas bibliotecas do JWT.

### O que é HMAC?

O HMAC é um algoritmo para gerar um MAC (código de autenticação de mensagem) criptografado através de algum algoritmo de hash (algoritmos que codificam mensagens), como md5 , sha1 ou sha256 , a partir de uma chave secreta (uma senha) e de uma mensagem qualquer. Por exemplo, se gerarmos o HMAC da mensagem "Olá, tudo bem?", com o segredo "minhaSenha" e o algoritmo sha1 , teremos o seguinte resultado: b88651e71c7c757560722b52e5f1ead754a759d8 . No entanto, se alterarmos o texto para "olá, tudo bem?", mudando apenas a capitalização da primeira letra, o resultado passa a ser ac7016fd2014ca9a79ac2e3ef16b6bd857f91f7a . Agora, imagine que, ao invés de "Olá, tudo bem?" façamos isso com o payload do nosso token. Ao mudar qualquer mínimo detalhe das informações daquele token, a assinatura se torna inválida.

Curiosidade: A fórmula do HMAC é a seguinte:
HMAC(K, m) = hash(K1 + hash(K2 + m))

onde:

  K é a chave secreta;
  m é a mensagem;
  hash é a função de hash escolhida (md5, sha1 etc);
  K1 e K2 são chaves secretas derivadas da chave original K;
  + é a operação de concatenação de strings.