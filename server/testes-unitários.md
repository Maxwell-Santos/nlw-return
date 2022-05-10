
## testes unitários e automatiados js
- instalar o jest <code>npm i jest -D</code>
- inicializar <code>npx jest --init</code>
 - typescript, também instalar <code>npm i ts-node -D</code>

### Configurando o Jest
- O que coverage reports: é um relatório que jest fala quantos arquivos ja foram testados e quantos não
- instalar o <a href="http://swc.rs">SWC</a> para transpilar o cod de typescript para javascript, o Jest só entende js
- instalar <code>npm i -D @swc/jest</code>
- mudar no jest.config.ts o <code>transform</code>, para

```ts
  transform: { //aui ele prepara para quais extensões ele irá fazer os testes (ts, js, tsx, jsx)
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
```
- criar na pasta use-cases, o arquivo de teste
- baixar a tipagem do Jest <code>npm i @types/jest -D</code>

## rodar o teste
<code>npm run test</code>

## para que serve
- o teste unitário, serve para testar o conteúdo daquela função, nada mais, nada menos

## spies | espiões:
- consegue dentro do teste saber se alguma função foi chamada