'use strict';

var Gun = require('gun');
const express = require('express')
const app = express();

var port = process.env.PORT || 8899;
var fs = require('fs');
const tydids = require("tydids-p2p");
let _tmpwallet = tydids.ethers.Wallet.createRandom();
let privateKey = _tmpwallet.privateKey;
let settings = {};

if(fs.existsSync('./.tydids.json')) {
	settings = JSON.parse(fs.readFileSync('./.tydids.json'));
	if(typeof settings.privateKey !== 'undefined') privateKey = settings.privateKey;
} else {
	settings = {
		address:_tmpwallet.address,
		privateKey: privateKey
	}
	fs.writeFileSync('./.tydids.json',JSON.stringify(settings));
}

// Serves up /index.html
app.use(express.static('public'));

const gun = Gun({
	web: app, // Handles real-time requests and updates.
  peers: ['https://webrtc.tydids.com/gun']
});

const main = async function() {


		app.get('/.well-known/tydids.json', (req, res) => {
			res.json(
				{
					peers:['/gun'],
					identity:ssi.identity
				});
		})

		app.get('/tydids/identity', async (req, res) => {
			res.json(ssi.identity);
		})

		app.get('/tydids/retrieveVP', async (req, res) => {
			if(typeof req.query.address !== 'undefined') {
				let did = await ssi.retrieveVP(req.query.address);
				res.json(did);
			}
		})

		app.listen(port, function () {
			console.log('\nApp listening on port', port);
			console.log('Connect http://localhost:'+port+'/');
		});

		const ssi = await tydids.ssi(privateKey,gun);
		console.log("Service SSI:",ssi.identity);
}

main();
