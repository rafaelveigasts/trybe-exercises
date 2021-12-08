## Tabela vazia ? Vamos resolver isso ae! INSERT na prática

### Informação importante sobre os tipos de aspas

Backticks ou crase ( `` ) : São usadas para identificar nome de tabelas e colunas . São necessárias apenas quando o identificador for uma palavra reservada do MySQL , ou quando o nome da tabela ou coluna contiver espaços em branco.

Aspas simples ( '' ) : Devem ser usadas em valores do tipo string . Aspas simples são aceitas na maioria dos sistemas de gerenciamento de banco de dados. Sendo assim, é preferível usar aspas simples no lugar das aspas duplas.

Só usaremos os backticks aqui nos exemplos caso sejam absolutamente necessários. Caso contrário, eles serão omitidos.

Vamos começar a dar vida ao banco sakila . Uma pesquisa rápida na tabela sakila.staff nos informa de que a empresa possui apenas dois funcionários. Acho que ela pode contar com nossa ajuda para melhorar isso. A sintaxe para inserir dados em uma tabela é a seguinte:

insert into nome_da_tabela (coluna1, coluna2)
values('valor_coluna1', 'valor_coluna2');

Isso vai inserir uma linha na tabela nome_da_tabela os valores em suas colunas correspondentes. Apesar de ser possível inserir novos valores sem especificar os nomes das colunas, é uma boa prática sempre especificá-los porque:

Caso a estrutura da tabela tenha mudado enquanto se escreve a query , você será alertado.

Melhora a compreensão para quem estiver lendo sua query futuramente.

## Inserindo várias linhas de uma vez

É possível inserir múltiplas linhas em uma tabela com uma única query :

insert into nome_da_tabel(coluna1, coluna2)
values ('valor1', 'valor2'),
('valor3', 'valor4'),
('valor5', 'valor6'),
('valor7', 'valor8');

Dessa maneira, podemos ganhar muito tempo, tanto em tecladas como em performance de inserção. Em média, 100 linhas inseridas dessa maneira podem ser até 10 vezes mais rápidas que fazendo inserções de forma individual.

## Ignorando linhas existentes

Quando for importar uma quantidade grande de dados, pode ser preferível, em alguns cenários, que você simplesmente ignore os erros e pule os dados problemáticos, que normalmente interromperiam a query em função de alguma restrição imposta na tabela. Ex: duplicidade de primary keys . Podemos ignorar os erros durante a inserção usando o INSERT IGNORE .

Considere a tabela e a query a seguir:

<img src="SimpleTableData1.png" />

INSERT IGNORE INTO pessoas (id, name) VALUES
(4,'Gloria'), -- Sem o IGNORE, essa linha geraria um erro e o INSERT não continuaria.
(5,'Amanda');

-- Pesquisando agora, você verá que a informação duplicada não foi inserida.
-- Porém os dados corretos foram inseridos com sucesso.
SELECT * FROM pessoas;

<img src="SimpleTableData2.png" />

O importante aqui é lembrar que o INSERT IGNORE vai pular os outros erros silenciosamente também.

## Inserindo valores em colunas com auto_increment

Primeiramente, é preciso saber que o auto_increment é uma funcionalidade que todos os bancos de dados possuem. Ela permite que valores sejam gerados automaticamente cada vez que uma nova linha é inserida em uma tabela que tem essa restrição ativa. Ao inserir um novo ator na tabela sakila.actor , caso outros atores ainda não tenham sido inseridos desde que o banco foi restaurado, o próximo valor que será gerado para actor_id será o valor do último id registrado acrescido de um (201 + 1).

<img src="AutoIncrement.png" />

Com isso em mente, a coluna que possui auto_increment é omitida no INSERT , uma vez que o valor já é gerado automaticamente:

<img src ="SimpleTableData3.png" />

## INSERT SELECT (Inserindo dados de uma outra tabela)

É possível inserir dados a partir de outra tabela usando INSERT INTO SELECT :

INSERT INTO tabelaA (coluna1, coluna2)
    SELECT tabelaB.coluna1, tabelaB.coluna2
    FROM tabelaB
    WHERE tabelaB.nome_da_coluna <> 'algumValor'
    ORDER BY tabelaB.coluna_de_ordenacao;

Assim, estaríamos extraindo a coluna1 e a coluna2 da tabelaB e as inserindo na tabelaA , de acordo com a condição que for passada no WHERE .

É possível usar também SELECT * FROM e copiar todos os dados de todas as colunas de uma tabela para outra, mas nessa situação a tabelaA e a tabelaB precisam obrigatoriamente possuir a mesma quantidade de colunas, e os tipos de dados das colunas correspondentes devem ser iguais.

Com essa funcionalidade, é fácil criar tabelas temporárias para testes ou por necessidade. Por exemplo, para trazer os dados da tabela sakila.staff para a tabela sakila.actor , poderíamos fazer:

INSERT INTO sakila.actor (first_name, last_name)
    SELECT first_name, last_name FROM sakila.staff;

<img src="SimpleTableData4.png" />

Um grande filósofo uma vez disse: "Practice Makes Perfect" . Não sabemos quem ele é, mas ele tem razão! Vamos praticar!

Insira um novo funcionário na tabela sakila.staff .
Para saber quais campos são obrigatórios, clique com o botão direito na tabela sakila.staff e selecione "Table Inspector". Clique na aba "columns" e verifique quais campos aceitam nulos para te guiar. Lembre-se de que valores que são gerados automaticamente não precisam ser inseridos manualmente. Boa explorada!
Feito o exercício anterior, vamos agora para o nível 2. Insira dois funcionários novos em apenas uma query .
Selecione os cinco primeiros nomes e sobrenomes da tabela sakila.customer e cadastre essas pessoas como atores na tabela sakila.actor .
Cadastre três categorias de uma vez só na tabela sakila.category .
Cadastre uma nova loja na tabela sakila.store .
