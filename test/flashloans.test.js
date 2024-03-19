// test/flashloans.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const FlashLoans = require('../lib/flashloans');

chai.use(chaiAsPromised);
const expect = chai.expect;

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your Infura project ID
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

describe('FlashLoans', () => {
  let flashLoans;

  before(() => {
    flashLoans = new FlashLoans(provider);
  });

  describe('#executeFlashLoan', () => {
    it('should execute a flash loan without errors', async () => {
      const amount = ethers.utils.parseEther('0.1');
      const tokenAddress = '0x...'; // Replace with a valid token contract address
      const callback = async (error, data) => {
        // Perform arbitrary logic with the borrowed funds
        console.log('Executing callback with borrowed funds:', data);
      };
      await expect(flashLoans.executeFlashLoan(amount, tokenAddress, callback)).to.be.fulfilled;
    });
  });
});