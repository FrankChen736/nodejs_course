var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var option = {
	port : 443,
	host : 'mail.k-star.com',
	auth : {
		user : 'k-star\tsungmin',
		pass : '0627iI736'
	}
}

var transport = nodemailer.createTransport(smtpTransport(option));

transport.sendMail({
	from : 'chentsungmin@gmail.com',
	to : 'tsungmin@k-star.com',
	subject : 'hello',
	text : 'hello world'
}, function (err){
	if (err) console.log(err);
}
	
);


console.log('send mail end....');