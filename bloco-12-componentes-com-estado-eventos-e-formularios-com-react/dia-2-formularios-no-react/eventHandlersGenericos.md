event handlers genéricos

Uma excelente forma de criarmos formulários 100% com componentes controlados é fazermos um event handler genérico, capaz de atualizar o estado de todos os componentes com a mesma lógica.

handleChange({ target }) {
  const { name } = target;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  this.setState({
    [name]: value,
  });
}

O truque é o seguinte:
Dê a cada elemento um nome que seja igual à respectiva chave no estado do componente
No handler, recupere a partir do parâmetro event o nome do componente que disparou o evento e o valor associado ao disparo.
Interpole o nome do componente como chave do estado numa sintaxe como a acima.
Para fixar
3 - Faça todos os seus elementos componentes do formulário ficarem 100% controlados. Faça um event handler genérico para lidar com eles.
4 - Acrescente no seu formulário um input do tipo checkbox e garanta que seu event handler esteja tratando este caso corretamente.
5 - Busque na documentação de React acerca de formulários (primeiro link da seção de Recursos Adicionais!) como se deve adicionar um input para arquivos . Acrescente um ao seu formulário.
6 - Encapsule alguns dos seus campos num fieldset . Entenda como ele funciona lendo a documentação .

<!-- referência de fieldset: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/fieldset -->