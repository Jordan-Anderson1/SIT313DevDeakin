const express = require("express");
const cors = require("cors");
var nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

var transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const main = async (to) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "Deakin News",
    text: "Thanks for subscribing to Deakin Newsletter!",
  });
};

app.post("/", (req, res) => {
  const toEmail = req.body.email;
  main(toEmail)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("Email sent");
    })
    .catch(console.error);
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
