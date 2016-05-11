/*
 This program simulates a musician playing an instrument
 Authors: Pascal Sekley & Ibrahim Ounon

*/

var protocol = require('./dockerMusic-protocol');

// Requirement to generate uuid
var uuid = require('uuid');

/*
 * We use a standard Node.js module to work with UDP
 */
var dgram = require('dgram');

/*
 * Let's create a datagram socket. We will use it to send our UDP datagrams 
 */
var s = dgram.createSocket('udp4');

/*
 * Let's define a javascript class for our thermometer. The constructor accepts
 * a location, an initial temperature and the amplitude of temperature variation
 * at every iteration
 */
function Musician(instrument) {
	
	this.instrument = instrument;

	// Generate a v4 random uiid
	var uniqID = uuid.v4();

/*
   * We will simulate temperature changes on a regular basis. That is something that
   * we implement in a class method (via the prototype)
   */
	Musician.prototype.update = function() {

		var sound = "";

		if(instrument == "piano"){
			sound = "ti-ta-ti";
		}
		else if(instrument == "trumpet"){
			sound = "pouet";
		}
		else if(instrument == "flute"){
			sound = "trulu";
		}
		else if(instrument == "violin"){
			sound = "gzi-gzi";
		}
		else if(instrument == "drum"){
			sound = "boum-boum";
		}

/*
	  * Let's create the instruSound as a dynamic javascript object, 
	  * add the 3 properties (uuid, instrument and the sound)
	  * and serialize the object to a JSON string
	  */
		var instruSound = {
			uuid: uniqID,
			instrument: this.instrument
						
		};
		var payload = JSON.stringify(instruSound);

/*
	   * Finally, let's encapsulate the payload in a UDP datagram, which we publish on
	   * the multicast address. All subscribers to this address will receive the message.
	   */
		message = new Buffer(payload);
		s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
			//console.log("Sending payload: " + payload + " via port " + s.address().port);
			console.log("Orchestra: " + payload + "via port" + s.address().port);
		});

	}

/*
	 * Let's take and send a measure every 1000 ms
	 */
	setInterval(this.update.bind(this), 1000);

}

/*
 * Let's get the musician intrument
 */
var instrument = process.argv[2];

/*
 * Let's create a new musician
 */
var musician = new Musician(instrument);
