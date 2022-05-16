## Estrutura da aplicação

Abaixo está a árvore de arquivos da nossa aplicação. Ela é um pouco extensa, mas tenha calma que veremos arquivo por arquivo. Nosso projeto trata de uma ótica que vende óculos com diferentes tipos de armação e lentes. A ideia é termos dois endpoints, um para lentes e outro para armações, mas possibilitando, por meio de orientação a objetos, que nossa aplicação cresça de forma simplificada.

Árvore de arquivos:

|   .env
|   .env.example
|   .eslintrc.json
|   .gitignore
|   docker-compose.yml
|   package.json
|   tsconfig.json
|
\---src
    |   index.ts
    |   server.ts
    |
    +---Controllers
    |       Frame.ts
    |       index.ts
    |       Lens.ts
    |
    +---Interfaces
    |       Frame.ts
    |       Lens.ts
    |
    +---Models
    |       Connection.ts
    |       Frame.ts
    |       index.ts
    |       Lens.ts
    |       MongoModel.ts
    |
    +---Routes
    |       Router.ts
    |
    \---Services
            Frame.ts
            index.ts
            Lens.ts




O package.json é o arquivo que contém as dependências e scripts do projeto. O tsconfig.json é o arquivo que configura o TypeScript no projeto. O .eslintrc.json é o arquivo de configuração do eslint https://eslint.org/ . Já o .gitignore serve para ignorar pastas e arquivos que não queremos versionar com o git . Dê uma olhadinha no conteúdo destes arquivos:

  // package.json`
  {
    "name": "mongoose-poo-example",
    "version": "1.0.0",
    "description": "",
    "main": "src/index.js",
    "scripts": {
      "start": "ts-node-dev src/index.ts",
      "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
    },
    "devDependencies": {
      "@types/express": "^4.17.13",
      "@types/node": "^16.11.7",
      "@typescript-eslint/eslint-plugin": "^5.3.1",
      "@typescript-eslint/parser": "^5.3.1",
      "eslint": "^7.32.0",
      "eslint-config-airbnb-base": "^15.0.0",
      "eslint-config-airbnb-typescript": "^15.0.0",
      "eslint-plugin-editorconfig": "^3.2.0",
      "eslint-plugin-import": "^2.25.3",
      "eslint-plugin-mocha": "^9.0.0",
      "eslint-plugin-sonarjs": "^0.10.0",
      "ts-node": "^10.4.0",
      "ts-node-dev": "^1.1.8",
      "typescript": "^4.4.3"
    },
    "dependencies": {
      "express": "^4.17.1",
      "express-async-errors": "^3.1.1",
      "mongoose": "^6.1.8",
      "zod": "^3.11.6"
    }
  }



  // tsconfig.json
  {
    "compilerOptions": {
      "target": "es2016",
      "module": "commonjs",
      "typeRoots": [
        "src/@types",
        "./node_modules/@types"
      ],
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "skipLibCheck": true
    }
  }


  // .eslintrc.json
  {
      "root": true,
      "env": {
          "browser": false,
          "node": true,
          "es2021": true,
          "jest": true
      },
      "extends": [
          "plugin:@typescript-eslint/recommended",
          "airbnb-base",
          "plugin:editorconfig/noconflict",
          "plugin:mocha/recommended",
          "airbnb-typescript/base"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
          "ecmaVersion": 2019,
          "sourceType": "module",
          "project": "./tsconfig.json"
      },
      "plugins": [
          "@typescript-eslint",
          "sonarjs",
          "editorconfig",
          "mocha"
      ],
      "rules": {
          "no-console": "off",
          "camelcase": "warn",
          "arrow-parens": [
,
              "always"
          ],
          "quotes": [
,
              "single"
          ],
          "implicit-arrow-linebreak": "off",
          "consistent-return": "off",
          "no-unused-vars": [
              "error",
              {
                  "argsIgnorePattern": "^_",
                  "ignoreRestSiblings": true
              }
          ],
          "object-curly-newline": "off",
          "max-params": [
              "error",

          ],
          "max-lines": [
              "error",

          ],
          "max-lines-per-function": [
              "error",
              {
                  "max": 20,
                  "skipBlankLines": true,
                  "skipComments": true
              }
          ],
          "max-len": [
              "error",
              {
                  "code": 100
              },
              {
                  "ignoreComments": true
              }
          ],
          "complexity": [
              "error",

          ],
          "import/no-extraneous-dependencies": [
              "off"
          ],
          "sonarjs/cognitive-complexity": [
              "error",

          ],
          "sonarjs/no-one-iteration-loop": [
              "error"
          ],
          "sonarjs/no-identical-expressions": [
              "error"
          ],
          "sonarjs/no-use-of-empty-return-value": [
              "error"
          ],
          "sonarjs/no-extra-arguments": [
              "error"
          ],
          "sonarjs/no-identical-conditions": [
              "error"
          ],
          "sonarjs/no-collapsible-if": [
              "error"
          ],
          "sonarjs/no-collection-size-mischeck": [
              "error"
          ],
          "sonarjs/no-duplicate-string": [
              "error"
          ],
          "sonarjs/no-duplicated-branches": [
              "error"
          ],
          "sonarjs/no-identical-functions": [
              "error"
          ],
          "sonarjs/no-redundant-boolean": [
              "error"
          ],
          "sonarjs/no-unused-collection": [
              "error"
          ],
          "sonarjs/no-useless-catch": [
              "error"
          ],
          "sonarjs/prefer-object-literal": [
              "error"
          ],
          "sonarjs/prefer-single-boolean-return": [
              "error"
          ],
          "sonarjs/no-inverted-boolean-check": [
              "error"
          ]
      }
  }




// .gitignore

node_modules
.env


## .env

Observando o conteúdo do .gitignore , é possível perceber a presença de um arquivo .env . Este é um arquivo que contém variáveis de ambiente, geralmente responsáveis por guardar dados sensíveis, como por exemplo user e senha do banco de dados.

Como o .env não é versionado, é interessante ter um arquivo .env.example , que contém as mesmas variáveis de ambiente, mas com valores de exemplo, bem como comentários explicativos. Com isso, as outras pessoas que colaborarem no projeto saberão que precisam criar um arquivo .env localmente e precisam adicionar as variáveis de ambiente para que tudo funcione.

  // .env

  MONGO_INITDB_ROOT_USERNAME=root
  MONGO_INITDB_ROOT_PASSWORD=example

  // .env.example

  MONGO_INITDB_ROOT_USERNAME=example # probably root
  MONGO_INITDB_ROOT_PASSWORD=example


## Docker-compose

Para automatizar e padronizar a criação do banco de dados, utilizamos o arquivo docker-compose.yml . Nele temos a definição de qual banco vamos utilizar, especificando a imagem e versão, expondo as portas necessárias para a conexão, bem como já aproveitando as variáveis de ambiente para a criação de um root user.

  // docker-compose.yml
  version: '3.4'

  services:
    mongo:
      image: mongo:5.0.6
      ports:
        - "27017:27017"
      restart: always
      environment:
        MONGO_INITDB_ROOT_USERNAME: '${MONGO_INITDB_ROOT_USERNAME}'
        MONGO_INITDB_ROOT_PASSWORD: '${MONGO_INITDB_ROOT_PASSWORD}'
