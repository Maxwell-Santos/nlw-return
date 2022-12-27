import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import express from 'express'

export const routes = express.Router()

//GET = Buscar informações
//POST = Cadastrar informações
//PUT = Atualizar informações
//PATCH = Atualizar uma informação única de uma entidade
//DELETE = Deletar uma informação

//como é uma função assíncrona, ou seja, demora um tempo até bater no bd e retornar ao cliente, precisa do async await


routes.post('/feedbacks', async (req, res)=>{

  const {type, comment, screenshot} = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const nodeMailerAdapater = new NodemailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerAdapater);

  await submitFeedbackUseCase.execute({
    type,
    comment, 
    screenshot
  })


  return res.status(201).send() //status http para dizer que algo foi criado
  //.json(feedback) tbm funciona
})
