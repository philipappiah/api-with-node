const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email{
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Philip Appiah Kubi <${process.env.EMAIL_FROM}>`;
    }

    newTransport(){
        if(process.env.NODE_ENV === 'development'){
            //sendgrid
            return nodemailer.createTransport({
                service:'SendGrid',
                auth:{
                    user:process.env.SENDGRID_USERNAME,
                    pass:process.env.SENDGRID_PASSWORD

                }
               
            })
        }

        return nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_POST,
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
    
    });
}
 //Send the actual email
async send(template, subject){
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
        firstName:this.firstName,
        url:this.url,
        subject
    })

   const mailOptions = {
    from: this.from,
    to: this.to,
    subject: subject,
    html,
    text: htmlToText.fromString(html)
    
};


await this.newTransport().sendMail(mailOptions)
}

async sendWelcome(){
    await this.send('welcome','Welcome to the Natours family!');
}

async sendPasswordReset(){
    await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)'); 
}

};



