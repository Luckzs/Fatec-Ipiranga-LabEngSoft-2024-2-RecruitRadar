import nodemailer from 'nodemailer';

/*var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bd8569728c5b99",
      pass: "dd4a36b4829d9b"
    }
  });*/

  //TODO: criar variavel de ambiente
  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      //user: "recruitradar01@gmail.com",
      //pass: "hznt ehos wxrw taww"
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  export default transport;