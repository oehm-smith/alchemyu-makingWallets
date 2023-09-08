const { providers } = require('ethers');
const { ganacheProvider } = require('./findEther.config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
    const transactionAddresses = [];

    for (let blockNumber = await provider.getBlockNumber(); blockNumber >= 0; blockNumber -= 1) {
        const block = await provider.getBlockWithTransactions(blockNumber);
        console.log(`block: ${blockNumber} - num tx: ${block.transactions.length}`)
        transactionAddresses.push(...block.transactions.filter(t1 => t1.from === address).map(t => t.to))
        console.log(`  block: ${blockNumber}, with transaction addresses now: ${JSON.stringify(transactionAddresses)}`)
    }

    return transactionAddresses
}

module.exports = findEther;
