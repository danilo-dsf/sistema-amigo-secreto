import { IDrawnParticipants } from "./DrawParticipantsService";
import { SentMessageInfo, TestAccount } from 'nodemailer';

class SendEmailToParticipantsService {
  async execute(drawnParticipants: IDrawnParticipants[]): Promise<void> {
    const nodemailer = require("nodemailer");

    nodemailer.createTestAccount((err: Error, account: TestAccount) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
      }

      console.log('Credentials obtained, sending message...');

      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      drawnParticipants.map(drawnParticipant => {
        let message = {
          from: 'Sistema Amigo Secreto (amigosecreto@sistema.fake.br)',
          to: drawnParticipant.participant.email,
          subject: 'Sorteio de Amigo Secreto Finalizado!',
          text: `Olá, ${drawnParticipant.participant.name}, o sorteio para o amigo secreto foi finalizado e você tirou o(a) ${drawnParticipant.drawn_participant.name} / ${drawnParticipant.drawn_participant.email}`,
        }

        transporter.sendMail(message, (err: Error, info: SentMessageInfo) => {
          if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
          }

          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          console.log('---------------------------------------------------');
        });
      });
    });
  }
}

export default SendEmailToParticipantsService;