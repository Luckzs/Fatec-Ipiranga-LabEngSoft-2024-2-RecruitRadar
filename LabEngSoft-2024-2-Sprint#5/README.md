Versão do Aplicativo para SPRINT 5 - Entrega do MVP

Sendo uma Sprint destinada a entrega do Produto Minimo Viavel do nosso Projeto RecruitRadar

Nela foi disponibilizado o código fonte do projeto, o seminário destinado a essa sprint, simulando a apresentação para a banca, o plano de testes e a APK da nossa aplicação.

Também será enviado um arquivo de guia de conexão que seguimos ao longo do nosso desenvolvimento, caso seja necessário executar a aplicação de maneira local.

Mas a preferência é a execução do projeto através da APK.

Observações:
Algumas etapas iniciais da aplicação, podem levar certo tempo, devido as limitações presentes no local em que a api (backend) esta hospedado.
A versão gratuita do Azure, possui limitações de poder de processamento e a nosso projeto, possui em seu backend, operações que demandam deste processamento.
Em especifico etapas iniciais, pois o azure sempre remonta a imagem do backend, após algum tempo de ociosidade, levando certo em operações inicias como Login ou SignUp.




Caso seja necessário, estamos disponibilizando também maneiras de conexão local do projeto, que utilizamos principalmente para o desenvolvimento. Entretanto é recomendado executar a aplicação através da APK disponibilizada.
Sobre o docker temos nesta versão arquivos compose.yml na raiz do projeto e dockerfiles para caso seja necessário rodar a aplicação.
lembrando que o compose.yml executa a versão do backend apenas, para executar a versão de desenvolvimento do frontend é preciso rodar comandos na pasta /frontend demonstrados no arquivo de guia de conexão.
O modelo que auxilia o algoritmo não se encontra local neste repositorio devido o seu tamanho que excede espaço, mas já esta presente na imagem docker do sistema. Mas caso tenha interesse em baixar o modelo e rodar localmente na maquina, veja mais detalhes no readme present em backend/src/database/pyscripts/modelos.
E Para viés de demonstração, nessa sprint também estamos disponibilizamos os arquivos .env para rodar o projeto de maneira local.