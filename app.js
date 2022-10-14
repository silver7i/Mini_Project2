var bodyParser = require('body-parser');

var express  = require('express');

var app      = express();

//var app      = require('express')();

 

//var http     = require('http');

//var server   = http.Server(app);

var http     = require('http').Server(app);

 

//var socketio = require('socket.io');

//var io       = socketio(server);

var io       = require('socket.io')(http);

 

const path = require('path');

var arr1 = new Array();
 

var SerialPort = require('serialport').SerialPort;

var ReadlineParser = require('@serialport/parser-readline').ReadlineParser;

var parsers    = SerialPort.parsers;

var sp = new SerialPort( {

  path:'COM7',

  baudRate: 9600

});

var parser     = sp.pipe(new ReadlineParser({

  delimiter: '\r\n'

}));

 

 

 

var port = 3000;

var arr1 = new Array();

var cnt = 0;

sp.pipe(parser);

 

sp.on('open', () => console.log('Port open'));

 
parser.on('data', function(data)

{

	if(data.substring(0,5) == "servo"){

		if(data.substring(5,6) == "0")	servoStatus = "0";

		else if(data.substring(5,7) == "30")	servoStatus = "30";
		
		else if(data.substring(5,7) == "60")	servoStatus = "60";
		
		else if(data.substring(5,7) == "90")	servoStatus = "90";
		
		else if(data.substring(5,8) == "120")	servoStatus = "120";
		
		else if(data.substring(5,8) == "150")	servoStatus = "150";

		else if(data.substring(5,8) == "180")	servoStatus = "180";
		else
		io.emit('servo', servoStatus);

	}
	
	else if(data.substring(0,5) == "servo"){

		servoStatus = data.substring(5);

		io.emit('servo', servoStatus);

		console.log('servoStatus: ' + servoStatus);

	}
	
	else if(data.substring(0,4) == "mode"){

		if(data.substring(4,5) == "a")	modeStatus = "auto";
		else if(data.substring(4,5) == "b")	modeStatus = "manual";
		io.emit('mode', modeStatus);

		console.log('mode Status: ' + modeStatus);

	}
	
	else if(data.substring(0,3) == "adc"){

		adcValue = data.substring(3);

		io.emit('adc', adcValue);

		console.log('adc value: ' + adcValue);

	}
	
	else if(data.substring(0,8) == "{ time: "){

		timeSet = data.substring(8);

		io.emit('input1', timeSet);

		console.log('input1' + timeSet);

	}
	

});

app.get('/d1',function(req,res)

{
	if(arr1[0]!=null){
		arr1.splice(0, 1);
		console.log(arr1);
		cnt--;
		if(cnt < 0){
			cnt = 0;
		}
	}
});

app.get('/d2',function(req,res)

{
	if(arr1[1]!=null){
		arr1.splice(1, 1);
		console.log(arr1);
		cnt--;
		if(cnt < 0){
			cnt = 0;
		}
	}
});

app.get('/d3',function(req,res)

{
	if(arr1[2]!=null){
		arr1.splice(2, 1);
		console.log(arr1);
		cnt--;
		if(cnt < 0){
			cnt = 0;
		}
	}
});

app.get('/a',function(req,res)

{

	sp.write('a\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: auto');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('auto\n');
		

	});

});

app.get('/b',function(req,res)

{

	sp.write('b\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: manual');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('manual\n');
		

	});

});

app.get('/up',function(req,res)

{

	sp.write('.\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: up');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('up\n');
		

	});

});

app.get('/down',function(req,res)

{

	sp.write(',\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: down');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('down\n');
		

	});

});

app.get('/servo0',function(req,res)

{

	sp.write('0\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo0');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 0\n');
		

	});

});

app.get('/servo30',function(req,res)

{

	sp.write('1\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo30');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 30\n');

	});

});


app.get('/servo60',function(req,res)

{

	sp.write('2\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo60');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 60\n');

	}); 

});

app.get('/servo90',function(req,res)

{

	sp.write('3\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo90');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 90\n');

	}); 

});

app.get('/servo120',function(req,res)

{

	sp.write('4\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servol20');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 120\n');

	}); 

});

app.get('/servo150',function(req,res)

{

	sp.write('5\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo150');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 150\n');

	}); 

});

app.get('/servo180',function(req,res)

{

	sp.write('6\n\r', function(err){

		if (err) {

            return console.log('Error on write: ', err.message);

        }

        console.log('send: servo180');

		res.writeHead(200, {'Content-Type': 'text/plain'});

		res.end('Servo 180\n');

	});

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/postTest", function(req, res){
	console.log(req.body);
	res.json({ok:true});
	
	if(cnt < 3){
	arr1[cnt] = (req.body);
	cnt++;
	}

	console.log(arr1);
});

app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.use(express.urlencoded({extended : false}));


http.listen(port, function() {  // server.listen(port, function() {

    console.log('listening on *:' + port);

});