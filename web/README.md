ca# Minhas Anotações das aulas

## Como funciona uma SPA
<p>SPA - Simples Page Aplication, é uma um "estilo" de programação, de uma página única, no qual o <code>index.html</code> renderiza tudo a partir de uma div, <code>Root</code></p>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```
<p>O html é gereado em tempo de execução do javascript, à partir do momento em que o usuário acessa a página</p>

## Tecnologias
- Vite(React)
- Tailwind CSS

### Destructuring (Desestruturação)
- É o ato de selecionar apenas um atributo do objeto (arrays também são objetos)

```js

const fruits = ["pera", "uva", "maçã"]

// Aqui na desestruturação de Array, ele pega por posições, ou seja não importa o que eu escreva dentro, ele vai pegar as posições
const [p,u,m] = fruits
console.log(p,u,m) //pera uva maça

//O ato de colocar vírgula vazia significa, que eu estou ignorando aquela posição 
const [primeiro,,ultimo] = fruits
console.log(primeiro, ultimo) //pera maça


//'...qualquercoisa' é uma operathor que serve para pegar o resto do array, no caso especifiquei só o primeiro item
//daí consigo mostrar de duas formar: o primeiro item(first) e o resto(...rest)
const [first, ...rest] = fruits
console.log(first)//pera
console.log(rest)//uva, maçã

```

```js
const Pessoa = {
  nome: 'Maxwell',
  idade: '18',
  sexo: 'Masculino',
}

const {idade} = Pessoa
console.log(idade) //18

const {sexo} = people
console.log(sexo) //undefined, porque o objeto people não existe

```



- Esse <code>export default</code> coloca para dizer que não importa onde faça a importação desse componente, nem o nome dado, vai ser sempre o <code>App</code>

```tsx
function App() {
  return <h1>Hello world!</h1>
}

export default App
```
- Isso não é muito bom porque pode ser que se perca na hora de nomear os componentes na expostação
ex: 

```tsx
import App from './App' //com o export default, você pode colocar qualquer nome ali depois de 'import', que ele vai funcionar 
```
- Indicado:
```tsx
export function App() {
  return <h1>Hello world!</h1>
}
```
- Assim, a importação só funciona se o componente tiver exatamente o nome da função
```tsx
import { App } from './App'
```

## Cararcterísticas do Componente
<p>O React sempre espera dentro do <code>return</code> um único elemento, que pode ser uma tag ou componente, ou seja, se o componente tiver mais de uma linha de código a função é escrita de dessa forma:</p>

```tsx
export function Buttons(){
  return( //sempre começa com parênteses e enolver tudo numa div, ou qualquer outra tag a nível de bloco(que tenha abertura e fechamento)
  <div> 
    <button>Salvar</button>
    <button>Enviar</button>
    <button>Excluir</button>
  </div>
  )
}
```
<p>O componente é obrigatório estar em letra maiúscula</p>
<p>Já que é xml com js, o React diferencia o que é uma tag html de um componete React, por conta disso, ja que os dois tem quase a mesma sintaxe</p>

```tsx
<Button /> //componente
//ou 
<Button></Button> //componente


<button></button> //tag html
```
## Propriedades
<p>Dentro do html a gente chama de atributo, ex: <code>< img src="" /></code> o <code>src</code> é um atributo da tag <code>img</code>, que diferencia uma imagem de outra</p>

<p>Todas as propriedades que a gente passa para o componente, ela vai como parâmetro para a função do componente</p>

```tsx
function App(){
  return(
    <div>
      <Button text="Salvar" />
      <Button text="Enviar" />
      <Button text="Excluir" />
    </div>
  )
}
```
```tsx
export function Button(props){ //props vem em forma de objeto
  console.log(props.text) //Salva, Enviar, Excluir

  return <button></button>
}
```
- Para fazer um componente chamar uma função que está no pai dele basta enviá-lo como propriedade

```tsx
//PAI
/** 
 * essa propriedade eu criei com qualquer nome, mas que faça sentido, e ela recebe uma função
 * essa função é la do useState()
*/
<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>   
```

```tsx
//FILHO (componente filho que usa alguma função que está no componente pai)

import { FeedbackType, feedbackTypes } from "../WidgetForm";

//essa interface é para definir o tipo dessa propriedade 'onFeedbackTypeChanged'
//ela é do tipo função, que foi importado ali em cima e retorna nada
interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;

}

//por meio da desestruturação, o parâmetro ficou asism:
// 'FeedbackTypeStep' tem como parâmetro a propriedade 'onFeedbackTypeChanged' do tipo 'FeedbackTypeStepProps'
export function FeedbackTypeStep({onFeedbackTypeChanged}: FeedbackTypeStepProps){
  return(
    <div>
        {Object.entries(feedbackTypes).map(([key, value]) =>{
          return (
            <button
            key={key}
            onClick={() => onFeedbackTypeChanged(key as FeedbackType)} // onFeedbackTypeChanged(key as FeedbackType) falando que a key sempre será baseado desse tipo
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        }
      )}
      </div>
  )
}
```
#### Desestruturação para pegar a propriedade diretamente

```tsx
export function Button({text}){
  console.log(text) //Salva, Enviar, Excluir

  return <button></button>
}
```
<p>Para colocar js dentro do html, no React precisa das chaves</p>
<p>Caso você queira mostrar o conteúdo da variável no botão</p>


```tsx
export function Button({text}){
  console.log(text) //Salva, Enviar, Excluir

  return <button>{text}</button>
}

//ou 

export function Button(props.text){
  console.log(props.text) //Salva, Enviar, Excluir

  return <button>{props.text}</button>
}
```

### TypeScript

- Sempre que você recebe parâmetros numa função,é preciso falar qual o formato daquele parâmetro

```tsx
interface ButtonProps{
  text: string;
}

export function Button(props: ButtonProps){

  return <button>{props.text}</button>
}
```
- A propriedade <code>text</code>, por conta do <code>interface</code> começou fazer parte obrigatória do componente <code>< Button /><code>

- Caso você utilize esse componente sem a propriedade <code>text</code>, vai acusar um erro que a propriedade está faltando

<p>Obs: Essa característica é do próprio TypeScript</p>

- Porém existe a propriedade opcional:

```tsx
interface ButtonProps{
  text?: string; //propriedade opcional
}

export function Button(props: ButtonProps){
  //caso na hora de de utilizar esse componente, não foi declarado nenhum 'text', vai mostrar 'textPadrão'
  //Ali pode colocar qualquer texto
  return <button>{props.text ?? 'textPadrão'}</button>
}
```

## Deploy
### variáveis ambiente
- são valores que precisam ser diferentes de acordo com cada ambiente da aplicação (desenvolvimento, produção)
- variáveis ambiente são importantes no frontend para configurar, exemplo, 'lib > api.ts', onde esta a conexão com o servidor
- o <a href="https://vitejs.dev/guide/env-and-mode.html#env-files">Vite</a> permite criar esses arquivos <code>.env</code> para essas variáveis ambiente e também permite criar arquivos específicos para cada ambiente
- (!Importante) esse arquivo .env.local não pode subir no github, ele tem que ser adicionado ao .gitignore

```.gitignore
# Env
.env.local
```
- Toda vez que trocar variáveis ambientes precisa restartar o servidor
- Como estamos usando o Vite, nas variáveis que queremos expostas, o nome da variável tem que começar com <code>VITE_</code>