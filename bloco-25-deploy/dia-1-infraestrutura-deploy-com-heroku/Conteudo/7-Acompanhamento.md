## Acompanhando sua aplicação

### Gerenciando seus apps

Após o deploy, seu serviço fica disponível em uma URL do Heroku, e o app pode ser gerenciado pelo CLI. Para listar os serviços que você tem em execução, utilize o comando apps :

**heroku apps**

Para ver os detalhes de um app específico, utilize o comando apps:info :

**heroku apps:info nome-do-seu-app-12345**

### Variáveis de ambiente

Caso o seu projeto possua variáveis de ambiente, você pode setá-las utilizando o comando config:set .

**heroku config:set TESTE="texto qualquer" --app** nome-do-seu-app-12345

Para listar as variáveis de ambiente, basta utilizar o comando config .

**heroku config --app nome-do-seu-app-12345**

### Logs

Para monitorar os logs dos apps , utilize logs :

**heroku logs --app nome-do-seu-app-12345**

Por padrão, o comando retorna as últimas 100 linhas de logs. Caso você queira mudar isso, utilize o parâmetro --num our -n :

**heroku logs -n 200 --app nome-do-seu-app-12345**

O parâmetro --tail ou -t abre uma seção para mostrar em tempo real os últimos logs. Para retornar ao prompt , basta executar Ctrl+C :

**heroku logs --tail --app nome-do-seu-app-12345**

### Removendo um app do Heroku

Anteriormente você viu como remover um remote para que ele não aponte mais para um app no Heroku. De maneira semelhante é possível remover também um app que você publicou lá. Para isto utilize o comando heroku destroy através da sintaxe:

**heroku destroy --app nome-do-app-12345 --confirm nome-do-app-12345**

Vamos remover o app meu-deploy-de-testes-29302 :

**heroku destroy --app meu-deploy-de-testes-29302 --confirm meu-deploy-de-testes-29302**
