import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Loading } from '../Loading';


interface ScreenshotButtonProps{
  screenshot: string | null, //esse ou null serve para quando clicar no lixinho, apagar a img
  onScreenshotTook: (screenshot: string | null) => void //o null daqui é a mesma coisa
}
export function ScreenshotButton({ 
  screenshot, 
  onScreenshotTook 
}: ScreenshotButtonProps) {

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenchot() {
    setIsTakingScreenshot(true)
    //como parâmetro da função, escolho qual elemento quero tirar print 
    //a exclamação '!' serve para dizer que aquele elemento nunca vai ser nulo
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64Image = canvas.toDataURL('image/png')

    onScreenshotTook(base64Image);
    setIsTakingScreenshot(false);

  }

  if(screenshot) {
    return(
      <button
      type="button"
      className='p-1 rounded-md w-10 h-10 border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
      style={{ //uma chave para indicar que é código js e outra chave para indicar que é um objeto
        backgroundImage: `url(${screenshot})` //mostra a print tirada como fundo 
      }}

      onClick={() =>{onScreenshotTook(null)}}
      >
        <Trash weight='fill'/>
      </button>
    )
  }


  return (
    <button
    onClick={handleTakeScreenchot}
    type="button"
    className="bg-zinc-800 p-2 rounded-md border-trasparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
  >

    
    {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6 text-zinc-100" />}
  </button>
  );
}