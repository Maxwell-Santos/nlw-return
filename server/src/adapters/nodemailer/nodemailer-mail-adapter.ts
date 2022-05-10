import { MailAdapter, SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ac16a1d51fa120",
    pass: "6b6ccfd4a537ad"
  }
});

export class NodemailerMailAdapter implements MailAdapter {

  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <emaildoapp@feedget.com>',
      to: 'Maxwell Alves <emaildocliente@gmail.com>',
      subject,
      html: body
    })

  };
}