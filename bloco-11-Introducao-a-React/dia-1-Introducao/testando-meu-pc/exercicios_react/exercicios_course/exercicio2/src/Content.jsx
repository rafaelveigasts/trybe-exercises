import React, { Component } from 'react'

const conteudos = [
  {
    conteudo: 'High Order Functions',
    bloco: 8,
    status: 'Aprendido'
  },
  {
    conteudo: 'Composicao de Componentes',
    bloco: 11,
    status: 'Aprendendo',
  },
  {
    conteudo: 'Composicao de Estados',
    bloco: 12,
    status: 'Aprenderei'
  },
  {
    conteudo: 'Redux',
    bloco: 16,
    status: 'Aprenderei'
  },
];

export default class Content extends Component {

  render() {
    return (
      <div>
        {conteudos.map((conteudo, index) => {
          return (
            <div key={index}>
              <h3>{`O conteúdo é: ${conteudo.conteudo}`}</h3>
              <p>Bloco: {conteudo.bloco}</p>
              <p>Status: {conteudo.status}</p>
            </div>
          )
        }
        )}
      </div>
    )
  }
}
