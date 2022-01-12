import {AdapterOptionsInterface} from "./types";
import {createTransporter} from "./functions/createTransporter";
import {sendEmail} from "./functions/email/sendEmail";
import {sendPasswordResetEmail} from "./functions/email/sendPasswordResetEmail";

let MailAdapter = (adapterOptions: AdapterOptionsInterface) => {

    const transporter = createTransporter(adapterOptions.nodeMailerOptions);

    return Object.freeze({
        sendMail: sendEmail,
        sendPasswordResetEmail: sendPasswordResetEmail
    })
}

export default MailAdapter;