import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoutImageUrl from '../../assets/thought.svg'

import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoutImageUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  },
};


/**
 * Tudo isso foi criado, para poder definir quais tipos o useSate estará esperando
 * Nesse caso, não vai ser string, ou number e sim o FeedbackType
 * Então, o useSate está esperando algo dessa tipagem que eu criei baseado no objeto feedbackTypes
 */

export type FeedbackType = keyof typeof feedbackTypes;
//type - criar um variável que armazena tipos
//typeof - retorna a tipagem de todos os elementos de feedbackTypes
//keyof - retorna apenas as chaves do objeto feedbackTypes

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  // Object.entries(feedbackTypes) =>
  /** [
  *   ['BUG', {...}]
  *   ['IDEA', {...}]
  *   ['THOUGHT', {...}]
  * ]
  */
  const [feedbackSent, setFeedbackSent] = useState(false)

  //função do btn de voltar
  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null)
  }

  return (

    //o md:, significa que o componente vai ter aquele estilo para telas do tamanho médio para cima
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSent ? ( //se o feedback for enviado, vai mostrar a tela de sucesso
      
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>

      ) : ( //se não, vai mostrar essa que é a tela inicial
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com 🤍 pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
      </footer>


    </div>
  );
}