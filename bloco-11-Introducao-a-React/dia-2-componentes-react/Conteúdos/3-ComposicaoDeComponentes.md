## Composição de componentes

Confome dito anteriormente, componentes são utilizados para construir uma aplicação React. Mas como essa construção é feita? Em React, faz-se uso de composição de componentes .

Mas antes de nos aprofundarmos no assunto, vamos dar um passo para trás e refletir: de forma geral, o que é composição? São elementos ordenados de forma a constituir algo maior e mais complexo. São, por exemplo, as músicas em um álbum musical, as frutas em uma salada de frutas ou até mesmo os inputs , as labels e os buttons em um form . Como você já deve ter percebido, composições já fazem parte do nosso cotidiano e, com o uso do React , isso se tornará ainda mais comum.

Componentes React podem conter um ou mais componentes! Essa é uma funcionalidade muito importante do React , pois permite a reutilização e a redução do nível de complexidade de códigos.

Vamos refatorar o código abaixo para poder entender, na prática, sobre composição de componentes e seus benefícios. O código a seguir renderiza informações básicas sobre dois albuns do Coldplay .
// src/App.js
import React from 'react';

class App extends React.Component {
  render() {
    // Declaração do objeto contendo informações do album01
    const album01 = {
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Coldplay_-_Mylo_Xyloto.JPG/220px-Coldplay_-_Mylo_Xyloto.JPG',
      title: 'Mylo Xyloto',
      releaseDate: {
        year: '2011',
        month: '10',
        day: '24',
      },
      others: {
        recordCompany: 'Capitol, Parlophone',
        formats: 'CD, digital'
      }
    };

    // Declaração do objeto contendo informações do album02
    const album02 = {
      image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/5/5d/Coldplay_-_Ghost_Stories.jpg/220px-Coldplay_-_Ghost_Stories.jpg',
      title: 'Ghost Stories',
      releaseDate: {
        year: '2014',
        month: '05',
        day: '16',
      },
      others: {
        recordCompany: 'Parlophone',
        formats: 'CD, digital'
      }
    };

    // Retorno do que será renderizado
    return (
      <article>
        <section>
          <img src={ album01.image } alt={ album01.title } />
          <h2>{ album01.title }</h2>
          <p>Lançamento: { album01.releaseDate.year }</p>
          <p>Gravadora: { album01.others.recordCompany }</p>
          <p>Formatos: { album01.others.formats }</p>
        </section>
        <section>
          <img src={ album02.image } alt={ album02.title } />
          <h2>{ album02.title }</h2>
          <p>Lançamento: { album02.releaseDate.year }</p>
          <p>Gravadora: { album02.others.recordCompany }</p>
          <p>Formatos: { album02.others.formats }</p>
        </section>
      </article>
    );
  }
}

export default App;

Como você deve ter notado, o código, apesar de conter pouca lógica, está extenso . Ambas as sections , apesar de possuirem estruturas semelhantes , renderizam informações diferentes. Imagine o tamanho do código se tivéssemos cinco albuns. Ou dez? Percebe-se que, nesse contexto, a section é uma excelente candidata a ser transformada em um componente reutilizável , dando início à nossa refatoração. Para isso, vamos criar um novo arquivo, chamado Album.js , para armazenar o código das sections e adaptá-lo para fazer a leitura das props que iremos passar futuramente:


// /src/components/Album.js
import React from 'react';

class Album extends React.Component {
  render() {
    return (
      <section>
        <img src={ this.props.album.image } alt={ this.props.album.title } />
        <h2>{ this.props.album.title }</h2>
        <p>{ this.props.album.releaseDate.year }</p>
        <p>
          Lançamento:
          { `${ this.props.album.releaseDate.day }/${ this.props.album.releaseDate.month }/${ this.props.album.releaseDate.year }` }
        </p>
        <p>Gravadora: { this.props.album.others.recordCompany }</p>
        <p>Formatos: { this.props.album.others.formats }</p>
      </section>
    );
  }
}

export default Album;

Em seguida, vamos refatorar o App.js . Para substituirmos as sections pelo novo componente criado, temos que:
Importá-lo no arquivo App.js :

  // src/App.js
  import React from 'react';
  import Album from './components/Album'

Passar as props apropriadas:

  // src/App.js
   class App extends React.Component {
       ...
       render() {
         return (
           <div>
             <Album album={ album01 } />
             <Album album={ album02 } />
           </div>
         );
       }
   }
   ...

Desse modo, o componente App.js ficará assim:

// src/App.js
import React from 'react';
import Album from './components/Album'

class App extends React.Component {
  render() {
    const album01 = {
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Coldplay_-_Mylo_Xyloto.JPG/220px-Coldplay_-_Mylo_Xyloto.JPG',
      title: 'Mylo Xyloto',
      releaseDate: {
        year: '2011',
        month: '10',
        day: '24',
      },
      others: {
        recordCompany: 'Capitol, Parlophone',
        formats: 'CD, digital'
      }
    };

    const album02 = {
      image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/5/5d/Coldplay_-_Ghost_Stories.jpg/220px-Coldplay_-_Ghost_Stories.jpg',
      title: 'Ghost Stories',
      releaseDate: {
        year: '2014',
        month: '05',
        day: '16',
      },
      others: {
        recordCompany: 'Parlophone',
        formats: 'CD, digital'
      }
    };

    return (
      <div>
        <Album album={ album01 } />
        <Album album={ album02 } />
      </div>
    );
  }
}

export default App;

Veja como o código ficou mais limpo e melhor de ler. Aqui, o nosso componente App contém dois componentes Album . Isso é composição de componentes! Cada um desses componentes recebe um objeto diferente através da prop album . Importante notar que os dois componentes irmãos <Album /> , são, na realidade, o mesmo componente, porém reutilizados** com base nas props recebidas. Ou seja, apesar de serem o mesmo componente, renderizam informações diferentes, uma vez que recebem props diferentes.
À primeira vista, componentizar a aplicação em uma combinação de componentes React pode parecer um processo pesado e complexo. No entanto, conforme a aplicação cresce, ter à disposição uma gama de componentes reutilizáveis e de baixo nível de complexidade individual facilitará muito o trabalho!
Agora, vamos reforçar o que você acabou de aprender com este exemplo:

// arquivo Image.js
import React from 'react';

class Image extends React.Component {
  render() {
    return <img src={this.props.source} alt={this.props.alternativeText} />;
  }
}

export default Image;

// arquivo UserProfile.js
import React from 'react';
import Image from './Image';

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <p> {this.props.user.name} </p>
        <p> {this.props.user.email} </p>
        <Image source={this.props.user.avatar} alternativeText="User avatar" />
      </div>
    );
  }
}

export default UserProfile;

// arquivo App.js, criado pelo create-react-app, modificado
import React from 'react';
import './App.css';
import UserProfile from './UserProfile';

class App extends React.Component {
  render() {
    const joao = {
      id: 102,
      name: "João",
      email: "joao@gmail.com",
      avatar: "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png"
    };

    const amelia = {
      id: 77,
      name: "Amélia",
      email: "amelia@gmail.com",
      avatar: "https://cdn.pixabay.com/photo/2017/01/31/13/05/cameo-2023867_640.png"
    };

    return (
      <div className="App">
        <UserProfile user={joao} />
        <UserProfile user={amelia} />
      </div>
    );
  }
}

export default App;

Analisando o código acima, temos:
O componente App é composto por dois componentes UserProfile . Em outras palavras, o componente App é pai dos dois componentes UserProfile . Além disso, <UserProfile user={joao} /> e <UserProfile user={amelia} /> são componentes irmãos , e eles dois são filhos do componente App .
O componente UserProfile , por sua vez, possui um componente Image . Ou seja, UserProfile tem Image como filho.
Os dados são repassados de componente pai para componente(s) filho(s). Olhando para o código acima, o componente App , que é pai dos dois componentes UserProfile , passa para cada um de seus filhos um objeto com as informações de um perfil. O mesmo pode ser dito olhando para UserProfile , que passa para seu componente filho Image a origem de uma imagem.
Agora, realize este exercício de fixação:
Suponha que você abra uma aplicação React e se depare com os seguintes componentes:

// arquivo Order.js
import React from 'react';

class Order extends React.Component {
  render() {
    const { user, product, price } = this.props.order;

    return (
      <div className="order">
        <p> {user} bought {product} for {price.value} {price.currency} </p>
      </div>
    );
  }
}

export default Order;

// arquivo App.js, criado pelo create-react-app, modificado
import React from 'react';
import './App.css';
import Order from './Order';

class App extends React.Component {
  render() {
    const headphone = {
      id: 102,
      user: "cena@gmail.com",
      product: "Razer Headphone",
      price: {
        value: 99.99,
        currency: "dollars"
      }
    };

    const energyDrink = {
      id: 77,
      user: "cena@gmail.com",
      product: "Monster 500mL",
      price: {
        value: 9.99,
        currency: "dollars"
      }
    };

    return (
      <div className="App">
        <h1> Orders recently created </h1>
         {/*  adicione os componentes aqui */}
      </div>
    );
  }
}

export default App;

Caso você seja uma pessoa bem perceptiva, deve ter reparado que todos os nomes de componentes React são iniciados com letra maíuscula . É uma simples, porém importante, regra de sintaxe do React.
Essa norma de sintaxe se dá devido ao modo como o React diferencia tags do DOM dos componentes React : quando iniciados com letra minúscula, como <div /> e <input /> , serão tratadas como tags do DOM . Por sua vez, quando iniciados com letra maiúscula, como <Greeting /> , serão entendidos como componentes React .
Vamos agora ver um vídeo que recapitula a aula de ontem e passa por tudo que já vimos! Atenção: até a marca 9m40s o vídeo recapitula o conteúdo da aula anterior. Se não sentir necessidade de recapitular, pule para essa marca!

