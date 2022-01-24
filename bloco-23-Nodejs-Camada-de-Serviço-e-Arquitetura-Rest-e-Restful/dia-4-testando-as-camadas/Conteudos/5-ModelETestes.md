## Model e testes

Começaremos testando a camada de model , pensando de maneira sequencial, essa camada fica em uma das pontas da arquitetura e, por isso, iniciaremos por ela. Entretanto, é importante termos em mente que por se tratar de testes unitários, estaremos testando uma unidade específica do código isolado, sendo assim, poderíamos iniciar por qualquer parte.

Seguindo o TDD, o primeiro passo é escrevermos os casos de testes. Para isso, precisamos nos perguntar o que iremos testar, ou seja, qual a responsabilidade que queremos garantir que está sendo realizada.

Relembrando o papel do model , ele é responsável pela estrutura dos dados e seu armazenamento, por exemplo, responsável pela comunicação com o banco de dados e pelo mapeamento das entidades.

Sendo assim, iremos testar se essa comunicação com o BD e suas operações de escrita e leitura estão sendo realizadas da maneira correta.
