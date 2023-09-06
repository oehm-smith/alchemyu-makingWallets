const { assert } = require('chai');
const { sendEther, ganacheProvider } = require('./sendEther');
const ethers = require('ethers');
// const { ganacheProvider } = require('../config');
// const { GanacheProvider } = require("@ethers-ext/provider-ganache");

// const ganacheProvider = new GanacheProvider();

const provider = new ethers.providers.Web3Provider(ganacheProvider);

global.console = require('console');

let tx;

describe('sendEther', () => {
    beforeEach(async () => {
        tx = await sendEther({
            value: ethers.utils.parseEther("1.0"),
            to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
        });
    })
    it('should resolve with a transaction', async () => {
        assert(tx, "The function did not resolve with a transaction. Did you return the transaction promise?")
        assert.equal(tx.to, "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
        assert.equal(tx.from, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        assert(tx.hash);
    });
    it('should get mined', async () => {
        const receipt = await provider.waitForTransaction(tx.hash);
        assert(receipt);
        assert.equal(receipt.blockNumber, 1);
    });

    describe('nonce', () => {
        beforeEach(async () => {
            const props = {
                value: ethers.utils.parseEther("1.0"),
                to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
            }
            await sendEther(props);
            await sendEther(props);
            await sendEther(props);
        });

        it('should have mined three blocks', async () => {
            const blockNumber = await provider.getBlockNumber();
            assert.equal(blockNumber, 3);
        });
    })
});
