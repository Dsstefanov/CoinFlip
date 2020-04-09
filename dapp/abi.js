var abi =[
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "LogNewProvableQuery",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "playerAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "randomNumber",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "won",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "wonAmount",
                "type": "uint256"
            }
        ],
        "name": "generatedRandomNumber",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "amount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "bet",
                "type": "uint256"
            }
        ],
        "name": "play",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_myid",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_result",
                "type": "string"
            }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_queryId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_result",
                "type": "string"
            },
            {
                "internalType": "bytes",
                "name": "_proof",
                "type": "bytes"
            }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdrawAll",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];