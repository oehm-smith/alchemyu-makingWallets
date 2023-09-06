const { utils, providers, Wallet } = require('ethers');
// const { ganacheProvider } = require('./config');
const ethers = require("ethers")
const Ganache = require("ganache-core");

// const PRIVATE_KEY="0xe1add9a119ab885e163201cba07a4d1666b9f51eae48ddf3b8d69235c1151f8a"
const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const INITIAL_BALANCE = utils.parseEther('10');

const accounts = [].concat([{
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY,
}]);

const ganacheProvider = Ganache.provider({ accounts });

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
    // TODO: donate to charity!
    const wallet = new Wallet(privateKey, provider);
    const value = ethers.utils.parseEther("1")
    for (to of charities) {
        await sendEther({wallet, to, value})
    }
}

async function sendEther({ wallet, value, to }) {
    // const rawTx = await wallet.signTransaction({
    //     value, to,
    //     gasLimit: 0x5208,
    //     gasPrice: 0x3b9aca00
    // });

    // BTW this isn't working - something wrong with the ganache provider and can't easily work it out
    return wallet.sendTransaction({
        value, to,
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00
    });
}

module.exports = { donate, ganacheProvider, PRIVATE_KEY };
