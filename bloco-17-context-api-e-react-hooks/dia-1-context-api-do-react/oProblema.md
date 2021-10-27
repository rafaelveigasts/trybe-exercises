O problema

Antes de falarmos o que é Context API e como ela pode ser utilizada, vamos entender qual é sua motivação e que tipo de problema ela resolve.
Para começar, vamos imaginar uma hierarquia de componentes um tanto quanto lúdica, mas que serve aos nossos propósitos. Imagine que temos quatro componentes, representando uma família: GreatGrandfather , Grandmother , Father e Daughter . Como você deve imaginar, esses componentes representam, respectivamente, um bisavô, uma avó, um pai e uma filha de uma família. O bisavô deixou acumulada uma herança de R$ 1.000.000 e, atualmente, só sua neta (o componente Daughter ) está interessada em saber o valor da herança (OK, sabemos que na vida real as coisas provavelmente seriam bem diferentes 😬).

import React, { Component } from 'react';

class GreatGrandfather extends Component {
  state = {
    inheritance: 1000000,
  }

  render() {
    return (
      <Grandmother inheritance={this.state.inheritance} />
    );
  }
}

function Grandmother(props) {
  return (
    <Father inheritance={props.inheritance} />
  );
}

function Father(props) {
  return (
    <Daughter inheritance={props.inheritance} />
  );
}

function Daughter(props) {
  return (
    <div>
      <span>
        {`Tenho uma herança de R$ ${props.inheritance} que recebi do meu bisavô`}
      </span>
    </div>
  );
}