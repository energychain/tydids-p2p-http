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


const main = async function() {

	const server = require('http').createServer().listen(8888);
	const gun = Gun({web: server});

}

main();
