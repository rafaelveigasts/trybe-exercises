Componente Redirect

Conforme o próprio nome diz, Redirect é um componente que permite ativamente levar quem usa a aplicação para diferentes locais dela. Um caso de uso bastante comum de Redirect é autenticação: a pessoa só pode acessar informações sensíveis (tipo conta bancária) de uma aplicação se ela já estiver autenticada; caso contrário, ela é redirecionada para uma página de login. Veja um exemplo de utilização abaixo:

  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Route exact path="/">
      {logado ? <Redirect to="/dashboard" /> : <Login />}
    </Route>
  </Switch>

Caso a aplicação tenha o caminho / será feita uma verificação na variável logado , no caso de true a página será redirecionada para o caminho /dashboard e então renderizará o componente Dashboard , caso contrário, renderizará o componente Login .
Dê sempre prioridade para a utilização de Redirect para redirecionar, uma vez que, ele é criado para isso.
Para que você tenha um pouco mais de contexto, observe a imagem abaixo que compara o Link e o Redirect :