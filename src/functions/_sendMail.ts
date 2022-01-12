import {MailOptionsInterface} from "../types";
import {Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const _sendMail = (mail: MailOptionsInterface, transporter: Transporter<SMTPTransport.SentMessageInfo>) => {
    let mailOptions = {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        html: mail?.html || "",
        text: mail?.text || "",
        attachments: mail?.attachments || []
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err)
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}