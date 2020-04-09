const CoinFlipAlwaysOne = artifacts.require("CoinFlipAlwaysOne");
const truffle = require('truffle-assertions');
const assert = require('assert');

contract ('CoinFlipAlwaysWin', async (accounts) => {
    let instance;

    before(async () => {
        instance = await CoinFlipAlwaysOne.deployed();
    });
    it('should increase amount if a player loses', async () => {
        await instance.feedContract({from: accounts[0], value: web3.utils.toWei('2', 'ether')});
        let amountBefore = await instance.amount.call();
        console.log(amountBefore);
        instance.play(0, {from: accounts[0], value: web3.utils.toWei('2', 'ether')});
        assert(amountBefore < await instance.amount.call())
    });

    it('should decrease amount if a player wins', async () => {
        await instance.feedContract({from: accounts[0], value: web3.utils.toWei('2', 'ether')});
        let amountBefore = await instance.amount.call();
        console.log(amountBefore);
        instance.play(1, {from: accounts[0], value: web3.utils.toWei('2', 'ether')});
        assert(amountBefore > await instance.amount.call())
    })
});