## A camada dos Controllers

Na verdade, desde o primeiro dia que estudou Express, você já vem usando o principal componente de sua camada de controllers: Os middlewares .

Isso porque a camada dos controllers é a primeira camada numa API. É nela onde os dados da requisição serão recebidos e tratados, para depois serem passados para as próximas camadas.

O controller recebe as requisições e então consulta o service , enviando na resposta aquilo que o service retornar, que pode ser uma mensagem de erro, em caso de falha, ou as informações pedidas, em caso de sucesso.

Ao se comunicar com o service , o controller deve passar apenas as informações necessárias, sendo assim não é uma boa prática passar toda a request para o service , as informações devem ser extraídas e então apenas o que for necessário para determinada ação deve ser transferido.

Uma ótima analogia para o controller é que ele seria como um garçom em um restaurante. O garçom não sabe como preparar os pratos e nem como recepcionar as pessoas na porta. Ele apenas anota o pedido, sabe para que parte do restaurante levar o pedido e para qual mesa entregá-lo depois de pronto. Quando você monta seu software em uma camada só, é como se o garçom fizesse todas as funções dentro do seu restaurante (recepcionar, anotar os pedidos, preparar os pratos etc). É pedir pra dar confusão, não é?