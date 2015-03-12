var urlparse = require('url');
var cdata = {
	1: 'item1 detail',
	2: 'item2 detail',
	3: 'item 3 detail',
	4: 'item 4 detail',
	5: 'item5 detail',
};
var http = require('http');
var server = http.createServer();


function getdata(index) {

	return cdata[index];

}

server.on('request', function(req, res) {

	var info = urlparse.parse(req.url, true);

	console.log(info);

	function send(data) {
		res.writeHead(200, {
			'content-Type': 'text/html, charset;utf-8'
		});
		console.log(data);
		res.end(data);
	}

	if (info.pathname === '/') {
		send('<ul>' +
			'<li><a href="/item?cat=1&order=1">item1</a></li>' +
			'<li><a href="/item?cat=1&order=2">item2</li>' +
			'<li><a href="/item?cat=1&order=3">item3</li>' +
			'<li><a href="/item?cat=1&order=4">item4</li>' +
			'<li><a href="/item?cat=1&order=5">item5</li>' +
			'<li><a href="/help">help</li>' +
			'</ul>');
	} else if (info.pathname === '/item') {
		console.log(info.query.order);
		send(getdata(info.query.order));

	} else if (info.pathname === '/help') {
		
		send('<h1> help me </h1>');
		
	} else {
		console.log(info.pathname);
		send('<h1>Page not found</h1>');
	}
});

server.listen(3000);