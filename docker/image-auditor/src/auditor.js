/*
 This program simulates an auditor keeping tracks of instruments played
 by musicians
 Authors: Pascal Sekley & Ibrahim Ounon

*/
var protocol = require('./dockerMusic-protocol');

/*
 * We use a standard Node.js module to work with UDP
 */
var dgram = require('dgram');

var net = require('net');

var musicians = new Map();

var informationToBeSent = [];


//var server = dgram.createSocket('udp4');

// Create an udp server
var up = dgram.createSocket('udp4');

console.log("Listening ...");

/* This function is called every seconds in order to check inactive musician and remove them
	from the list
*/
function cleanMusicians(){

cleanMusicians.prototype.update = function(){
	musicians.forEach(function(item, key, musician){
	var date = new Date();
	if(date - item.lastDate > 5000){
			musicians.delete(key);
			console.log("Removed !!");
	}
	console.log("Checked !!");
	
	});
	
}
	setInterval(this.update.bind(this), 1000);
	
}
var clean = new cleanMusicians();




// Get the sound and check everything
up.on('message', function(payload, source){
	var msgFromMusician = JSON.parse(payload);

// If the musician is already in the list we just update the date
	if(musicians.has(msgFromMusician.uuid)){
		msgFromMusician.activeSince = new Date();
		console.log("Already in...");
		musicians.set(msgFromMusician.uuid, {playerInformation: msgFromMusician});
	}
	else{
		musicians.set(msgFromMusician.uuid, {playerInformation: msgFromMusician});
		console.log("Add it in...");
	}
	musicians.get(msgFromMusician.uuid).lastDate = new Date();

	
});

up.bind(protocol.PROTOCOL_PORT, function(){
	up.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});




var tcpServer = net.createServer(function(socket){
	informationToBeSent = [];
	for(var musician of musicians.values()) {
		informationToBeSent.push(musician.playerInformation);
}

	socket.end(JSON.stringify(informationToBeSent));
});

tcpServer.listen(protocol.PROTOCOL_PORT);


