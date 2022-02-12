
# ConfTerm

Trabalho de TCC do 3 IINF 2022 do Curso Técnico em Informática integrado ao ensino médio, Instituto Federal de Sergipe.

Composta por: 
* Web Api REST criada para dar suporte a um modulo web para sistema um sistema embarcado com determinação de índices de conforto térmico.   Tem OpenAPI e [instalacao no heroku](https://conf-term.herokuapp.com).   
* Pagina web com analise de dados e monitoramento de índices de conforto térmico.   

## Execução e instalação
Para uma experiência completa é necessário compreender o backend e frontend.   

### Backend
OBS: O projeto dentro de 'backend-refatoracao' era um teste de fatoração e não esta numa fase executável ainda.   


O projeto dentro de 'backend' pode ser publicado com docker ou executado localmente.   
É necessario ter a SDK do .NET 5 para executa o projeto instalada na maquina.
Também é necessário docker caso seja o escolhido.

* Docker: `docker build -f Dockerfile`
* Execução local: Va para a pasta 'backend\src\Api.ConfTerm.Presentation', então execute `dotnet run .`

### Frontend

O projeto dentro de 'fronend' só pode ser executado localmente.   
É necessário possuir as ferramentas yarn e nextjs instaladas na maquina para executar.

* Instale os pacotes com `yarn install`
* Execute com `yarn dev`
