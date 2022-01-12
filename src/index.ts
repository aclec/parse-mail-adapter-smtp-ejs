import {AdapterOptionsInterface} from "./types";
import {createTransporter} from "./functions/createTransporter";
import {sendEmail} from "./functions/email/sendEmail";

let MailAdapter = (adapterOptions: AdapterOptionsInterface) => {

    const transporter = createTransporter(adapterOptions.nodeMailerOptions);

    return Object.freeze({
        sendMail: sendEmail,
    })
}

export default MailAdapter;