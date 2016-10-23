var express = require('express')
var fs = require('fs')
var router = express.Router()
var nodemailer = require('nodemailer')
var sgTransport = require('nodemailer-sendgrid-transport')
var pdf = require('html-pdf')
var qr = require('qr-image')

var options = {
  auth: {
    api_key: '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'
  }
}

var mailer = nodemailer.createTransport(sgTransport(options))
var optionsPDF = {
  'format': 'A4',
  'orientation': 'portrait'
}
function sendTicket (cryptedString, user) {
  var qr_svg = qr.imageSync(cryptedString, { type: 'svg' })
  console.log('svgobj:' + qr_svg)
  var date = 'November 5, 2016'
  var artistName = 'Airwave'
  var clubName = 'Fabrika 126'
  var guestEmail = user.email
  var name = user.firstName + ' ' + user.lastName
  var address = 'Sofia, bul. Maria Luiza 126'
  var emailContent = '<b>Здравей </b>' + name + '<br><p> Благодарим ти за интереса към нашето събитие.' +
                        'Като прикачен файл ще откриеш билет като комплимент от нас.<br> Надяваме се да ти хареса!</p>' +
                        '<p>Научи повече за нас и как осъществяваме събитията си <a href="http://dgty-promo.com/faq/"> тук </a>.</p>' +
                        '<p>Екипа на Tranc3motion.</p>'
  var htmlTicket = '<html><head><meta charset="utf8"></head><body style="">' +
                      '<div style="overflow: hidden; font-family: Arial, Helvetica, sans-serif; border-bottom-style: dashed;">' +
                      '<div style="float:left; width:65%; padding: 0 0 0 20px;">' +
                      '<h3>Tranc3motion pres. ' + artistName + '</h3>' +
                      '<p>Name: ' + name + '<br> <br> Date: ' + date + '</p>' +
                      '<p><b>' + clubName + '</b><br>' + address + '</p>' +
                      '</div><div style="max-width: 30%; height:180px; width:100%; float:right;">' + qr_svg + '</div></div>' +
                      '</body></html>'

  pdf.create(htmlTicket, optionsPDF).toBuffer(function (err, buffer) {
    if (err) console.log(err)
    var email = {
      to: [guestEmail],
      from: 'tranc3motionbg@gmail.com',
      subject: 'Tranc3motion ticket',
      text: 'Tranc3motion ticket',
      html: emailContent,
      attachments: [{
        filename: 'Ticket.pdf',
        content: buffer,
        contentType: 'application/pdf'
      }]
    }
    mailer.sendMail(email, function (err, res) {
      if (err) {
        console.log(err)
      }
      console.log(res)
    })
  })
  // pdf.create(htmlTicket,optionsPDF).toStream(function(err, stream){
  //   stream.pipe(fs.createWriteStream('./foo.pdf'))
  // })
}

// sendTicket('skjdhaskjlgdelrg32k5g23krbfdsfds98fysd906928374302u4rhwefkjsdhfsdfsdfs90dufsdufosd')
module.exports = sendTicket
