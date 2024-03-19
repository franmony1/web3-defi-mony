// index.js
const Web3 = require('web3');
const { ethers } = require('ethers');
const { Token, TokenAmount, TradeType, Route, Trade, Pair, Fetcher } = require('@uniswap/sdk');
const { DAI } = require("@makerdao/dai");
const FlashLoans = require('./lib/flashloans');
const CrossChain = require('./lib/crosschain');
const Automation = require('./lib/automation');
const Social = require('./lib/social');
const Security = require('./lib/security');
const Analysis = require('./lib/analysis');
const SmartContracts = require('./lib/smartcontracts');

/**
 * Web3DeFi is a library for interacting with Ethereum blockchain and DeFi protocols.
 */
class Web3DeFi {
  /**
   * Constructor to initialize the library with a Web3 provider URL.
   * @param {string} providerUrl - The URL of the Web3 provider.
   */
  constructor(providerUrl) {
    this.web3 = new Web3(providerUrl);
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    this.flashLoans = new FlashLoans(this.provider);
    this.crossChain = new CrossChain(this.provider);
    this.automation = new Automation(this.provider);
    this.social = new Social(this.provider);
    this.security = new Security(this.provider);
    this.analysis = new Analysis(this.provider);
    this.smartContracts = new SmartContracts(this.provider);
  }

  /**
   * Get the balance of an Ethereum address.
   * @param {string} address - The Ethereum address.
   * @returns {Promise<string>} The balance of the address.
   */
  async getBalance(address) {
    return await this.web3.eth.getBalance(address);
  }

  /**
   * Send a transaction on the Ethereum network.
   * @param {Object} transaction - The transaction object.
   * @returns {Promise<string>} The transaction hash.
   */
  async sendTransaction(transaction) {
    return await this.web3.eth.sendTransaction(transaction);
  }

  /**
   * Get a Uniswap trade for swapping tokens.
   * @param {string} amountIn - The amount of tokens to swap.
   * @param {string} tokenInSymbol - The symbol of the input token.
   * @param {string} tokenOutSymbol - The symbol of the output token.
   * @returns {Promise<Trade>} The Uniswap trade object.
   */
  async getUniswapTrade(amountIn, tokenInSymbol, tokenOutSymbol) {
    const tokenIn = await Fetcher.fetchTokenData(this.provider, tokenInSymbol);
    const tokenOut = await Fetcher.fetchTokenData(this.provider, tokenOutSymbol);
    const pair = await Fetcher.fetchPairData(tokenIn, tokenOut, this.provider);
    const route = new Route([pair], tokenIn);
    const trade = new Trade(route, new TokenAmount(tokenIn, amountIn), TradeType.EXACT_INPUT);
    return trade;
  }

  /**
   * Get the exchange rate of MakerDAO's DAI stablecoin.
   * @returns {Promise<string>} The exchange rate of DAI.
   */
  async getMakerDAOExchangeRate() {
    const dai = new DAI(this.provider);
    const exchangeRate = await dai.getRate();
    return exchangeRate;
  }
}

module.exports = Web3DeFi;