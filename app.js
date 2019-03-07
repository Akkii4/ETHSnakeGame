var express = require("express");  
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(3000);

app.use(express.static("public"));

var Web3 = require("web3");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));	
web3.eth.defaultAccount=web3.eth.accounts[0];
const defaultaddress=web3.eth.defaultAccount;
var snakegameContract = web3.eth.contract([ { "constant": false, "inputs": [ { "name": "_points", "type": "uint256" } ], "name": "addPoints", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "gameOver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getPoints", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]);
var snakegame = snakegameContract.at("0x9e445595834fb26cd562ba4b84e96f3938ba9b35");

app.get("/addpoints", function(req, res){
	let points=req.query.score;
	snakegame.addPoints(points);
    res.send("points added");
})

app.get("/getpoints",function(req,res){
	
	res.send(snakegame.getPoints());
})

app.get("/gameover",function(req,res){
	snakegame.gameOver();
	res.send("game-over")
})

