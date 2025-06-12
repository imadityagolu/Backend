/**
 * 1. initialize package with server information
 * 2. prepare email details
 * 3. send email
*/

//1.
//import mailing package
const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({

    //require host & port
    host: "localhost",
    port: "1025",
    secure: false
});

//2.
//writing email
const mailOptions = {
    from: "reply@aditya.com",
    to: "adityasng420.ak@gmail.com",
    subject: "Dont reply to me !!",
    text: "Hy my name is aditya. im a FSD.",

    // html: `
    //     <html>
    //     <body>
    //         <h1 style="color:red">Order successful</h1>
    //     </body>
    //     </html>`,

    // attachments: [
    //     {
    //     filename: 'rentalo.png',
    //     path: './rentalo.png',
    //     cid: 'logo@nodemailer'
    //     }
    // ],
    // html: `<p><img src="cid:logo@nodemailer" alt="Nodemailer logo"></p>`

};

//3.
//sending email and if error catching it
mailer.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log("Error : ", error)
        return;
    }
    console.log("Email sent successfully", info);
})