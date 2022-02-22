## Iniciando e configurando um projeto Node + TypeScript

Para criarmos um projeto Node + TypeScript , primeiramente devemos iniciar nosso projeto Node padrão como já fazemos. Vamos criar um diretório chamado express-typescript , entrar no diretório e iniciar nosso projeto Node.

**mkdir express-typescript && cd express-typescript**

**npm init -y**

O próximo passo é adicionar o suporte ao TypeScript ao nosso projeto, para isso vamos instalar o pacote npm do TypeScript como dependência de desenvolvimento do nosso projeto. Lembrando que em produção sempre iremos usar o código compilado de TypeScript para JavaScript , por isso utilizamos como dependência de desenvolvimento.

**npm install -D typescript**

Por que fazemos isso, ao invés de usarmos o pacote instalado globalmente em nossas máquinas ou como um executável npx ? Porque com isso conseguimos garantir que todas as pessoas que vão trabalhar nesse projeto estejam sempre executando uma mesma versão, evitando possíveis incompatibilidades, caso uma tenha uma versão diferente da outra.

Agora vamos criar nosso arquivo tsconfig.json com a seguinte configuração:

{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "rootDir": "./",
        "outDir": "./dist",
        "esModuleInterop": true,
        "strict": true
    }
}

**module**: especifica o sistema de módulo a ser utilizado no código JavaScript que será gerado pelo compilador como sendo o CommonJS;
**target**: define a versão do JavaScript do código compilado como ES6 ;
**rootDir**: define a localização raiz dos arquivos do projeto;
**outDir**: define a pasta onde ficará nosso código compilado;
**esModuleInterop**: habilitamos essa opção para ser possível compilar módulos ES6 para módulos CommonJS;
**strict**: habilitamos essa opção para ativar a verificação estrita de tipo.

Agora vamos instalar como dependência de desenvolvimento o pacote npm de declarações de tipos para os módulos padrões do Node.

**npm install -D @types/node**

### **Mas o que são declarações de tipos?**

Arquivos que descrevem tipos de várias APIs JavaScript para o compilador TypeScript . Em seu projeto, você definirá seus próprios tipos, mas também precisará de tipos para módulos padrão do Node ou diferentes pacotes externos que usará, como o Express .

Esses arquivos são módulos que não possuem nenhuma implementação de código, mas servem como uma camada que descreve a implementação JavaScript por trás dele através de tipos.

Por último vamos instalar o ts-node-dev , que é um pacote de utilitários que vai nos ajudar a executar o servidor de desenvolvimento, escrito em TypeScript , diretamente no terminal, sem necessidade de compilarmos o código em JavaScript , além de reiniciar o servidor a cada alteração que fizermos, sem a necessidade de encerrarmos o processo e o iniciarmos novamente.

**npm install -D ts-node-dev**

É muito importante entendermos o porquê da instalação de cada um desses pacotes. Já nas nossas próximas configurações de projetos Node + TypesCript , podemos fazer todas as instalações em único comando:

**npm install -D typescript @types/node ts-node-dev**