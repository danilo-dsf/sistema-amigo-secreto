# Sitema de Sorteio de Amigo Secreto
## Back-end em Node.js e Front-end em ReactJS

É recomendado que o sistema seja operado por um usuário que não fará parte do sorteio, pois, ao final, será revelado o resultado do sorteio como confirmação da processo.

ATENÇÃO: A aplicação está preparada para execução somente em ambiente de desenvolvimento!

#

### Passo a passo para a execução:
- Ao fazer o clone do repositório, o usuário deve executar o comando **<code>yarn</code>** dentro das pastas backend e frontend para carregar os módulos do projeto

- No banco **PostgreSQL**, o usuário deve criar um banco de dados com o nome **<code>db_amigo_secreto</code>**

- Para executar o backend, basta entrar na sua respectiva pasta e executar, no terminal, o comando **<code>yarn dev:server</code>**

- Para executar o front-end, basta entrar na sua respectiva pasta e executar, no terminal, o comando **<code>yarn start</code>**

- O site será carregado em seu navegador

- Assim, o usuário poderá fazer todas as operações de cadastro, edição e exclusão dos participantes do sorteio

- Ao fim, ao clicar no botão Sortear, será exibido o resultado ao final da página e os e-mails *fakes* serão enviados (**os links gerados para visualização dos e-mails serão disponibilizados na console do back-end**)