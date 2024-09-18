import * as crypto from 'crypto';
import { connectionSource } from "../../config/ormconfig";
import { User } from "../../entities/User";
import transport from '../../config/mailer';
import * as bcrypt from 'bcryptjs';
import { request, response } from 'express';

interface IForgotPasswordRequest {
    email: string;
}
class ForgotPasswordService {
    async execute({ email }: IForgotPasswordRequest) {

        const usersRepositories = connectionSource.getRepository(User);

        if (!email) {
            return Error("Invalid data");
        }

        // Verificar se email existe
        const userAlreadyExists = await usersRepositories.findOne({
            where: {
                email,
            },
        }
        );

        if (!userAlreadyExists) {
            return Error("Email não encontrado");
        }

        const newtemptoken = crypto.randomBytes(20).toString('hex');
        userAlreadyExists.passwordResetToken = newtemptoken;
        userAlreadyExists.passwordResetExpires = new Date(Date.now() + 3600000);
        const linkWeb = `http://localhost:8081/reset_password/${newtemptoken}`;
        const linkMobile = `exp://192.168.100.83:8081/--/recruitradar/reset_password/${newtemptoken}`;
        

        return await usersRepositories.update(userAlreadyExists.user_id, userAlreadyExists)
            .then(() => {
                      transport.sendMail({
                        from: 'Admin<01b231886a-c9b870@inbox.mailtrap.io>',
                        to: email,
                        subject: "Recuperação de Senha",
                        html: `<p>Entre neste link para recuperar sua senha</p>
                    <br/> <a href=${linkWeb}>Clique aqui para acessar o sistema WEB</a>
                    <a href=${linkMobile}>Clique aqui para acessar o sistema Mobile</a>`,
                    }).then(
                        () => {
                            
                            console.log('Email enviado com sucesso');
                            console.log(request.headers['user-agent']);
                            var msg = {
                                message: "Email enviado com sucesso"
                            }
                            return msg;
                        }
                    ).catch(
                        (err) => {
                            console.log(err);
                            return Error('Erro ao enviar email: ');
                        }
                    );
                }
            ).catch((err) => {
                console.log(err);
                return Error('Erro ao atualizar Token, id não encontrado.');
            });
    }
}

export { ForgotPasswordService };
