import nodemailer from 'nodemailer';
import { ErrorHandler } from './errorHandler';
import { HttpCode } from './httpCode';
import logger from './logger';

export const sendMail = (email: string, subject: string, body: string) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: subject,
    html: body,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      logger.info('email sent successfully');
    })
    .catch((err) => {
      throw new ErrorHandler('mail not delivered!', HttpCode.BAD_REQUEST);
    });
};
