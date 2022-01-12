import {AdapterOptionsInterface} from "../../types";
import {renderTemplate} from "../renderTemplate";
import {Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {_sendMail} from "../_sendMail";

interface PasswordEmailInterface{
    appName: string,
    link: string,
    user: Parse.User,
}

export const sendPasswordResetEmail = (
    data: PasswordEmailInterface,
    adapterOptions:AdapterOptionsInterface,
    transporter: Transporter<SMTPTransport.SentMessageInfo>
) => {

    if (adapterOptions?.templatesOptions?.templates && adapterOptions?.templatesOptions?.templates?.resetPassword) {

        return renderTemplate(
            adapterOptions.templatesOptions.templates.resetPassword.template,
            {...data, user: data.user.get('email') || data.user.get('username')},
            data.user.get("locale"),
            adapterOptions

        ).then((result) => {

            let mail = {
                from: adapterOptions.defaultFrom,
                subject: adapterOptions.templatesOptions.templates.resetPassword?.subject || 'Reset Password',
                to: data.user.get('email') || data.user.get('username'),
                html: result,
            };

            return _sendMail(mail, transporter);

        }).catch((e) => {

            return new Promise((resolve, reject) => {
                console.log(e)
                reject(e);
            });
        });

    } else {

        let mail = {
            from: adapterOptions.defaultFrom,
            subject: adapterOptions.templatesOptions.templates.resetPassword?.subject || 'Reset Password',
            to: data.user.get('email') || data.user.get('username'),
            text: data.link,
        };

        return _sendMail(mail, transporter);
    }

}