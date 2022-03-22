# tydids-p2p-http
Tydids P2P HTTP(s) Relay and UI

<a href="https://stromdao.de/" target="_blank" title="STROMDAO - Digital Energy Infrastructure"><img src="./static/stromdao.png" align="right" height="85px" hspace="30px" vspace="30px"></a>

**A consensus driven decentralized data governance framework.**

[![npm](https://img.shields.io/npm/dt/tydids-p2p-http.svg)](https://www.npmjs.com/package/tydids-p2p-http)
[![npm](https://img.shields.io/npm/v/tydids-p2p-http.svg)](https://www.npmjs.com/package/tydids-p2p-http)
[![CO2Offset](https://api.corrently.io/v2.0/ghgmanage/statusimg?host=tydids-p2p-http&svg=1)](https://co2offset.io/badge.html?host=tydids-p2p-http)
[![Join the chat at https://gitter.im/stromdao/tydids-p2p](https://badges.gitter.im/stromdao/tydids-p2p.svg)](https://gitter.im/stromdao/tydids-p2p?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/energychain/tydids-p2p-http)
[![Edit tydids-p2p-http](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/tydids-p2p-http-q987k0?fontsize=14&hidenavigation=1&theme=dark)

## Installation and Starting
```
npm install -g tydids-p2p-http
tydids-p2p-http
```

It is recommended to use a process manager like [pm2](https://pm2.io) and set restarts as all graph data is kept in memory (by purpose).

```
npm install -g pm2
pm2 start --name tydids-p2p-http npm --max-memory-restart=550M -- start
```


## Maintainer / Imprint

<addr>
STROMDAO GmbH  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
kontakt@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)
</addr>

Project Website: https://tydids.com/

## [CONTRIBUTING](https://github.com/energychain/tydids-p2p/blob/main/CONTRIBUTING.md)

## [CODE OF CONDUCT](https://github.com/energychain/tydids-p2p/blob/main/CODE_OF_CONDUCT.md)

## LICENSE
[Apache-2.0](./LICENSE)
