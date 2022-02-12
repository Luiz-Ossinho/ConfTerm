
# ConfTerm

Trabalho de TCC do 3 IINF 2022 do Curso T�cnico em Inform�tica integrado ao ensino m�dio, Instituto Federal de Sergipe.

Composta por: 
* Web Api REST criada para dar suporte a um modulo web para sistema um sistema embarcado com determina��o de �ndices de conforto t�rmico.   Tem OpenAPI e [instalacao no heroku](https://conf-term.herokuapp.com).   
* Pagina web com analise de dados e monitoramento de �ndices de conforto t�rmico.   

## Execu��o e instala��o
Para uma experi�ncia completa � necess�rio compreender o backend e frontend.   

### Backend
OBS: O projeto dentro de 'backend-refatoracao' era um teste de fatora��o e n�o esta numa fase execut�vel ainda.   


O projeto dentro de 'backend' pode ser publicado com docker ou executado localmente.   
� necessario ter a SDK do .NET 5 para executa o projeto instalada na maquina.
Tamb�m � necess�rio docker caso seja o escolhido.

* Docker: `docker build -f Dockerfile`
* Execu��o local: Va para a pasta 'backend\src\Api.ConfTerm.Presentation', ent�o execute `dotnet run .`

### Frontend

O projeto dentro de 'fronend' s� pode ser executado localmente.   
� necess�rio possuir as ferramentas yarn e nextjs instaladas na maquina para executar.

* Instale os pacotes com `yarn install`
* Execute com `yarn dev`
