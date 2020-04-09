var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var loading = false;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(window.abi,
            "0xbE3D26FB4d440d557c42c00793187D6dEc48744B", {from: accounts[0]});
        getContractAmount();
    });
    $("#heads_button").click(() => {play(1);});
    $("#tails_button").click(() => {play(0);});
});

function play(heads){
    if (loading) {
        alert("Awaiting your result");
        return;
    }
    loading = true;
    var bet = $("#bet_input").val();
    if (bet <= 0) {
        // Maybe proper error handling
        alert('Bet is invalid');
        return;
    }
    if(![0, 1].includes(heads)) {
        alert('There has been an issue with the coin, perhaps you swung it too high and it broke on the way down');
    }
    contractInstance.methods.play(heads).send({value: web3.utils.toWei(bet.toString(), "ether")});

    contractInstance.events.generatedRandomNumber({
        filter: {'returnValues.playerAddress': web3.eth.accounts[0]}
    })
        .once('data', function(event){
            console.log("My bet according contract: " + event.returnValues.wonAmount);
            console.log("Won: " + event.returnValues.won);
            getContractAmount();
            loading = false;
        })
        .on('error', console.log);

    contractInstance.events.LogNewProvableQuery()
        .once('data', function(){
            console.log("LogNewProvableQuery consumed");
        })
        .on('error', console.log);
}

function getContractAmount() {
    contractInstance.methods.amount().call()
        .then((result) => {
            $('#current_contract_balance').text(web3.utils.fromWei(result, 'ether'));
        })
}