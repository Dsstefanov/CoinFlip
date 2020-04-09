pragma solidity 0.5.12;

import "./CoinFlip.sol";

contract CoinFlipAlwaysOne is CoinFlip {
	function randomize() internal pure returns (uint winningResult){
		return 1;
	}
}
