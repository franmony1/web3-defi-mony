// test/crosschain.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const CrossChain = require('../lib/crosschain');

chai.use(chaiAsPromised);
const expect = chai.expect;

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your Infura project ID
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

describe('CrossChain', () => {
  let crossChain;

  before(() => {
    crossChain = new CrossChain(provider);
  });

  describe('#transferTokens', () => {
    it('should transfer tokens across chains without errors', async () => {
      const fromAddress = '0x...'; // Replace with a valid Ethereum address
      const toAddress = '0x...'; // Replace with a valid Ethereum address
      const amount = ethers.utils.parseEther('0.001');
      const tokenAddress = '0x...'; // Replace with a valid token contract address
      await expect(crossChain.transferTokens(fromAddress, toAddress, amount, tokenAddress)).to.be.fulfilled;
    });
  });
});