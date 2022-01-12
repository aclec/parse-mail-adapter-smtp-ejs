import {AdapterOptionsInterface} from "./types";
import {createTransporter} from "./functions/createTransporter";

let MailAdapter = (adapterOptions: AdapterOptionsInterface) => {

    const transporter = createTransporter(adapterOptions.nodeMailerOptions);

    return Object.freeze({

    })
}

export default MailAdapter;