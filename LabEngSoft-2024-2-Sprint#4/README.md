Versão do Aplicativo para SPRINT 4

Tratando principalmente do caso de uso : Recomendar Vagas e Dar Match com a vaga

Sendo uma Sprint com casos de uso principais ao negócio.

Além disso se deu o inicio da implementação da estrutura de homologação, ja portando a imagem para o azure repositories e a criação do banco de dados na nuvem (azure database postgres) junto com o web app da azure também. Sendo uma preparação para a sprint 5.

Sobre o docker local temos nesta versão arquivos compose.yml e dockerfiles para caso seja necessário rodar a aplicação, sendo que esta rodando apenas a imagem do backend, pois agora a organização do banco de dados se encontra na nuvem.
Para rodar o frontend de maneira local, abra o terminal na pasta frontend, digite yarn , espere a instalação dos pacotes, depois digite yarn startDevelopment

obs: nessa sprint estamos disponibilizamos os arquivos .env, para facilitar configurações, mas não é a intenção final disponibilizar estes arquivos
