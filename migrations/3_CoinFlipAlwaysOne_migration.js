const CoinFlipAlwaysOne = artifacts.require("CoinFlipAlwaysOne");

module.exports = function(deployer) {
    deployer.deploy(CoinFlipAlwaysOne);
};
