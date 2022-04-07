## Deletando um documento

De forma bem similar ao que fizemos há pouco para atualizar um documento, para deletar um documento também temos a praticidade de conseguir excluí-lo da collection e mesmo assim retornar o que acabou se ser deletado, com o método findOneAndDelete .

Quanto ao funcionamento, ele é ainda mais simples que o método anterior, pois pode ser utilizado passando apenas um parâmetro: a referência do documento que se quer deletar, aqui também usaremos o id .

// models/BookModel.ts

// ...

  public async deleteBook(id: string): Promise<IBook | null> {
    const book = await this.bookModel.findOneAndDelete({ _id: id });
    return book;
  }

// ...

Para que funcione corretamente, os trechos de código que referenciam este método no Service , no Controller e no routes não podem estar comentados.

Prontinho, agora já temos nossa aplicação funcionando perfeitamente, executando todas as funções que fazia anteriormente, mas agora utilizando o MongoDB como banco de dados.
