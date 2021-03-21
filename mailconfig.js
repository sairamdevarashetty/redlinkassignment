var Mailgun = require('mailgun-js');  
var api_key = 'key-d5d68f37b10da3c13aaa8d9234dc4480';
var domain = 'sandboxfca6c35d00d54a65a213dbbd619b06e6.mailgun.org';
var from_who = 'marsai493@email.com';


var mailgun = new Mailgun({apiKey: api_key, domain: domain});


module.exports ={
    mailgun
}