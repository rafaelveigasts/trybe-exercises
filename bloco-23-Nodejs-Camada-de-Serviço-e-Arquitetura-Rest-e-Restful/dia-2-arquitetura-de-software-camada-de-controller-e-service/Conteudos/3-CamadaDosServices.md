## A camada dos Services

Até agora, temos dito que regras de negócio ficam no modelo. E isso é verdade em outros padrões arquiteturais.

Mas é comum que, à medida que projetos vão crescendo, os modelos vão ficando cada vez maiores e mais complexos, pois vão acumulando cada vez mais regras de negócio.

Por isso, é comum vermos uma nova camada sendo adicionada em projetos que exigem uma lógica de negócio um pouco mais complexa e, principalmente, em APIs.

Essa camada é a Camada dos Services . Ela fica situada entre as camadas de controller e model e é responsável pela nossa lógica de negócio. O modelo, então, passa a ser responsável somente pelo acesso a dados.

Você pode ver isso de outra forma: para evitar que o modelo fique grande demais, ele é quebrado em duas outras camadas, cada uma com parte da responsabilidade.

Pense nessa camada como o chef da cozinha do nosso restaurante. Ele é quem sabe as receitas e delega as funções para os funcionários depois de receber o pedido do garçom.

Uma boa camada de serviço:

- Deve centralizar acesso a dados e funções externas. Exemplo: chamar um evento que dispara uma mensagem no Slack;

- Deve abstrair lógica de negócio complexa do seu modelo;

- Não deve ter nenhum tipo de informação sobre o acesso a camada de dados. Exemplo: não ter nenhuma query SQL;

- Não deve receber nada relacionado ao HTTP, seja o request ou o response . O controller deve mandar apenas o necessário para o service .
