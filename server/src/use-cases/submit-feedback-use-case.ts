import { MailAdapter } from './../adapters/mail-adapter';
import { FeedbacksRepository } from './../repositories/feedbacks-repository';

// CAMADA DE APLICAÇÃO - lida com a regra de negócio da aplicação

interface SubmitFeedbackUseCaseRequest { //dados necessários para enviar um novo Feedback
  type: string;
  comment: string;
  screenshot?: string;

}

export class SubmitFeedbackUseCase {

  constructor( // princípio da inversão de depencdencias
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,

  ){}
  
  async execute(request: SubmitFeedbackUseCaseRequest ){
    const { type, comment, screenshot } = request;

    //caso de uso

    if(!type) { //type é obrigatório
      throw new Error("Type is required");
      
    }

    if(!comment) { //Comment é obrigatório
      throw new Error("comment is required");
      
    }

    //startWith('') não começa com
    if(screenshot && !screenshot.startsWith('data/image/png;base64')) {
      throw new Error('Invalid screenshot format.') //quando for rodar o teste vai dar uma falha, pois la enviou um formato de foto .jpg

    }
    //caso de uso

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}">` : ``,
        `</div>`,

      ].join('')

    })

  }
}
