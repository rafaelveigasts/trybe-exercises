const {expect} = require('chai');

/*
  Como ainda não temos a implementação, vamos fixar
  um objeto simulando os métodos que iremos desenvolver,
  porém, eles não terão nenhum comportamento
*/

const MoviesModel = {
  create: () => {}
}

describe('insere um novo filme no BD', () => {
  const payloadMovie = {
    title: 'Titulo do filme',
    directBy: 'Diretor do filme',
    releaseYear: 2020,
  }
  describe('quando é inserido com sucesso', () =>{
    it('retorna um objeto', async () => {
      const result = await MoviesModel.create(payloadMovie)
      expect(result).to.be.a('object')
    })
    it('tal objeto possui o "id" do novo filme cadastrado', async () => {
      expect(result).to.have.property('id')
    } )
  })
})