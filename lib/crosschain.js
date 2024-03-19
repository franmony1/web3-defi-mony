// lib/crosschain.js
const { Connext } = require('@connext/vector-client');

/**
 * CrossChain class for transferring tokens across different blockchain networks.
 */
class CrossChain {
  /**
   * Constructor to initialize the CrossChain class with a provider.
   * @param {ethers.providers.JsonRpcProvider} provider - The Ethereum provider.
   */
  constructor(provider) {
    this.provider = provider;
    this.connext = new Connext({
      ethProviderUrl: provider.connection.url,
      // Add other Connext configuration options as needed
    });
  }

  /**
   * Transfer tokens from one blockchain network to another.
   * @param {string} fromAddress - The address to transfer tokens from.
   * @param {string} toAddress - The address to transfer tokens to.
   * @param {string} amount - The amount of tokens to transfer.
   * @param {string} tokenAddress - The address of the token contract.
   * @returns {Promise<string>} The transaction hash of the token transfer.
   */
  async transferTokens(fromAddress, toAddress, amount, tokenAddress) {
    try {
      console.log(`Transferring ${amount} tokens from ${fromAddress} to ${toAddress} on ${this.provider.chainId} chain`);

      // Approve Connext to spend the tokens
      const tokenContract = new ethers.Contract(tokenAddress, ['function approve(address spender, uint256 amount) public returns (bool)'], this.provider.getSigner(fromAddress));
      await tokenContract.approve(this.connext.address, amount);

      // Initiate the cross-chain transfer
      const transferResult = await this.connext.transfer({
        amount,
        tokenAddress,
        fromAddress,
        toAddress,
        toChainId: 1 // Replace with the desired chain ID for the destination chain
      });

      console.log('Tokens transferred successfully');
      return transferResult.transferId;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  }
}

module.exports = CrossChain;