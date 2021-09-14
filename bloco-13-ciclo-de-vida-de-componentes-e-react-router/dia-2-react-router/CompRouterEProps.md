Componentes Route com passagem de props

Assista a este vídeo, que fala a respeito de como fazer uso de parâmetros de URL em componentes do tipo Route :

Vamos recapitular o que você aprendeu até aqui:

No que diz respeito ao componente Route , você pode associar um componente com o caminho da URL via children , component ou render ;

Faz-se uso da prop component de Route quando não é necessário passar informações adicionais via props para o componente a ser mapeado. Ou seja, se você tem um componente About que não precisa de props setadas para ser chamado, e você precisa mapeá-lo para o caminho de URL /about , você poderia criar uma rota da seguinte forma: <Route path="/about" component={About} /> ;

Já a prop render de Route é usada quando é necessário passar informações adicionais via props para o componente a ser mapeado. Ou seja, se você tem um componente Movies que precisa receber uma lista de filmes via props movies , e você precisa mapeá-lo para o caminho de URL /movies , você poderia criar uma rota da seguinte forma: <Route path="/movies" render={(props) => <Movies {...props} movies={['Cars', 'Toy Story', 'The Hobbit']} />} /> ;

Tanto component quanto render permitem que você tenha acesso a informações de rota ( match , location e history ) via props do componente que você está mapeando. Ou seja, se você tem a rota <Route path="/about" component={About} /> , About terá match , location e history setadas via props.
