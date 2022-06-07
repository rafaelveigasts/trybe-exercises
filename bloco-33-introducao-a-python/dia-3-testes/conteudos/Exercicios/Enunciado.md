## Agora a prática

🚀 Se liga nesse foguete!
Os exercícios destacados com 🚀 são os fundamentais pra você ir bem no projeto!

Todos os exercícios vão contribuir com sua formação, mas fique de olho nesses! 👀

Vamos colocar tudo o que vimos até agora em prática. Em todos os exercícios, resolva os problemas com testes automatizados (ao menos 4 deles por exercício) e prevenindo possíveis erros na entrada de dados e na execução do programa.

🚀 Exercício 1: Escreva um programa que retorne uma lista com os valores numéricos de 1 a N, mas com as seguintes exceções:
Números divisíveis por 3 deve aparecer como "Fizz" ao invés do número;
Números divisíveis por 5 devem aparecer como "Buzz" ao invés do número;
Números divisíveis por 3 e 5 devem aparecer como "FizzBuzz" ao invés do número.
Exemplo: 3 -> [1, 2, "Fizz"].

Exercício 2: Em alguns lugares é comum lembrar um número do telefone associando seus dígitos a letras. Dessa maneira, a expressão MY LOVE significa 69 5683. Claro que existem alguns problemas, uma vez que alguns números de telefone não formam uma palavra ou uma frase, e os dígitos 1 e 0 não estão associados a nenhuma letra.

Sua tarefa é ler uma expressão e encontrar o número de telefone correspondente baseado na tabela abaixo. Uma expressão é composta por letras maiúsculas (A-Z), hifens (-) e os números 1 e 0.

Letras  ->  Número
ABC     ->  2
DEF     ->  3
GHI     ->  4
JKL     ->  5
MNO     ->  6
PQRS    ->  7
TUV     ->  8
WXYZ    ->  9
Exemplo de entrada:

1-HOME-SWEET-HOME
MY-MISERABLE-JOB
Saídas correspondentes:

1-4663-79338-4663
69-647372253-562

Curiosidade: A frase "The quick brown fox jumps over the lazy dog" é um pantograma (frase com sentido em que são usadas todas as letras do alfabeto de determinada língua) da língua inglesa.

Verifique casos como entrada maior que 30 caracteres, vazia e com caracteres inválidos.

🚀 Exercício 3 Faça uma função que valide um e-mail, lançando uma exceção quando o valor for inválido. Endereços de e-mail válidos devem seguir as seguintes regras:

Devem seguir o formato nomeusuario@nomewebsite.extensao;

O nome de usuário deve conter somente letras, dígitos, traços e underscores (_);

O nome de usuário deve iniciar com uma letra;
O nome do website deve conter somente letras e dígitos;
O tamanho máximo da extensão é de 3 caracteres.

🦜 As funções isalpha e isdigit podem ser utilizadas para verificar se uma letra ou palavra são compostas de somente caracteres ou dígitos. Exemplo: "1".isaplha() -> False , "a".isalpha() -> True.

Exercício 4 Baseado no exercício anterior, escreva uma função que, dado uma lista de emails, deve retornar somente os emails válidos. Caso uma exceção ocorra, apenas a escreva na tela.

Exemplo: ["nome@dominio.com", "errad#@dominio.com", "outro@dominio.com"] -> ["nome@dominio.com", "outro@dominio.com"].
