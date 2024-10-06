Versão do Aplicativo para SPRINT 3

Tratando principalmente do caso de uso : Visualizar detalhes da Vaga

Sendo uma Sprint preparatória para os futuros passos do aplicativo, além de ajustes no frontend foram realizados ajustes no webscraping para melhorar a qualidade dos dados.

Além disso melhoramos nossas infraestrutura, portando a estrutura local de desenvolvimento para o docker e começamos a encapsular nossos serviços em containers do docker, facilitando a configuração para todos que forem desenvolver e futuramente para futuramente portar a aplicação para produção

Sobre o docker temos nesta versão arquivos compose.yml e dockerfiles para caso seja necessário rodar a aplicação.

lembrando que para rodar a container frontend é preciso colocar o ip local no arquivo compose.yml.

obs: nessa sprint estamos disponibilizamos os arquivos .env (tanto pra o docker quanto o backend), para facilitar configurações, mas não é a intenção final disponibilizar estes arquivos