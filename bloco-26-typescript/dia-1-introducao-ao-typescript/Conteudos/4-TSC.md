## TSC - TypeScript Compiler

O TSC é o responsável por realizar a tradução do nosso código TypeScript para código JavaScript .

Lembra que estudamos nas sessões anteriores tipagem em linguagens de programação e descobrimos que o TypeScript é uma linguagem estaticamente tipada e fortemente tipada? O TSC também é o responsável por realizar a verificação de tipo no nosso código TypeScript . Veremos como isso funciona.

Para isso, podemos instalar o TSC e o suporte ao TypeScript em nossa máquina via npm , e utilizarmos o comando tsc seguido do arquivo que desejamos compilar e realizar a análise de tipo. Caso não deseje instalá-lo, você pode utilizar o comando tsc como um executável npx .
Para instalar o compilador TypeScript globalmente:

npm install -g typescript
Podemos executá-lo da seguinte forma:

tsc nomeDoArquivo.ts
OU

npx tsc nomeDoArquivo.ts

OBS: A extensão .ts é a extensão padrão para os arquivos TypeScript .

Ao rodarmos esse comando, será verificado o conteúdo do arquivo nomeDoArquivo.ts e, caso não haja nenhum problema, um novo arquivo será criado, chamado nomeDoArquivo.js com o código compilado para JavaScript , podemos então rodar o arquivo .js gerado utilizando o Node . Caso haja erro, o compilador apontará uma mensagem de erro no terminal e o arquivo .js não será gerado.
Rodando o arquivo gerado utilizando o Node :

node nomeDoArquivo.js
