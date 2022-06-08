## Adapter

Mantendo-se na situação abordada anteriormente, sua equipe ficou sabendo de um novo desafio e você agilmente foi acompanhar a nova demanda:

O problema agora é outro: a ferramenta que compramos tem uma API pronta pra integrar no nosso sistema, só que a interface é muito diferente da nossa. Ela exporta uma lista de cabeçalhos e uma lista de valores, não é como a nossa que já monta os dicionários direitinho... 😵

Como resposta, uma pessoa colega de time acrescenta:

Vai dar MUITO trabalho utilizar essa ferramenta... Vamos ter que parar tudo para adaptar o nosso sistema a esse formato! Ou pior, vamos ter que REIMPLEMENTAR a api que eles oferecem... 😳 Quem poderá nos ajudar?

E aí você se lembra do Padrão Adapter.

Ao analisar os códigos do sistema, já deparamos com um exemplo de classe que analisa o relatório e realiza um cálculo de média. Nota-se que o método average() espera que o retorno de load_data() contenha estruturas dict.

class ReportAnalyzer:
    def __init__(self, loader):
        self.loader = loader

    def average(self):
        # este é um dos métodos que espera uma lista de dicionários
        data = self.loader.load_data()
        # aqui ela soma o valor na chave final_price em cada item da lista
        total = sum(order['final_price'] for order in data)
        return total / len(data)

Pelo que foi comentado na reunião, a nova ferramenta (gerenciator3000) não retorna uma estrutura com dicionários, o que é comprovado ao realizar os print de seu retorno:

from gerenciator3000 import ReportLoader

loader = ReportLoader()
print(loader.headers)   ##  ['id', 'date', ..., 'final_price']
print(loader.rows[0])  ##  [1337, '2020-11-20', ..., 2350.5]

O que você faria para aproveitar os dados e fazer o relatório?

A meta é evitar reescrever o ReportAnalyzer, ou mesmo o gerenciator3000.ReportLoader, de funcionamento desconhecido.

O time decidiu fazer uma classe responsável por "traduzir" esses dados do formato da ferramenta para o formato do sistema utilizado pela companhia. Essa classe poderá ser acoplada na ferramenta de relatórios. Tem-se então uma adaptação eficiente:

class G3000LoaderAdapter:
    # aqui o loader é uma instancia do gerenciator3000.ReportLoader original
    def __init__(self, loader):
        self.loader = loader

    def load_data(self):

        # Em python, o zip() junta uma lista de chaves em uma lista de valores
        # e cria um dicionário! por exemplo:
        # zip(['nome', 'idade'], ['Juliana', 27])
        # {'nome': 'Juliana', 'idade': 27}

        return [zip(loader.headers, row) for row in loader.rows]

Feito! Foi utilizado outro padrão, o Adapter. Ele permite converter a interface de uma classe em outra interface, esperada pelo cliente (isto é, o código que usa a classe em questão). O Adapter permite que interfaces incompatíveis trabalhem em conjunto — o que, de outra forma, seria impossível.

Veja só como fica o código que vai utilizá-lo:

from gerenciator3000 import ReportLoader
from project.loaders import G3000LoaderAdapter
from project.analyzer import ReporterAnalyzer

# o loader da ferramenta é carregado do jeito que a ferramenta recomenda
g3000_loader = ReportLoader(...)
# o adaptador recebe o loader da ferramenta
loader = G3000LoaderAdapter(g3000_loader)
# o analyzer do nosso sistema recebe o adaptador como qualquer outro loader
analyzer = ReportAnalyzer(loader)

analyzer.average() # Agora funcionará

A aplicação aumenta em complexidade como consequência, pois estamos adicionando novas interfaces e classes. Porém, o desacoplamento entre o código do cliente (ReporterAnalyzer) e o objeto adaptado (ReportLoader) se mantém. Mudanças no objeto adaptado refletem apenas no adaptador (G3000LoaderAdapter) e não no código cliente, então nenhuma lógica existente é alterada para adicionar a funcionalidade. É possível ainda substituir o serviço adaptado através da criação de novos adaptadores.

### Para finalizar

Classes se comunicam através de troca de mensagens. Entretanto, nem sempre isso é possível de se fazer diretamente: às vezes há uma incompatibilidade entre as classes (como uma classe esperar texto .CSV e outra só enviar .JSON), seja devido a um código legado ou mesmo contextos distintos.

Imagem de um tênis em uma sacola que está pendurada num varal com pregadores

O saco adapta a interface do pregador de roupa para a interface incompatível do tênis

Quando as mensagens que as classes utilizam para se comunicar estão em "interfaces distintas", não podemos simplesmente mudar a interface. Isso iria quebrar todos os outros lugares em que esta classe é utilizada! Usar uma terceira entidade, que faz a "tradução", é normalmente a saída mais organizada e indicada.

Exercícios de fixação

Olhe ao seu redor e tente identificar objetos que fazem o papel de um Adapter, ou seja, um objeto necessário para que duas outras coisas funcionem juntas e que não funcionariam juntas sem este adaptador. 🤔