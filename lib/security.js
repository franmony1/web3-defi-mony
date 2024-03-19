// lib/security.js
const mythx = require('mythx-js');

/**
 * Security class for checking vulnerabilities in smart contracts.
 */
class Security {
  /**
   * Constructor to initialize the Security class with a provider.
   * @param {ethers.providers.JsonRpcProvider} provider - The Ethereum provider.
   */
  constructor(provider) {
    this.provider = provider;
    this.mythXClient = new mythx.Client();
  }

  /**
   * Check vulnerabilities in a smart contract using MythX.
   * @param {string} contractAddress - The address of the smart contract.
   * @param {string} contractSource - The source code of the smart contract.
   * @returns {Promise<void>}
   */
  async checkVulnerabilities(contractAddress, contractSource) {
    try {
      console.log(`Checking vulnerabilities for smart contract at address ${contractAddress}`);

      const issues = await this.mythXClient.analyzeContract(contractSource);
      if (issues.length === 0) {
        console.log('No vulnerabilities found');
      } else {
        console.warn('Vulnerabilities found:', issues);
      }
    } catch (error) {
      console.error('Error checking vulnerabilities:', error);
      throw error;
    }
  }
}

module.exports = Security;