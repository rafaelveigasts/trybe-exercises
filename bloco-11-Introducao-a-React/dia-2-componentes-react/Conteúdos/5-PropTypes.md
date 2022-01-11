## PropTypes, checagem de tipos.

Agora você vai estudar outro importante fundamento do React : a checagem de tipos ! Imagine que você criou um componente reutilizável e que ele, para funcionar corretamente, precisa receber determinadas props de tipos específicos, caso contrário a aplicação quebrará. A checagem de tipos ajuda a previnir cenários como esse, pois verifica os tipos das props passadas para um componente durante o desenvolvimento e levanta um warning se algo não estiver como planejado. Como deve ter notado, essa verificação previne inúmeros erros, economizando muito tempo de desenvolvimento!
A melhor forma para compreender o uso dessa ferramenta é visualizar um exemplo prático e destrinchá-lo:

import React from 'react';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name} {this.props.lastName}</h1>);
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
  lastName: PropTypes.string,
};

export default Greeting;
O primeiro passo para utilizar o prop-types é importá-lo no componente:

    import PropTypes from 'prop-types';
Caso não tenha utilizado o create-react-app para preparar o aplicativo React , será necessário o download da depedência externa do PropTypes através do seguinte comando: npm install --save-dev prop-types .
Em seguida, para executarmos a checagem de tipos no componente Greeting , adicionamos a seguinte estrutura antes do export default :

    Greeting.propTypes = {
      name: PropTypes.string,
      lastName: PropTypes.string,
    };
É dentro dessa estrutura que ocorre a checagem das props . Basta pegarmos o nome da prop que queremos tipar , e usar a sintaxe de identificação apropriada para o caso. À primeira vista, pode parecer confuso, por isso vamos ao exemplo:
A primeira prop que queremos tipar é a name . Queremos ter certeza que ela sempre será uma prop do tipo string , caso ao contrário nossa aplicação pode quebrar . Para isso:

    ...
    name: PropTypes.string,
    ...
A outra prop que falta ser tipada , lastName , se encontra em uma situação bem semelhante à anterior. Então repetimos o processo, trocando apenas o nome da prop :

    ...
    name: PropTypes.string,
    lastName: PropTypes.string,
    ...
Agora podemos ter certeza que, caso o componente seja renderizado com alguma prop de tipo inválido, o console disparará um aviso , facilitando muito o processo de debugging .
E caso o nosso componente seja renderizado sem nenhum valor numa prop , ainda será disparado o aviso? Em casos como esse, no qual as props são essenciais para o bom funcionamento do componente, é importante acrescentar o .isRequired - inglês para "é obrigatório" - após a definição do tipo da prop :

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};
Desse modo, sempre que o componente for renderizado sem uma das props ou com alguma do tipo errado, um aviso será disparado.
Abaixo segue alguns dos principais validadores oferecidos pela PropTypes . Caso esteja revisitando o conteúdo e nenhum dos validadores abaixo consigam te ajudar, ou esteja apenas curioso para saber mais sobre outros validadores que a biblioteca oferece, acesse "React - PropTypes" na sessão de Recursos Adicionais .

MeuComponente.propTypes = {
  // Todos os validadores aqui são, por padrão, validadores opcionais.
  // Para torná-los obrigatórios basta adicionar .isRequired
  numeroObrigatório: PropTypes.number.isRequired,

  // Tipos básico do JS.
  stringOpcional: PropTypes.string,
  numeroOpcional: PropTypes.number,
  booleanoOpcional: PropTypes.bool,
  funcaoOpcional: PropTypes.func,
  objetoOpcional: PropTypes.object,
  arrayOpcional: PropTypes.array,

  // Um array de determinado tipo básico
  arrayDe: PropTypes.arrayOf(PropTypes.number),

  // Um objeto de determinado tipo básico
  objetoDe: PropTypes.objectOf(PropTypes.number),

  // Um objeto com forma específica
  objetoComForma: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),

  // Um objeto que não permite props extras
  objetoComFormatoRigoroso: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
    avaibility: PropTypes.bool,
  }),
};
