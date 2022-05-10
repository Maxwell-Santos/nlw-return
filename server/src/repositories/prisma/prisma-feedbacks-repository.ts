import { prisma } from './../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from '../feedbacks-repository';

//está importando e implementando os métodos de feedbacks-repositories
export class PrismaFeedbacksRepository implements FeedbacksRepository {

  //criar a operação de criação do feedback no bd
  async create({type, comment, screenshot}: FeedbackCreateData) {

  await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })  
 } 
}