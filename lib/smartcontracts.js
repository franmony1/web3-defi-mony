// lib/smartcontracts.js
const ethers = require('ethers');
const solc = require('solc');

/**
 * SmartContracts class for deploying and interacting with smart contracts.
 */
class SmartContracts {
  /**
   * Constructor to initialize the SmartContracts class with a provider.
   * @param {ethers.providers.JsonRpcProvider} provider - The Ethereum provider.
   */
  constructor(provider) {
    this.provider = provider;
  }

  /**
   * Deploy a smart contract to the Ethereum network.
   * @param {string} contractSource - The source code of the smart contract.
   * @param {string} fromAddress - The address to deploy the contract from.
   * @param {Array<any>} constructorArgs - The arguments for the contract constructor.
   * @returns {Promise<string>} The address of the deployed contract.
   */
  async deployContract(contractSource, fromAddress, constructorArgs = []) {
    try {
      console.log(`Deploying smart contract from address ${fromAddress}`);

      const input = {
        language: 'Solidity',
        sources: {
          'Contract.sol': {
            content: contractSource
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };

      const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
      const contractFile = Object.values(tempFile.contracts['Contract.sol'])[0];

      const bytecode = `0x${contractFile.evm.bytecode.object}`;
      const abi = contractFile.abi;
      const contract = new ethers.ContractFactory(abi, bytecode, this.provider.getSigner(fromAddress));
      const deployedContract = await contract.deploy(...constructorArgs);
      await deployedContract.deployed();

      console.log('Smart contract deployed successfully');
      return deployedContract.address;
    } catch (error) {
      console.error('Error deploying smart contract:', error);
      throw error;
    }
  }

  /**
   * Interact with a deployed smart contract on the Ethereum network.
   * @param {string} contractAddress - The address of the deployed contract.
   * @param {Array<any>} abi - The ABI (Application Binary Interface) of the contract.
   * @param {string} methodName - The name of the contract method to call.
   * @param {Array<any>} methodArgs - The arguments for the contract method.
   * @param {string} fromAddress - The address to interact with the contract from.
   * @returns {Promise<any>} The result of the contract method call.
   */
  async interactWithContract(contractAddress, abi, methodName, methodArgs, fromAddress) {
    try {
      console.log(`Interacting with smart contract at address ${contractAddress}`);

      const contract = new ethers.Contract(contractAddress, abi, this.provider.getSigner(fromAddress));
      const result = await contract[methodName](...methodArgs);

      console.log('Interaction with smart contract successful');
      return result;
    } catch (error) {
      console.error('Error interacting with smart contract:', error);
      throw error;
    }
  }
}

module.exports = SmartContracts;