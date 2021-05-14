const nodemailer = require("nodemailer");
const fs = require("fs");

const sendEmail = (data) => {
  const { transactionId, products, customer } = data;
  const displayedDate = new Date().toString();
  const title = `${transactionId}.txt`;

  const contentHeader = `${customer.name} | https://wa.me/${customer.phoneNumber}`;
  const contentBody = products.map((item) => {
    return `${item.name} | ${item.quantity} ${item.unit}`;
  });

  const message = `transaksi ${transactionId}\n${contentHeader}\n\n${contentBody.join(
    "\n"
  )}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  var mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_RECIPIENT,
    subject: `[Kulkasku] - pesanan ${transactionId}`,
    text: `
      Hi Kulkasku!,

      pesanan baru pada ${displayedDate} telah diterima dari ${customer.name}, 
      silahkan hubungi pelanggan lebih lanjut di https://wa.me/${customer.phoneNumber}.
      detail pesanan dapat dilihat terlampir.
    `,
    attachments: [
      {
        filename: title,
        content: message,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
