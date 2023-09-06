const { Wallet, providers } = require('ethers');

// This doesn't exist (config file) and can't get it to work so this code is just in here as record for how I solved the exercise
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

function findMyBalance(privateKey) {
    // retrieve the balance, given a private key
    const wallet = new Wallet(privateKey)
    return wallet.getBalance()
}

module.exports = findMyBalance;
