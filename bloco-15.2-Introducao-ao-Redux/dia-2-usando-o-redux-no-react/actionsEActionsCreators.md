actions e action creators

Como dito anterioremente, nossa action , por convenção, deve ser um objeto. Esse objeto pode possuir apenas a key type ou mais outras keys, caso seja conveniente. Note que, no caso abaixo, criamos também uma key state , que guardará o valor recebido pela action.

A action possui sempre uma propriedade type única. Essa propriedade é utilizada pelo Redux para identificar a ação que será realizada, esse conceito recebe o nome de action type .

export const newAction = (state) => ({ type: 'NEW_ACTION', state });

Acabamos de falar que actions são objetos simples em javascript, então porque criamos funções?
Chamadas de action creators , essas funções apenas criam e retornam uma action. Utilizamos as action creators porque nos trazem alguns benefícios em códigos mais complexos. Imagine ter que escrever esse objeto no seu código sempre que precisar enviar uma ação para o reducer , estaríamos tendo um trabalho repetitivo desnecessário, outra vantagem é que dessa forma também padronizamos a ação, evitando possíveis erros caso ela seja utilizada várias vezes.

Para fixar

Acesse a branch exercise-3 para praticar a criação de uma action. Você deverá visualizar o diretório missing_actions, essa é a nossa aplicação react-redux que precisará da implementação da action . Siga o passo a passo do arquivo README.md .

Para fixar

git checkout exercise-3

Pronto! Store , Reducer e actions devidamente criados. Essa é a estrutura pura do Redux. Se você chegou até aqui, você já está arrasando com react-redux! Agora, vamos conectar a estrutura ao React.
