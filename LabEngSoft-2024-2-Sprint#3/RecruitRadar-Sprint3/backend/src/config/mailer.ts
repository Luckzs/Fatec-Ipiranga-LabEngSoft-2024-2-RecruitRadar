import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bd8569728c5b99",
      pass: "dd4a36b4829d9b"
    }
  });

  export default transport;