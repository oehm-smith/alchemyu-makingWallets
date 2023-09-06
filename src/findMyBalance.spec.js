const { assert } = require('chai');
const findMyBalance = require('../findMyBalance')
const { PRIVATE_KEY, INITIAL_BALANCE } = require('../config');

// NOT WORKING due to granache provider - I don't have config file and can't get ethers ext granacheProvider working
describe('findMyBalance', () => {
    it('should return an instance of Promise', () => {
        assert(findMyBalance(PRIVATE_KEY) instanceof Promise);
    });
    it('should resolve with the initial balance', async () => {
        const balance = await findMyBalance(PRIVATE_KEY);
        assert(INITIAL_BALANCE.eq(balance));
    });
});
