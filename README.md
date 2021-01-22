# Sitema de Sorteio de Amigo Secreto
## Back-end em Node.js e Front-end em ReactJS

É recomendado que o sistema seja operado por um usuário que não fará parte do sorteio, pois, ao final, será revelado o resultado do sorteio como confirmação da processo.

ATENÇÃO: A aplicação está preparada para execução somente em ambiente de desenvolvimento!

#

### Passo a passo para a execução:
- Ao fazer o clone do repositório, o usuário deve executar o comando **<code>yarn</code>** dentro das pastas backend e frontend para carregar os módulos do projeto

- No banco **PostgreSQL**, o usuário deve criar um banco de dados com o nome **<code>db_amigo_secreto</code>**

- O sistema está configurado para conectar utilizando o usuário **<code>postgres</code>** e senha **<code>postgres</code>** (*caso queira alterar isso, basta alterar os dados de conexão no arquivo ormconfig.json*)

- Para criar as tabelas do banco de dados, entre na pasta **frontend** e execute o comando **<code>yarn typeorm migration:run</code>**

- Para executar o backend, basta entrar na sua respectiva pasta e executar, no terminal, o comando **<code>yarn dev:server</code>**

- Para executar o front-end, basta entrar na sua respectiva pasta e executar, no terminal, o comando **<code>yarn start</code>**

- O site será carregado em seu navegador

- Assim, o usuário poderá fazer todas as operações de cadastro, edição e exclusão dos participantes do sorteio

- Ao fim, ao clicar no botão Sortear, será exibido o resultado ao final da página e os e-mails *fakes* serão enviados (**os links gerados para visualização dos e-mails serão disponibilizados na console do back-end**)

#

## Rotas da API

- **<code>GET /participants</code>** buscar todos os participantes cadastrados no banco de dados
- **<code>POST /participants</code>** cadastrar um participante enviando os atributos **<code>name</code>** e **<code>email</code>** no corpo da requisição
- **<code>PATCH /participants/:id</code>** atualizar um cadastro de um participante enviando os atributos **<code>name</code>** e **<code>email</code>** no corpo da requisição e **<code>id</code>** como parâmetro da rota
- **<code>DELETE /participants/:id</code>** deletar um cadastro de participante enviando **<code>id</code>** como parâmetro da rota
- **<code>POST /draw</code>** realizar o sorteio dos participantes cadastrados e fazer o envio de e-mail via Ethereal

#

## Exemplo da aplicação funcionando

<img src="https://imgur.com/5RmxUXl.gif">
<img src="https://imgur.com/MiepDiA.gif">
<img src="https://imgur.com/P2XWOU8.gif">
<img src="https://imgur.com/9ouUYsi.gif">
