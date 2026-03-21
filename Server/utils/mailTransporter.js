const nodemailer = require("nodemailer");

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASS,
  },
});

module.exports = transport;
