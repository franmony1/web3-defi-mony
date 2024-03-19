// test/security.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Security = require('../lib/security');

chai.use(chaiAsPromised);
const expect = chai.expect;

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your Infura project ID
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

describe('Security', () => {
  let security;

  before(() => {
    security = new Security(provider);
  });

  describe('#checkVulnerabilities', () => {
    it('should check vulnerabilities without errors', async () => {
      const contractAddress = '0x...'; // Replace with a valid contract address
      const contractSource = '/* Solidity contract source code */';
      await expect(security.checkVulnerabilities(contractAddress, contractSource)).to.be.fulfilled;
    });
  });
});