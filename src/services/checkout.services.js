const nodemailer = require("nodemailer");
const fs = require("fs");

const sendEmail = (data) => {
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

  const displayedDate = new Date().toString();
  const time = (Date.now() + ".txt").toString();

  fs.writeFile(time, "", function (err) {
    if (err) throw err;
  });

  var mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_RECIPIENT,
    subject: `[Kulkasku] - pesanan ${displayedDate}`,
    text: `
      Hi Kulkasku!,

      pesanan baru pada ${displayedDate} telah diterima.
      detail pesanan dapat dilihat terlampir.
    `,
    attachment: [
      {
        filename: time,
        path: __dirname + "/" + time,
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
