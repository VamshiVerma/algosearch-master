
/*
	Query: addresses.js
	____________
	Addresses endpoint
	____________
	Various Return schemas
*/

var constants = require('../global'); // Require global constants
const axios = require("axios"); // Axios for requests


const algosdk = require('algosdk');
const indexer_token = "";
const indexer_server = "http://localhost";
const indexer_port = 8980;
let indexerClient = new algosdk.Indexer(indexer_token, indexer_server, indexer_port);

// Instantiate the indexer client wrapper

	// Get address from url

	module.exports = function(app) {

		app.get('/blockservice/:blocknumber', function(req, res) {

(async () => {
    let address = req.params.address;
	let round = req.params.round;

	
    let response = await indexerClient.searchForTransactions()
        .address(address)
        .round(round).do();
    console.log("Information for Transaction search: " + JSON.stringify(response, undefined, 2));
    }   
)().catch(e => {
    console.log(e);
    console.trace();
	res.status(501);
});

	})}