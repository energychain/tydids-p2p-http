const express = require('express')
const Gun = require('gun')

const app = express()
const port = 8888
app.use(Gun.serve)

const server = app.listen(port, () => {
    console.log("Listening at: http://localhost://" + port)
})

const gun = Gun({web: server,file:"radata_http_"+new Date().getTime()})
gun.get("relay").on(function(relay) {
	for (const [key, value] of Object.entries(relay)) {
  		gun.get(key).once(function(d) {},{wait:5000});
	}
});
