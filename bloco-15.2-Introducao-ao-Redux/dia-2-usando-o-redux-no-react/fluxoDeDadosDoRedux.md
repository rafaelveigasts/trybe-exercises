Fluxo de dados no Redux
O gif abaixo resume todas partes e como elas se comunicam para funcionamento do Redux com React. Basicamente, segue-se os seguintes passos:
Um Store é criado para armazenar todos o estado da aplicação;
O Store é disponibilizado através do Provider para todos os componentes da aplicação;
Os componentes usam o connect para conectarem-se ao Store ;
As pessoas que utilizam a aplicação interagem com ela e disparam eventos;
Estes eventos têm o nome de Actions e são enviadas ao Store através de um dispatch ;
Os Reducers recebem essas Actions e alteram o estado da aplicação (criando um novo estado) e salvando no Store ;
Os componentes conectados ao Store "ouvem" estas mudanças e atualizam a View (visualização).

Checklist react-redux: Passo a passo para guardar no coração e colar na parede
npx create-react-app my-app-redux;
npm install --save redux react-redux;
npm install.
Criar dentro do diretório src:
diretório actions;
diretório reducers;
diretório store.
Criar dentro do diretório actions:
arquivo index.js.
Criar dentro do diretório reducers:
arquivo index.js.
Criar dentro do diretório store:
arquivo index.js.
Em src/index.js:
definir o Provider, <Provider store={ store }> , para fornecer os estados à todos os componentes encapsulados em <App /> .
Se a sua aplicação não terá outras páginas, não é necessário configurar as rotas. Caso contrário:
npm install react-router-dom;
Em src/index.js:
definir o BrowserRouter, <BrowserRouter> .
No arquivo App.js:
definir o Switch, <Switch> ;
definir a Route, <Route> .
O BrowserRouter, o Switch e a Route são três componentes essenciais para trabalhar rotas em React.
Caso necessário:
criar o diretório components;
criar o diretório pages.
No arquivo store/index.js:
importar o rootReducer e criar a store;
configurar o Redux DevTools.
Na pasta reducers:
criar os reducers necessários;
configurar os exports do arquivo index.js.
Na pasta actions:
criar os actionTypes;
criar as actions necessárias.
Nos componentes:
criar a função mapStateToProps se necessário;
criar a função mapDispatchToProps se necessário;
fazer o connect se necessário.
#theend