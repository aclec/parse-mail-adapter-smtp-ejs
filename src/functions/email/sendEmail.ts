import {AdapterOptionsInterface, MailOptionsInterface} from "../../types";
import {renderTemplate} from "../renderTemplate";
import {_sendMail} from "../_sendMail";
import {Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = (
    options: MailOptionsInterface,
    adapterOptions: AdapterOptionsInterface,
    transporter: Transporter<SMTPTransport.SentMessageInfo>
) => {

    if(options.template){
        return renderTemplate(options.template, options.data, options.locale, adapterOptions).then((result) => {

            let mail = {
                from: options.from,
                to: options.to,
                subject: options.subject,
                text: options.text || "",
                html: result
            };

            return _sendMail(mail, transporter);
        }).catch((e) => {

            return new Promise((resolve, reject) => {
                console.log(e)
                reject(e);
            });
        });

    }else {
        throw "Error"
    }
};