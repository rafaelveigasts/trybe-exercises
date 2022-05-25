## Estruturas condicionais

Vamos imaginar a seguinte situação: em uma análise de dados sobre pessoas desenvolvedoras, temos uma base de dados que contém o salário delas, mas não mostra a informação sobre sua senioridade.
Para fazer um agrupamento por essa classificação de nível de experiência, precisamos criar uma nova coluna que será baseada no salário:

Menor que "R$2.000,00", pessoa desenvolvedora estagiária;
Entre R$2.000,00 e R$5.800,00, pessoa desenvolvedora júnior;
Entre R$5.800,00 e R$7.500,00, pessoa desenvolvedora pleno;
Entre R$7.500,00 e R$10.500,00, pessoa desenvolvedora sênior;
Qualquer valor acima do que já foi mencionado a pessoa desenvolvedora é considerada liderança.

position = ""
if salary <= 2000:
    position = "estagiário"
elif 2000 < salary <= 5800:
    position = "júnior"
elif 5800 < salary <= 7500:
    position = "pleno"
elif 7500 < salary <= 10500:
    position = "senior"
else:
    position = "líder"

nota aí ✏️: A indentação do código deve ser feita com 4 espaços em vez de tabs.

Você pode estar se perguntando: "Não está faltando alguma coisa nessa estrutura?"🤔

Resposta: Note que if e elif são seguidos de uma expressão que se avaliada como verdadeira, o trecho de código será executado. Um outro detalhe é a ausência de chaves para definir o bloco. Utilizamos o caractere : para indicar abertura de um bloco e somente indentação para indicar o término.

⚠️ Aviso: O bloco else será executado se nenhuma das condições anteriores for satisfeita.
Agora que escrevemos mais linhas, notamos também a ausência do caractere ;. Pois bem, a filosofia da linguagem Python nos diz: "Legibilidade conta...", então com isso não precisamos mais desse caractere.

Com a senioridade em mãos, podemos criar uma nova coluna em nossa base dados com essa informação e realizar o agrupamento por cargo, desenhando lindos gráficos. 📊

Você pode estar se perguntando: "Posso modificar para uma estrutura switch?" Resposta: A estrutura condicional if e seu aninhamento com elif e else é tão simples e legível que não precisamos da estrutura switch.

De olho na dica👀:"Simples é melhor do que complexo" - Zen do python

Em alguns casos, em que não seja prejudicada a legibilidade, podemos criar estruturas de mapeamento (dicts) para simplificar o aninhamento de condicionais. Como o exemplo a seguir:

key = "id"
from_to = {
    "id": "identifier",
    "mail": "email",
    "lastName": "last_name",
}
from_to[key]