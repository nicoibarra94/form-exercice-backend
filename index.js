const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(formidable());

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.post("/form", async (req, res) => {
  try {
    const data = {
      from: `${req.fields.firstname} ${req.fields.lastname}  <nicolito@soymuybello.com>`,
      to: `nicolas.a.ibarra.g@gmail.com`,
      subject: "Thank you for sent the email",
      text: `${req.fields.message}`,
    };

    mailgun.messages().send(data, (error, body) => {
      console.log(body);

      if (error === undefined)
        res.json({
          Message:
            "All the information was well recieved and the email was sent.",
        });
      else {
        res.json(error);
      }
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
