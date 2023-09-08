const { assert } = require('chai');
const { PRIVATE_KEY, ganacheProvider } = require('./findEther.config');
const { utils, Wallet, providers } = require('ethers');
const findEther = require('./findEther');

const FROM_ADDRESS = "0x5409ED021D9299bf6814279A6A1411A7e866A631";
const provider = new providers.Web3Provider(ganacheProvider);
const wallet = new Wallet(PRIVATE_KEY, provider);

function rpc(method) {
    return new Promise((resolve, reject) => {
        ganacheProvider.send({ id: 1, jsonrpc: "2.0", method }, () => {
            resolve();
        });
    });
}

const stopMiner = () => {
    console.log('miner_stop')
    rpc('miner_stop');
}
const mineBlock = () => {
    console.log('evm_mine')
    rpc('evm_mine');
}

global.console = require('console');

describe('findEther', () => {
    jest.setTimeout(30000);
    const expected = [];

    const sendEther = async (i) => {
        const address = Wallet.createRandom().address;
        await wallet.sendTransaction({
            value: utils.parseEther(".5"),
            to: address,
            nonce: i,
        });
        console.log(`sendEther for address: ${address}`)
        expected.push(address);
    }

    beforeAll(async () => {
        await stopMiner();
        let i = 0;
        // block 1
        for (; i < 2; i++) await sendEther(i);
        await mineBlock();
        // block 2
        for (; i < 2; i++) await sendEther(i);
        await mineBlock();
        // block 3
        for (; i < 3; i++) await sendEther(i);
        await mineBlock();
        await stopMiner();
    });

    it('should find all the addresses', async () => {
        const actual = await findEther(FROM_ADDRESS);
        const err = `Sent ether to ${expected.length} addresses, you returned ${actual.length}`;
        assert.equal(actual.length, expected.length, err);
        assert.sameMembers(actual, expected);
    });
});
