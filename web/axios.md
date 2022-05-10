# CONECTANDO FRONT E BACK COM AXIOS

- O axios faz requisiçoes http para o backend

- Começar instalando a biblioteca axios <code>npm i axios</code>
- Criar pasta 'lib' com um arquivo 'api.ts' e importar o axios

- No arquivo FeedbackContebtStep.ts, tem a função function <code>handleSubmitFeedback()</code> que envia os arquivos
- nela estava dando apenas um console.log nos arquivos, porém agora com o axios, vai fazer uma requisição http

- Para ver se está tudo funcionando:
  - Abrir o <code>npx prisma studio</code>, no terminal do servidor, que vai abrir a tabela com o bd na web;
  - E fazer o processo de enviar o feedback no próprio site