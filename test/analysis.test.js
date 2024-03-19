// test/analysis.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Analysis = require('../lib/analysis');

chai.use(chaiAsPromised);
const expect = chai.expect;

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your Infura project ID
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

describe('Analysis', () => {
  let analysis;

  before(() => {
    analysis = new Analysis(provider);
  });

  describe('#analyzeData', () => {
    it('should analyze data without errors', async () => {
      const data = [1, 2, 3, 4, 5];
      await expect(analysis.analyzeData(data)).to.be.fulfilled;
    });
  });
});