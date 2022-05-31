//SENDGRID API
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const PORT = 4500;
const cors = require("cors");


app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST']
  })
);

app.listen(PORT, () => { console.log(`Listening on PORT: ${PORT}`) });

// app.use((req,res,next)=>{
//   res.status(404).send('this is working');
// })

app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.status(201).send();
  console.log("received get request");
})

app.post('/', (req, res) => {
  var body=req.body;
  console.log(body);
  
  for(let [key,value] of Object.entries(body)){
    if(value==""){
      res.status(400).send(`Empty Field in ${key}`);
      res.end();
      break;
    }
  }
  var email = body.emailfield;

  if (body.comment == "Can you brew coffee?") {
    res.status(418).send();
  } else {
    res.status(200).send('message sent');
  }
  // calling the api
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: 'kizyakov.d@gmail.com', // Use the email address or domain you verified above
    templateId:'d-4685df34fc2c4d78872888b8773e1620',
    dynamic_template_data:body,
  }
  //ES6
  sgMail
    .send(msg)
    .then(() => {}, error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
        console.log(process.env.SENDGRID_API_KEY)
      }
    });

});



