import nodemailer from "nodemailer";
import {NodeMailerOptionsInterface} from "../types";


export function createTransporter(nodemailerOption: NodeMailerOptionsInterface){
    // @ts-ignore
    return nodemailer.createTransport(nodemailerOption);

}