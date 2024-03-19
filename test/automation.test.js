// test/automation.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Automation = require('../lib/automation');

chai.use(chaiAsPromised);
const expect = chai.expect;

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your Infura project ID
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

describe('Automation', () => {
  let automation;

  before(() => {
    automation = new Automation(provider);
  });

  describe('#automateTask', () => {
    it('should automate a periodic transaction task', async () => {
      const taskParams = {
        from: '0x...', // Replace with a valid Ethereum address
        to: '0x...', // Replace with a valid Ethereum address
        value: ethers.utils.parseEther('0.001'),
        interval: 10000 // 10 seconds
      };
      await expect(automation.automateTask('periodicTransaction', taskParams)).to.be.fulfilled;
    });

    it('should automate a monitoring task', async () => {
      const taskParams = {
        contractAddress: '0x...', // Replace with a valid contract address
        eventNames: ['Transfer']
      };
      await expect(automation.automateTask('monitoring', taskParams)).to.be.fulfilled;
    });

    it('should handle unsupported tasks', async () => {
      const taskParams = {};
      await expect(automation.automateTask('unsupportedTask', taskParams)).to.be.fulfilled;
    });
  });
});