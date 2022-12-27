// CAMADA DE DADOS

// definir quais dados precisa para criar o feedback
export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  //definir os métodos com que podem ocorrer com o banco de dados

  //essa função está sendo chamada lá na pasta prisma de dentro do src, ela é uma função assíncrona, ou seja, retorna uma promise (!importante)
  create: (data: FeedbackCreateData) => Promise<void>;
}