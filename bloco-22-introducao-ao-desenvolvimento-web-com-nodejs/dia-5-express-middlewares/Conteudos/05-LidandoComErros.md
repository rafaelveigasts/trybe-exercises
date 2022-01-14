## Lidando com erros

Até agora, falamos de middlewares comuns, que recebem req , res e next e tratam uma request caso tudo esteja correndo bem. Acontece que existe ainda um outro tipo de middleware: o middleware de erro .

A diferença de um middleware de erro para um middleware comum é que a assinatura dele recebe quatro parâmetros ao invés de três, ficando assim: function (err, req, res, next) {} .

app.use(middleware1);
app.get('/', */ ... */);
app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

É importante notar que:

Middlewares de erro sempre devem vir depois de rotas e outros middlewares ;

Middlewares de erro sempre devem receber quatro parâmetros .

O Express utiliza a quantidade de parâmetros que uma função recebe para determinar se ela é um middleware de erro ou um middleware comum. Ou seja, mesmo que você não vá utilizar os parâmetros req , res ou next , seu middleware de erro precisa recebê-los . Você pode adicionar um underline no começo do nome dos parâmetros que não vai usar. Isso é uma boa prática e sinaliza para quem está lendo o código que aquele parâmetro não é utilizado. Por exemplo: function (err, _req, res, _next) {} .

Também é possível encadear middlewares de erro, no mesmo esquema dos outros middlewares, simplesmente colocando-os na sequência em que devem ser executados.

app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  /* passa o erro para o próximo middleware */
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.json({ error: err });
});

Repare que estamos fazendo next(err) na linha 4. Isso diz ao Express que ele não deve continuar executando nenhum middleware ou rota que não seja de erro. Ou seja, quando passamos qualquer parâmetro para o next , o Express entende que é um erro e deixa de executar middlewares comuns , passando a execução para o próximo middleware de erro registrado para aquela rota, router ou aplicação.

Esse detalhe é importante, pois se um erro acontece dentro de uma rota ou middleware e nós não o capturamos e o passamos para a função next , os middlewares de erro não serão chamados para tratar aquele erro. Isso quer dizer que nossa API ficará sem responder àquela requisição, ou até mesmo que o erro encerrará o processo do Node. Por isso, lembre-se: Sempre realize tratamento de erros nas suas rotas e middlewares, passando o erro para a função next , caso necessário.

Um exemplo onde o erro fica "flutuando" e não existe resposta do servidor é quando utilizamos um middleware async . Como o Express não faz .catch na Promise retornada pelo middleware, ele não sabe que ocorreu um erro, a não ser que nós capturamos esse erro e o passemos para a função next .
Vamos usar como exemplo um método que lê um arquivo baseado em um parâmetro de rota enviado na requisição. Vamos fazer isso em um arquivo separado diferente dos exemplos anteriores que fizemos até agora.

⚠️ Atenção ⚠️: Jamais devemos realizar a leitura de um arquivo do sistema de arquivos dessa forma. Concatenar parâmetros recebidos do usuário diretamente na chamada para qualquer método representa uma falha gigantesca de segurança. Vamos fazer isso aqui nesse momento para fins didáticos. Repetindo: não tente isso em casa em produção!

/* errorHandlerExample.js */
const express = require('express');
const fs = require('fs/promises');

const app = express();

app.get('/:fileName', async (req, res, next) => {
    try {
        const file = await fs.readFile(`./${req.params.fileName}`);
        res.send(file.toString('utf-8'));
    } catch (e) {
        next(e);
    }
});

app.use(function (err, req, res, next) {
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(3002);

Nesse caso, tivemos que colocar as duas linhas que executam a leitura do arquivo dentro de uma estrutura try/catch , caso seja disparada alguma exceção, como no exemplo quando o arquivo não existe,o código cai dentro do catch, que por sua vez redireciona para o middleware de erro.

Para testar, execute essa nova API com o comando node errorHandlerExample.js e faça uma requisição para a URL http://localhost:3002/abc . A requisição vai retornar uma resposta similar a essa:

{
  "error": "Erro: ENOENT: no such file or directory, open './abc'"
}

Agora, se você criar o arquivo e jogar o conteúdo, por exemplo, usando o comando echo 'abc' > abc e fizer a requisição de novo, a requisição vai retornar uma resposta com o conteúdo do arquivo.

⚠️ Atenção : O parâmetro passado para função next, é sempre um indicador que ele vai redirecionar para o middleware de erro, e não para passar um objeto qualquer entre dois middelwares, para fazer isso, como já vimos no conteúdo de hoje, usamos o objeto req .
Esse mesmo tipo de erro pode acontecer ao fazer uma query para um banco de dados, e ter várias possíveis falhas, como por exemplo: o banco não está respondendo a nosso pedido de conexão, temos uma query escrita errada, as credenciais de acesso ao banco estão erradas. Entre outras.

Para que não seja necessário ter que criar estruturas try/catch sempre que formos utilizar códigos que eventualmente podem disparar excessões podemos usar um pacote chamado express-rescue .
