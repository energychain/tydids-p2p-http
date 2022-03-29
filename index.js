#!/usr/bin/env node

const express = require('express')
const Gun = require('gun')

const app = express()
const port = 8888
app.use(Gun.serve)

const server = app.listen(port, () => {
    console.log("Listening at: http://localhost:" + port)
})

const peersRaw = ['http://relay.tydids.com:8888/','http://relay2.tydids.com:8888/','http://relay3.tydids.com:8888/','http://relay4.tydids.com:8888/'];

let peers = [];
for(let i=0;i<peersRaw.length;i++) {
  peers.push(peersRaw[i]+'gun');
}

const gun = Gun({web: server,file:"radata_http_"+new Date().getTime(),peers:peers})
const tydids = require("tydids-p2p");
const wallet = tydids.ethers.Wallet.createRandom();
const privateKey = wallet.privateKey;

let httpRelay = null;

gun.get("relay").on(function(relay) {
	for (const [key, value] of Object.entries(relay)) {
		if(key.length>20) {
  		gun.get(key).once(function(d) {});
      console.log('Relay',key);
		}
	}
});

const runner = async function() {
    const ssi = await tydids.ssi(privateKey,true,gun);
    app.use('/json/', function (req, res, next) {
      console.log(req.url.substr(1,42));
      ssi.retrievePresentation(req.url.substr(1,42)).then(function(data) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify(data))
        res.end();
      });
    });
}

runner();
