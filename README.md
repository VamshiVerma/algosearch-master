<p>
<img src="https://i.imgur.com/dsBUUav.png" width="300" alt="AlgoSearch logo image" />
</p>

[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)

# AlgoSearch ([live deployment](https://algosearch.io))
AlgoSearch enables you to explore and search the [Algorand blockchain](https://www.algorand.com/) for transactions, addresses, blocks, assets, statistics, and more, in real-time. It's a simple, easy-to-deploy, and open-source block explorer to be used alongside an Algorand archival node.

**Dependencies**
* [Node.js](https://nodejs.org/en/) 8+ for use with server and front-end.
* [go-algorand](https://github.com/algorand/go-algorand) for Algorand `goal` node (must support archival indexing).
* [CouchDB](https://couchdb.apache.org/) as database solution.

Work on AlgoSearch is funded by the [Algorand Foundation](https://algorand.foundation) through a grant to [Anish Agnihotri](https://github.com/anish-agnihotri). The scope of work includes the development of an open-source block explorer (AlgoSearch) and a WIP analytics platform.

# Run locally

## Linux / OSX
The [go-algorand](https://github.com/algorand/go-algorand) node currently aims to support only Linux and OSX environments for development.

## Disclaimer
Simpler installation instructions, a hands-on guide, and a one-click deploy Docker image will be published upon final completion of AlgoSearch.

## Environment setup
First you'll need to install [CouchDB](https://docs.couchdb.org/en/stable/install/index.html) and [Algorand's Node](https://developer.algorand.org/docs/run-a-node/setup/install/) locally.

You can run CouchDB using Docker easily:
```
mkdir db-data

docker run -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 --name my-couchdb -v $(pwd)/db-data:/opt/couchdb/data -d couchdb
```
### AlgoSearch setup
**install**
```
# Run in folder root directory
npm install
```

**configure**
1. Enter your sitename in `src/constants.js`.
2. Copy `service/global.sample.js` to `service/global.js` and enter your node and DB details.

**build**
```
# Run in folder root directory
npm run build
```

### CouchDB Setup
1. Make sure DB is running and that DB details are correct in `service/global.js`.
2. Create tables:
   ```
   node service/sync/initSync.js
   ```
3. Create blocks DB view:
   1. Go to: http://127.0.0.1:5984/_utils/#/database/blocks/new_view
   2. Fill according to [service/design.md](service/design.md)
4. Create transactions DB view:
   1. Go to: http://127.0.0.1:5984/_utils/#/database/transactions/new_view
   2. Fill according to [service/design.md](service/design.md)
5. Sync tables:
   ```
   node service/sync/syncAll.js
   ```
   Note that this step takes time to sync and should stay running as long as the server is running.

### Run server
```
nodemon server.js
```

### Algorand's Node Setup
Make sure node is running on the preferred network and that algod details are correct in `service/global.js`.

# Documentation
The [Wiki](https://github.com/Anish-Agnihotri/algosearch/wiki) is currently under construction.

# License
[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)

Copyright (C) 2020, Anish Agnihotri.