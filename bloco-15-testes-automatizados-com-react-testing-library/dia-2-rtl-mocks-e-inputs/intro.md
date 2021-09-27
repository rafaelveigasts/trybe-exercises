O que vamos aprender?
Agora que você já aprendeu a usar as principais ferramentas que a react-testing-library oferece, vamos aprofundar em alguns casos mais avançados. Na aula de hoje você irá aprender mais sobre mocks e testes de inputs.

Você será capaz de:
Criar mocks de APIs utilizando fetch;
Testar inputs;

Por que isso é importante?
Ter uma boa cobertura de testes aumenta a confiabilidade da sua aplicação, o que significa que também teremos que testar formulários. Para manter uma boa cobertura de testes de maneira sustentável, também é necessário garantir que seus testes executem rápido. É aí que entram os mocks , que nos permitem evitar chamadas reais a APIs e transições CSS, por exemplo, que podem demorar muito e em alguns casos, como na falta de internet, não funcionar adequadamente durante os testes.

Antes de começar

Pra muita coisa poder funcionar você precisa colocar no seu src/setupTests.js essas linhas:
Copiar
// setupTests.js
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
Obs: Esta biblioteca serve para monitoramento de alterações no DOM da página.
