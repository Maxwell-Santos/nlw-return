## Anotações

### CSS Global

- Criar um arquivo css global e colocar isso`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

### Group
<p>Qualquer coisa que esteja dentro desse <code>group</code>,</p>
<p>Caso eu queira fazer alguma alteração no elemento filho com hover ou algum outro evento no elemento pai, bas fazer assim:</p>

```jsx
<button className="group">
  <span className="group-hover: "></span>
</button>
``` 
### Classes

- Da para estilizar via classes do tailwind, sem precisar usar o className

```css
body{
  @apply bg-zinc-800
}
```
- Quando precisar colocar uma cor que não esteja disponível de forma autmática pelo tailwind, ele permite que coloque a cor que quiser, desse jeito:

```css
body{
  @apply bg-[#09090A]
}
```
## Responsivo

<p>No tailwind, existe as pré difinições para o tamanho de tela, caso você queira fazer algo na responsividade</p>

```tsx
export function WidgetForm(){
  return(
    //o md:, signifca que o componente vai ter aquele estilo para telas do tamanho médio para cima
    //existem outros como: sm: , md:, lg:, xlg:
    <div className="w-[calc(100vw-2rem)] md:w-auto">
      Hello World
    </div>
  );
}
```
