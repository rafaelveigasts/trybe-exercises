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

Tente atualizar algum dos documentos por meio da rota '/books/:id'.

É essencial descomentar os trechos de código que referenciam este método no Service , no Controller e no routes .

Você reparou que o documento retornado é a versão antes da atualização feita? Se isso não é o que você quer, há uma forma de retornar a versão do documento com as atualizações recém aplicadas. Para isso, você precisará definir mais um argumento, o new , setando seu valor para true .

// models/BookModel.ts

// ...

//   public async editBook(id: string, bookData: object): Promise<IBook | null> {
//     const book = await this.bookModel.findOneAndUpdate(
//       { _id: id },
//       { ...bookData },
         { new: true },
//     );
//     return book;
//   }

// ...