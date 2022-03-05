'use strict';

var Gun = require('gun');
const express = require('express')
const app = express();

var port = process.env.PORT || 8888;
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

		app.get('/tydids/retrievePresentation', async (req, res) => {
			if(typeof req.query.address !== 'undefined') {
				if(typeof req.query.revision !== 'undefined') {
					let did = await ssi.retrievePresentation(req.query.address,req.query.revision);
					res.json(did);
				} else {
					let did = await ssi.retrievePresentation(req.query.address);
					res.json(did);
				}
			}
		})

		app.get('/tydids/setValue', async (req, res) => {
			if(typeof req.query.address == 'undefined') {
				req.query.address = settings.presentation.adddress;
			}
			if((typeof settings.setKey !== 'undefined') && (settings.setKey == req.query.setKey)) {
				console.log('Update',req.query.address);
				let did = await ssi.retrievePresentation(req.query.address);
				did[req.query.field] = req.query.value;
				await ssi.updatePresentation(req.query.address,did);
				res.json(did);
			}
		});

		app.listen(port, function () {
			console.log('\nApp listening on port', port);
			console.log('Connect http://localhost:'+port+'/');
		});

		const ssi = await tydids.ssi(privateKey,true);
		console.log("Service SSI:",ssi.identity);
		if(typeof settings.presentation == 'undefined') {
			fs.writeFileSync('./.tydids.json',JSON.stringify(settings));
		}
}

main();
