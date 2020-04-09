pragma solidity 0.5.12;

import "./ProvableAPI.sol";

contract CoinFlip is usingProvable {
	uint public amount = 0;
	uint constant NUM_RANDOM_BYTES_REQUESTED = 1;
	address payable private owner;

	constructor() public {
		owner = msg.sender;
	}

	struct Player {
		address payable addressOfPlayer;
		uint bet;
		uint amount;
	}

	mapping (bytes32 => Player) awaitingPlayersMapping;

	event LogNewProvableQuery(string description);
	event generatedRandomNumber(
		address indexed playerAddress,
		uint256 randomNumber, bool won,
		uint wonAmount
);

	function play(uint bet) public payable {
		uint256 QUERY_EXECUTION_DELAY = 0;
		uint256 GAS_FOR_CALLBACK = 200000;

		amount += msg.value;

		bytes32 queryId = provable_newRandomDSQuery(QUERY_EXECUTION_DELAY, NUM_RANDOM_BYTES_REQUESTED, GAS_FOR_CALLBACK);
		awaitingPlayersMapping[queryId] = Player(msg.sender, bet, msg.value);
		emit LogNewProvableQuery("PROVABLE_QUERY_SENT");
	}

	function __callback(bytes32 _queryId, string memory _result, bytes memory _proof) public {
		require(msg.sender == provable_cbAddress());
		uint256 randomNumber = uint256(keccak256(abi.encodePacked(_result))) % 2;
		uint playerBet = awaitingPlayersMapping[_queryId].bet;
		uint playerBetAmount = awaitingPlayersMapping[_queryId].amount;
		address payable playerAddress = awaitingPlayersMapping[_queryId].addressOfPlayer;
		uint amountToSend = 0;
		bool won = false;

		if (playerBet == randomNumber) {
			won = true;
			if (playerBetAmount * 2 > amount) {
				amountToSend = amount;
				amount = 0;
			} else {
				amount -= playerBetAmount * 2;
				amountToSend = playerBetAmount * 2;
			}
			playerAddress.transfer(amountToSend);
		}
		delete awaitingPlayersMapping[_queryId];

		emit generatedRandomNumber(
			playerAddress,
				randomNumber,
				won,
				amountToSend);
	}

	function withdrawAll() public {
		require(msg.sender == owner);
		amount = 0;
		owner.transfer(amount);
	}
}