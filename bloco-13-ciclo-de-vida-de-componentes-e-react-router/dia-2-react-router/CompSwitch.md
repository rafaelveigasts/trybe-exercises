Componente Switch

O componente Switch é usado para encapsular um conjunto de rotas que você definiu via Route , conforme podemos observar na imagem abaixo:

Dada a URL atual da aplicação, o Switch procura de cima para baixo pelo primeiro Route que possuir correspondência entre seu caminho definido na prop path do componente e a URL atual da aplicação. Ou seja, se tivermos um Switch com as rotas abaixo:

<Switch>
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route path="/movies" component={Movies} />
  <Route path="/" component={Home} />
</Switch>

Ao mudarmos a URL da aplicação para que seu caminho seja /contact , somente o componente Contact será renderizado.
Todos os filhos de um Switch devem ser Route ou Redirect . Apenas o primeiro filho que corresponder ao local atual será renderizado. Se não houvesse o Switch mais de um componente poderia ser renderizado na mesma rota de forma errada.
Em uma comparação direta, é como o switch case do javascript :
É apenas uma comparação, não utilize o exemplo abaixo.

  switch (rota) {
    case '/about':
      return <About />;
    case '/contact':
      return <Contact />;
    case '/movies':
      return <Movies />;
    default:
      return <Home />
  }
