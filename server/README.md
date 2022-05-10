# O BACKEND DA APLICAÇÃO

- para iniciar o projeto node é basta ir no terminal e colocar 
<code>npm init -y</code>
<code>npm i typescript @types/node ts-node-dev -D</code>

- npm init -y: incializa o package.json, onde vai ficar a lista das dependências

- @type/node: serve para baixar o pacote de tipagens para o node

- ts-node-dev: serve como o nodemon só que para node com typescript, ele vai atualizando em tempo real para cada mudança que 
ocorre no projeto

- -D: escopo de desenvolvimentos


## ts config
- Para criar o arquivo ts config, basta colocar no terminal <code>npx tsc --init</code>
obs: 'tsc' é apenas um diminuitivo de 'typescript'

### definindo o target do tsconfig.json
- Como os browsers e o próprio node não sabem tsc, ele será convertido para uma versão de javascript quando for para o ambiente de produção

- o <code>target</code> é exatamente pra isso, deifinir qual versão do ecma script vai ser convertido

- para rodar no node, pode mudar para uma versão mais atual, tipo <code>"target": "es2020"</code>, isso faz com que o não precise converter para códigos desnecesário, ja que o node ja entende a sintax nova, isso ajuda no processo de compilação



### próximos passos (tsconfig.json)
- definir a pasta do <code>"rooDIR": "./"</code> nesse caso para <code>"rooDIR": "./src"</code>(linha 28)

### Diretório para onde os arquivos compilados vão aparecer
- <code>"outDIR": "./"</code> para <code>"outDIR": "./dist"</code>(linha 50)

- rodar no terminal <code>npx tsc</code>, daí vai criar o diretório
- sempre que colocar <code>npx tsc</code> no terminal, ele vai fazer a compilação

## Configurando o ts-node-dev
- no arquvio package.json, criar um novo script <code>"dev": "ts-node-dev src/server.ts"</code>
- ai para incializar é <code>npm run dev</code>


## Express
- Serve para trabalhar com as requisições http, a parte de rotas da aplicação

- <code> npm i express</code>
- para rodar o express com typescript, precisa baixar um pacote a parte para funcionar com o ts
- <code>npm i @types/express</code> para baixar esse pacote de tipagem do Express


## Bcakend + BD
- SQLite, para ambiente de desenvolvimento, pois é fácil de usar e cria m arquivo físico mesmo, não precisa criar setup nem nada.

- Prisma
<p>Ele é um ORM, facilita trabalhar com manipulação de banco de dados</p>
<p>Ao invés de usar queries ao bd como: Delete, Update, Select, Insert</p>
<p>utiliza cod javascript para fazer essas operações</p>
<p>Uma das vantagens de usar o prisma, é que facilita a troca do bd de MySQL para PostgreSQL etc.</p>

- Instalar o prisma como dependência de desenvolvimento <code>npm i prisma -D</code>
- e para ambiente de produção instalar <code>npm i @prisma/client</code>

### init
- incializar: <code>npx prisma init</code>
- vai criar um arquvico com variáveis de ambiente, são essas que mudam de acordo com o ambiente, o arquivo que configura isso é o .env
- mudar para <code>DATABASE_URL="file:./dev.db"</code>
- e mudar o provider para <code>"sqlite"</code>

### criar a tabela
- após todo o processo, ex: 
```prisma

model Feedback {
  //Colunas
  id String @id @default(uuid()) //primary key (!importante)

  type       String
  comment    String
  screenshot String? //opcional, ou seja, pode receber o valor nulo

  @@map("feedbacks")
}
```
- DESENVOLVIMENTO
- para criar a tabela no banco de dados:
no terminal: <code>npx prisma migrate dev</code> (!important, o 'dev' tem que declarar pq ele faz operações diferentes para ambiente de desenvolvimento)

- PRODUÇÃO
- para criar a tabela no banco de dados:
no terminal: <code>npx prisma migrate deploy</code> (!important, o 'deploy' tem que declarar pq ele faz operações diferentes para ambiente de produção)

### ver minhas tabelas
- no terminal: <code>npx prisma studio</code>
- vai abrir o navegador com as tabelas

- após isso, ele cria uma pasta chamada 'migrations', onde armazana as ações que eu fiz e consgio vercionar todas as alterações e desfazer, uma ação específica
- cria as migrations em ambiente de desenvolvimento e assim não precisa mexer com tabelas em produção as migrations fazem isso

## Insomnia
- serve para simular as requisições http, basta baixar, colocar o tipo de requisição (POST, GET, etc.) e colocar o endereço do localhost

- esse endereço e dado pelo arquivo que está rodando o express

```ts
import express from 'express';
const app = express();

app.use(express.json()); // para requisições em formato de json


app.listen(3333, () =>{
  console.log('server is runing')
});
```
- dai é só rodar no terminal <code>npm-run-dev</code>, que vai ficar observando cada mudança no arquivo

### Criar novo feedback
- Acessar o banco de dados, criando um arquivo <code>prisma.ts</code> na pasta <code>src</code> e dentro dele colocando assim:

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'] //para qualqure operação feita no bd, aparecer no log
});
```

- Daí, no arquivo "server", dentro da rota escolhida, importar o prisma, selecionar a tabela e o comando, ex:
```ts

app.post('/feedbacks', (req, res)=>{

  prisma.feedback.create({
    data:{
      type: req.body.type,
      comment: req.body.comment,
      screenshot: req.body.screenshot
    }
  })
})

```
- Desestruturando 
```ts
app.post('/feedbacks', (req, res)=>{

  const {type, comment, screenshot} = req.body

  prisma.feedback.create({
    data:{
      type,
      comment,
      screenshot
    }

  })
})
```

## Enviar por email o feedback

- instalar a bibliota pelo terminal <code>npm i nodemailer</code>
- instalar a bibliota pelo terminal com ts <code>npm is @types/nodemailer -D</code>

### Ferramenta de enviar emails
- logar no site <a href="http://mailtrap.io">mailtrap.io</a>, ele é tipo uma caixa de entrada para desenvolvimento
- criar um novo inbox e escolher a integration, nesse caso é o Nodemailer
- copiar o código de conexão
- depois de colar o código, após enviar o feedback
```ts
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Maxwell Alves <maxwellalves@gmail.com>',
    subject: 'novo feedback',

    //o html é o corpo do email
    //colocar cada linha do html como se fosse uma posição do array
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do Feedback: ${type}</p>`,
      `<p>Comntário: ${comment}</p>`,
      `</div>`,

    ].join('')
  })
```
- para enviar o email, só precisa clicar e fazer a requisição no insomnia (send)

--------------------------------------------------------
## Princípio SOLID backend

- dependências externas são o que o nosso cod não tem controle, ex:

Banco de dados, se ele cair ou sei la, o codigo vai ser afetado, mas o cod não tem controle sobre isso; 
Enviar email

- Para poder cuidar dessa coisas a gente cria interfaces (contratos como diz o POO), dentro dessas camadas que não temos o controle (bd e email)

### BD - pasta repositories
- criar uma pasta <code>repositories</code>
- criar um repositório para cada entidade

### prisma - pasta prisma
- criar a pasta <code>prisma</code> dentro da repositories
- criar arquivo, prisma-feedbacks-repository.ts


## pasta de funcionalidades - inversão de dependencias
- criar pasta no src <code>use-cases</code>
- no nome do arquivo, colocar a ação que ele faz mais um sufixo do nome da sua pasta, ex:
<code>submit-feedback-use-case.ts</code>

### O QUE ESTÁ ACONTECENDO??
 - Routes.ts
  - O SubmitFeedbackUseCase(), tem uma dependência, e passo para ele como parâmetro o prisma, ou seja, inversão de dependencias

## Serviços a parte (envio de emails, sms etc.)
- criar pasta <code>adapaters</code>
- criar um arquvivo .ts, com a nomenclatura parecida para criar a pasta de interfaces do bd

## Cors
- controle de segurança do backend, para que front ends inadequados acessem informações do back end
- <code>npm i cors</code>
- <code>npm i @types/cors -D</code>

- server.ts 

```ts
import cors from 'cors'

app.use(cors({
  origin: 'http://endereçodofrontend'
}))
```

# DEPLOY
- Usar o mesmo banco de dados tanto no desenvolvimento quanto em produção
- No tsconfig.json, lá no final na penúltima chave, colocar 

```json
  "include": ["src"] //para incluir apenas os arquivos que estão na pasta src
```
- Colcoar no .gitignore 'dist', porque essa pasta não vai para a produção

- Rodar o código no terminal, que cria a pasta 'dist' <code>npx tsc</code> 
  - Ela vai gerar os arquivos convertidos para js

- Criar o script no package.json:

```json
"build": "tsc", //esse build agora executa esse comando 'npx tsc'
"start": "node dist/server.js", // executa o servidor a partir da pasta 'dist' onde tem os arquivos em js
```
- Para rodar esses scripts:
 - No terminal
 <code>npm run build</code>
 <code>npm run start</code>

## Rawlay
- Deploy para projetos de qualquer tipo  