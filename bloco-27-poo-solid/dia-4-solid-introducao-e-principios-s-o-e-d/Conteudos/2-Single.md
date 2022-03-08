## Single Responsibility Principle

Há uma regra do ESLint (Provida pelo plugin sonarjs https://github.com/SonarSource/eslint-plugin-sonarjs ) que assombra várias pessoas desenvolvedoras em algum momento: a regra de Complexidade Cognitiva ( sonarjs/cognitive-complexity ) .

Em poucas palavras, essa regra, como outras em conjunto ( Complexidade Ciclomática https://eslint.org/docs/rules/complexity , Número máximo de linhas por função https://eslint.org/docs/rules/max-lines-per-function , Número máximo de caracteres por linha https://eslint.org/docs/rules/max-lines-per-function , entre outros) garante que nenhuma de suas funções é complicada demais.

Se ela é muito grande e/ou muito confusa, a regra te alerta para que deixe seu código menor e mais simples.

Mas muitas vezes isso é meio desafiador, certo? "Como raios eu deixo essa função do tamanho que se pede?!". Uma forma de se orientar a fazer isso é justamente o princípio da responsabilidade única .

<img src='SRP.jpeg' />

Vamos construir um exemplo?

## SRP Iniciando o exemplo

Em uma nova pasta, inicie uma aplicação utilizando o comando npm init -y ;

Configure os scripts de teste e linter no arquivo package.json (se a tag scripts já existir, basta substituir os valores pelos abaixo):

  "scripts": {
    "test": "mocha -r ts-node/register ./tests/**/*.{test,spec}.{t,j}s",
    "lint": "eslint  -c .eslintrc.json src/**/*.{t,j}s"
  },


Coloque as dependências que vamos utilizar em desenvolvimento no arquivo package.json :


"devDependencies": {
    "typescript": "^4.4.2",
    "ts-node": "^10.2.1",
    "eslint": "^7.32.0",
    "eslint-config-trybe-backend": "^1.0.4",
    "chai": "^4.3.4",
    "mocha": "^9.1.1",
    "sinon": "^11.1.2",
    "@typescript-eslint/eslint-plugin": "^4.30.0",
    "@typescript-eslint/parser": "^4.30.0",
    "@types/chai": "^4.2.21",
    "@types/jest": "^27.0.1",
    "@types/mocha": "^9.0.0",
    "@types/sinon": "^10.0.2"
  },


Instale as dependências com o comando npm i
Crie o arquivo de configuração do TypeScript com o comando tsc --init

Adicione um arquivo .eslintrc.json na raiz do projeto, com o seguinte conteúdo:

{
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "trybe-backend"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "ignorePatterns": ["tests/", "node_modules/"],
    "env": { "es2021": true },
    "plugins": ["@typescript-eslint"]
}

Crie duas pastas, tests e src , para nossos exemplos. Crie um arquivo index.ts na pasta src ;