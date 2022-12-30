
const nodemailer = require('nodemailer');
const mailGun  = require('nodemailer-mailgun-transport');


/* var transporter = nodemailer.createTransport({
  service: 'smtp.gmail.com',
  port: 465,
  secure:false,
  ignoreTLS: true,
  auth: {
    user: process.env.email, // your email address to send email from
    pass: process.env.pass // your gmail account password
  }
});
 */

const auth ={
    auth:{
        api_key:'90d9cd586ff1acf6598d46e4a4f63476-c2efc90c-80aac001',
        domain:'sandboxa5fb2bb8955a40b1a6d1596c588d0b26.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const sendmail= (name, gender, image, cb) =>{
  
const mailOptions ={
  from:'mmihaj9318@gmail.com',
  to:'mminhaj9318@gmail.com',
  subject:'Your Survay',
  html: `
      <p>You have a new Survay details.</p>
      <h3>Survay Details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Gender: ${gender}</li>
        <li>Image: ${image}</li>
      </ul>
      `
}

transporter.sendMail(mailOptions, function (err, data){
  if(err){
    cb(err,null)
  }else{
  cb(null, err)
  }
})
}



module.exports = sendmail;