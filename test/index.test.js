// test/index.test.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Web3DeFi = require('../index');

chai.use(chaiAsPromised);
const expect = chai.expect;

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your Infura project ID

describe('Web3DeFi', () => {
  let web3Defi;

  before(() => {
    web3Defi = new Web3DeFi(providerUrl);
  });

  describe('#getBalance', () => {
    it('should return a balance for a valid Ethereum address', async () => {
      const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // Vitalik's address
      const balance = await web3Defi.getBalance(address);
      expect(balance).to.be.a('string');
    });
  });

  describe('#sendTransaction', () => {
    it('should throw an error for an invalid transaction', async () => {
      const invalidTx = {};
      await expect(web3Defi.sendTransaction(invalidTx)).to.be.rejectedWith('Invalid transaction');
    });
  });

  describe('#getUniswapTrade', () => {
    it('should return a Uniswap trade object', async () => {
      const trade = await web3Defi.getUniswapTrade('1000000000000000000', 'ETH', 'DAI');
      expect(trade).to.be.an('object');
      expect(trade).to.have.property('route');
      expect(trade).to.have.property('tradeType');
    });
  });

  describe('#getMakerDAOExchangeRate', () => {
    it('should return the MakerDAO DAI exchange rate', async () => {
      const exchangeRate = await web3Defi.getMakerDAOExchangeRate();
      expect(exchangeRate).to.be.a('string');
    });
  });
});