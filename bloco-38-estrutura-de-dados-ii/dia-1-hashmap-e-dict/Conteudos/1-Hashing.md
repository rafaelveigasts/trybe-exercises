## O que é hashing em computação

Para fazer a sua mágica, a hashmap utiliza um conceito muito popular em computação: hashing.

Hashing significa transformar um dado em uma representação numérica única. É atribuir um id para um determinado dado, mas diferente de um id sequencial, a composição do dado influencia diretamente no id gerado. Para isso, precisamos submeter o dado a alguma transformação matemática que considere a sua composição.

Um exemplo do uso de hashing é a verificação da integridade de downloads. Ao realizar um download, existe a chance desse dado ser corrompido ou até mesmo alterado maliciosamente. Como forma de verificar se a cópia que chegou até você é exatamente a mesma cópia que você tentou baixar, é possível comparar o resultado do hashing dos dois dados. Se forem iguais, o dado é igual. Senão, significa que algum detalhe desse dado está diferente. A operação matemática se chama hash function e o resultado da operação, no caso da verificação de integridade, é chamado de checksum (soma de verificação).

Por conferir essa segurança, o procedimento de hashing tem uso em criptografia, armazenamento de senhas e compressão de arquivos, por exemplo. Além disso, é usado na estrutura de dados hash map como forma de atribuir um endereço único para cada dado que se deseja armazenar. Nesse caso, vamos chamar o resultado da hash function de address (endereço).

Observação: Os procedimentos de hash utilizados nessa aula não são complexos o suficiente para serem utilizados em procedimentos de segurança. Busque conteúdo especializado caso tenha interesse no assunto.
