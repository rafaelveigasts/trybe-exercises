/* Configuração Inicial

mkdir my-ts-scripts && cd my-ts-scripts

npm init -y

npm install -D @tsconfig/node14 @types/node typescript

touch tsconfig.json

./tsconfig.json
{
  "extends": "@tsconfig/node14/tsconfig.json", // estendemos a configuração base para o Node 14
  "compilerOptions": {
    "outDir": "./dist", // pasta onde nossos arquivos compilados serão salvos
  },
} */

// ./length.ts

// criamos um array de strings com as unidades de medida
// o tipo inferido pelo TypeScript será "string[]", essa é a sintaxe para tipar um array
// ./length.ts

import utils from "./utils";

const units = ["km", "hm", "dam", "m", "dm", "cm", "mm"];

function convert(value: number, forUnity: string, toUnity: string): number {

    return utils.convert(units, value, forUnity, toUnity);
}