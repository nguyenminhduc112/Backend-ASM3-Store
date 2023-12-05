const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

exports.sendEmail = async (email, subject, html) => {
    const info = await transporter.sendMail({
        from: `ASM3 Store😍😍 <${process.env.GMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    });
    return info
}