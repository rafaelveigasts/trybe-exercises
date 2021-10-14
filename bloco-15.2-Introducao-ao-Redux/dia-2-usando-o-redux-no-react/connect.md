connect

O método connect nos dá acesso a store do Redux. A sua estrutura se dá da seguinte forma: connect()() .

Nos primeiros parênteses, devem estar presentes os métodos nativos do Redux. No caso de utilizar somente o mapDispatchToProps , o primeiro parâmetro desses parênteses deverá ser null , já no caso de utilizar somente o mapStateToProps , que veremos logo a frente, o segundo parâmetro desses parênteses deverá ser null . Portanto, no caso de utilizar ambos mapStateToProps e mapDispatchToProps , essa é a sintaxe que o connect apresentará:

export default connect(mapStateToProps, mapDispatchToProps)(Component)

No segundo parênteses, colocamos o componente que deverá ser conectado.
Acesse a branch exercise-6 para praticar a criação do connect. Você deverá visualizar o diretório missing_connect, essa é a nossa aplicação react-redux que precisará da implementação do connect . Siga o passo a passo do arquivo README.md .
Para fixar

git checkout exercise-6

