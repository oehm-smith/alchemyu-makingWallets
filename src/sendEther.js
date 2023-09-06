const { Wallet, utils, providers } = require('ethers');
// const { ganacheProvider, PRIVATE_KEY } = require('./config');
const { GanacheProvider } = require("@ethers-ext/provider-ganache");

// This didn't work - must be different to what they provide in ./config (not available to me)
const ganacheProvider  = new GanacheProvider();
const PRIVATE_KEY="0xe1add9a119ab885e163201cba07a4d1666b9f51eae48ddf3b8d69235c1151f8a"

const provider = new providers.Web3Provider(ganacheProvider);

const wallet = new Wallet(PRIVATE_KEY);

async function sendEther({ value, to }) {
    const rawTx = await wallet.signTransaction({
        value, to,
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00
    });

    return provider.sendTransaction(rawTx);
}

module.exports = sendEther;
