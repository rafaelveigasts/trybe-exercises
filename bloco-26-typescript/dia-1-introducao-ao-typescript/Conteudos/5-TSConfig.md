## Introdução ao TSConfig

O que indica se um projeto é TypeScript é a presença de um arquivo de configuração TSConfig . O arquivo tsconfig.json , possui as variáveis de configuração que dirão como o nosso código será compilado.

Obs: A melhor prática para a utilização do Typescript num projeto, é instalá-lo como uma devDependency , através do comando npm i -D typescript , e utilizá-lo através do npx . Isso garante que todas as pessoas que forem compilar o projeto, o façam utilizando a mesma versão do TypeScript, e não a versão instalada em suas máquinas.

Podemos criar um arquivo tsconfig.json na mão, ou como boas pessoas desenvolvedoras que somos, podemos utilizar as ferramentas que a linguagem nos dá para gerá-lo automaticamente, já com as principais configurações e então escolhermos as que queremos utilizar.

Para gerar o tsconfig.json vamos utilizar o tsc , sim, a ferramenta de compilação da linguagem TypeScript também traz essa incrível funcionalidade.

Entre em um diretório vazio de sua escolha e execute o seguinte comando no terminal:
Caso tenha instalado o compilador globalmente em sua máquina

tsc --init
OU utilizando o tsc como um executável npx

npx tsc --init
Um arquivo tsconfig.json será gerado no diretório com o seguinte conteúdo:

{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                         /* Enable incremental compilation */
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "commonjs",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "lib": [],                                   /* Specify library files to be included in the compilation. */
    // "allowJs": true,                             /* Allow javascript files to be compiled. */
    // "checkJs": true,                             /* Report errors in .js files. */
    // "jsx": "preserve",                           /* Specify JSX code generation: 'preserve', 'react-native', 'react', 'react-jsx' or 'react-jsxdev'. */
    // "declaration": true,                         /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                      /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                           /* Generates corresponding '.map' file. */
    // "outFile": "./",                             /* Concatenate and emit output to single file. */
    // "outDir": "./",                              /* Redirect output structure to the directory. */
    // "rootDir": "./",                             /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                           /* Enable project compilation */
    // "tsBuildInfoFile": "./",                     /* Specify file to store incremental compilation information */
    // "removeComments": true,                      /* Do not emit comments to output. */
    // "noEmit": true,                              /* Do not emit outputs. */
    // "importHelpers": true,                       /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,                  /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,                     /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                                 /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                       /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                    /* Enable strict null checks. */
    // "strictFunctionTypes": true,                 /* Enable strict checking of function types. */
    // "strictBindCallApply": true,                 /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,        /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                      /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                        /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                      /* Report errors on unused locals. */
    // "noUnusedParameters": true,                  /* Report errors on unused parameters. */
    // "noImplicitReturns": true,                   /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,          /* Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,            /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                  /* Ensure overriding members in derived classes are marked with an 'override' modifier. */
    // "noPropertyAccessFromIndexSignature": true,  /* Require undeclared properties from index signatures to use element accesses. */

    /* Module Resolution Options */
    // "moduleResolution": "node",                  /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                             /* Base directory to resolve non-absolute module names. */
    // "paths": {},                                 /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                              /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                             /* List of folders to include type definitions from. */
    // "types": [],                                 /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,        /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,                    /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,                /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                            /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                               /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                     /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                       /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  }
}

OBS: esse comando foi executado em agosto de 2021, dependendo da data em que você executar o conteúdo do arquivo pode ser um pouco diferente.

Veja que fantástico, além do arquivo gerado trazer as principais configurações, ele traz um comentário à frente de cada linha dizendo o que aquela configuração em específico faz e quais são os valores aceitos e, para fechar com chave de ouro, traz também um link dizendo onde podemos saber mais sobre o arquivo tsconfig.json . Por esse motivo não vamos entrar na explicação de cada configuração (oportunidade para exercitar a aprendizagem ativa 😉), mas à medida que formos utilizando, vamos falar sobre as que escolhemos.

Podemos também utilizar uma configuração base para o ambiente JavaScript (versão do Node ) que estamos utilizando provida pela própria equipe de desenvolvimento do TypeScript através de um repositório no GitHub . Não existe uma versão base para todos os ambientes JavaScript , mas para os mais recentes sim.

Por exemplo, se estivermos desenvolvendo um projeto que usará a versão 12 do Node ou mais recente, podemos utilizar o módulo base @typescript/node12 .

Nosso tsconfig.json ficaria parecido com isso:

{
  "extends": "@tsconfig/node12/tsconfig.json", // estendemos a configuração base para o Node 12
  "compilerOptions": {
    "preserveConstEnums": true // Não apaga as declarações const enum no código gerado
  },
  "include": ["src/**/*"], // incluimos na compilação todos os arquivos dentro do diretório "src"
  "exclude": ["node_modules", "**/*.spec.ts"] // excluímos da compilação a pasta node_modules e nossos arquivos de testes
}

Isso permite que nosso tsconfig.json concentre as configurações únicas para o nosso projeto, e não todas as configurações para o nosso ambiente execução JavaScript .
