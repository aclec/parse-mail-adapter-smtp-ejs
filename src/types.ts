
export interface MailOptionsInterface{
    from: string,
    to: string,
    subject: string,
    html?: string,
    text?: string
}


export interface NodeMailerOptionsInterface{
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    },
    tls?: {
        ciphers?: string,
        maxVersion?: string,
        minVersion?: string
    },
    [key: string]: any
}


export interface AdapterOptionsInterface{
    nodeMailerOptions: NodeMailerOptionsInterface,
    defaultFrom: string
    templatesOptions: {
        locales: string[],
        defaultLocale: string,
        templatesDir: string,

        templates: {
            resetPassword: {
                template: string,
                subject: string
            },
            verifyEmail: {
                template: string,
                subject: string
            }
        }

    }
}