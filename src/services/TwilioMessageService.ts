import twilio from 'twilio'
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

class TwilioMessageService {

    async twilioMessageSender(name: string, to: string, data: string) {
        console.log(to)
        try {
            const message = await client.messages
                .create({
                    from: 'whatsapp:+14155238886',
                    contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
                    contentVariables: '{"1":"12/1","2":"3pm"}',
                    to: 'whatsapp:+5581995932501',
                    body: `Olá ${name}, seu horário foi marcado para as ${data}`
                });
            return console.log('Mensagem enviada: ', message.sid);
        } catch (error) {
            return console.error('Erro ao enviar a mensagem: ', error);
        }

    }
}

export default new TwilioMessageService()