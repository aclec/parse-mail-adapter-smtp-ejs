import {AdapterOptionsInterface} from "./types";
import {createTransporter} from "./functions/createTransporter";
import {sendEmail} from "./functions/email/sendEmail";
import {sendPasswordResetEmail} from "./functions/email/sendPasswordResetEmail";
import {sendVerificationEmail} from "./functions/email/sendVerificationEmail";

let MailAdapter = (adapterOptions: AdapterOptionsInterface) => {

    const transporter = createTransporter(adapterOptions.nodeMailerOptions);

    return Object.freeze({
        sendMail: sendEmail,
        sendPasswordResetEmail: sendPasswordResetEmail,
        sendVerificationEmail: sendVerificationEmail
    })
}

export default MailAdapter;