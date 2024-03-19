// test/social.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Social = require('../lib/social');

chai.use(chaiAsPromised);
const expect = chai.expect;

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your Infura project ID
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

describe('Social', () => {
  let social;

  before(() => {
    social = new Social(provider);
  });

  describe('#shareContent', () => {
    it('should share content on Twitter without errors', async () => {
      const content = 'Test tweet from Web3DeFi';
      await expect(social.shareContent(content, 'twitter')).to.be.fulfilled;
    });

    it('should handle unsupported platforms', async () => {
      const content = 'Test content';
      await expect(social.shareContent(content, 'unsupportedPlatform')).to.be.fulfilled;
    });
  });
});