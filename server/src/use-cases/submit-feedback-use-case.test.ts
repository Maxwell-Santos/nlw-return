import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

//spies | espiões: 
const createFeedbackSpy = jest.fn(); // função espiã
const sendMailSpy = jest.fn(); // função espiã

const submitFeedback = new SubmitFeedbackUseCase(
  //passando o objeto como se fosse a instância do repositório, com o método create que n faz nada

  {create: createFeedbackSpy},// como é assíncrona esse método, precisa do async
  {sendMail: sendMailSpy} // como é assíncrona esse método, precisa do async
)



//cria vários teste para uma única funcionalidade
describe('Submit feedback', () =>{
  //aqui ficarão os testes

  //isso deveria conseguir enviar o feedback
  it('should be able to submit a feedback', async () =>{
    //eu espero que:
    await expect(submitFeedback.execute({
      type: 'ideia',
      comment: 'ideia de comentário',
      screenshot: 'seila.jpg',
    })).resolves.not.toThrow() //que resolva e não dispare nenhum erro

    //espero que (função espiâ).tenha sido chamado
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });



  //não deveria ser possível enviar um feedback sem um tipo
  it('should not able to submit a feedback without type', async () =>{
    //eu espero que:
    await expect(submitFeedback.execute({
      type: '',
      comment: 'ideia de comentário',
      screenshot: 'seila.jpg',
    })).rejects.toThrow() //espero que rejeite e que dispare um erro
  });

  //não deveria ser possível enviar um feedback sem um comment
  it('should not able to submit a feedback without comment', async () =>{
    //eu espero que:
    await expect(submitFeedback.execute({
      type: 'ideia',
      comment: '',
      screenshot: 'seila.jpg',
    })).rejects.toThrow() //espero que rejeite e que dispare um erro
  });

  //não deveria ser possível enviar um feedback sem um screenshot
  it('should not able to submit a feedback with an invalid screenshot', async () =>{
    //eu espero que:
    await expect(submitFeedback.execute({
      type: 'ideia',
      comment: 'eita que essa foto ficou boa',
      screenshot: 'seila.jpg', // aqui ele espera 'data/image/png;base64'
    })).rejects.toThrow() //espero que rejeite e que dispare um erro
  });
});