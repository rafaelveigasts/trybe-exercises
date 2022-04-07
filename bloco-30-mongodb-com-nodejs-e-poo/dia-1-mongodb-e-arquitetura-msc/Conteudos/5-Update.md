## Atualizando um documento

Em alguns bancos de dados, quando precisamos retornar os dados de um determinado documento que foi atualizado, precisamos fazer duas queries , uma para para fazer a atualização desejada e em seguida, uma busca pelo documento para retorná-lo.

No MongoDB isso não é necessário, pois ele conta com uma função específica que encontra o documento a ser atualizado, faz a atualização e já retona o documento que foi alterado. O método se chama findOneAndUpdate e é bem fácil de entender seu funcionamento.

Ele recebe dois argumentos, o primeiro é um filtro, o meio que você usará para identificar o documento que vai querer atualizar. É comum usarmos o campo id para isso por ser uma chave única, o que pode evitar que algum outro documento seja atualizado por engano. O segundo argumento é a atualização que você deseja fazer.

// models/BookModel.ts

// ...

  public async editBook(id: string, bookData: object): Promise<IBook | null> {
    const book = await this.bookModel.findOneAndUpdate(
      { _id: id },
      { ...bookData },
    );
    return book;
  }

// ...