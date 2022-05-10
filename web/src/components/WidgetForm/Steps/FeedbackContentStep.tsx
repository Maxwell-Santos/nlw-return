import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "..";
import { ArrowLeft } from "phosphor-react";
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps{
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void; //não recebe parâmetros e não tem retorno
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps){

  //string caso a foto existe
  //null caso a foto não existe
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedbcak, setIsSendingFeedbcak] = useState(false)

  //Armazenando nessa varíável a constante do feedbackTypes
  //mas por conta do useSate la do index, ele só vai armazenar o que tiver no feedbackType
  //'feedbackType', é uma constante de estado que armazena qual o feedback escolhido pelo usuário, e o título (BUG, IDEA, OTHER)
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) { //parâmetro: serve para não acontecer o evento padrão de formulário, de recarregar a página

    event.preventDefault() //função que não deixa recarregar a página

    setIsSendingFeedbcak(true)
    //ali na rota eu coloca a mesma que criei no backend
    await api.post('/feedbacks', {
      //colocar os dados que ela espera
      type: feedbackType,
      comment,
      screenshot
    });
    
    setIsSendingFeedbcak(false) //como é uma função asíncrona, o codigo só vai passar do await, quando terminar de enviar, daí nesse meio tempo essa fn setIsSendingFeedback(), vai entrar numa estado de true, enquanto nesse estado, vou estilizar o botão de enviar tipo 'carregando'. 

    onFeedbackSent();
  }
  return (
    <>
      <header>
        <button 
        type="button" 
        className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 "
        onClick={onFeedbackRestartRequested}>
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='h-6 w-6' />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
        className=" form-textarea min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 outline-none focus:ring-brand-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
        placeholder="Conte com detalhes o que está acontecendo..."
        onChange={event => setComment(event.target.value)} //sempre que o valor da textare mudar
        //event.target.value, serve para pegar o valor da area
        />

        <footer className="flex gap-2 mt-2"> 
         
         <ScreenshotButton 
         screenshot={screenshot} //ta recendo a foto
         onScreenshotTook={setScreenshot}/>

          <button
          type="submit"
          disabled={comment.length === 0 || isSendingFeedbcak} //se a variável que armazena o comentário, não tiver nada, vai ficar desabilitado o botão ou se o botão estiver enviando o feedback
          className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors capitalize disabled:opacity-50 disabled:pointer-events-none">
            {isSendingFeedbcak ? <Loading /> : 'enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}