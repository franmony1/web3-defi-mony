// lib/social.js
const Twitter = require('twitter');

/**
 * Social class for sharing content on social media platforms.
 */
class Social {
  /**
   * Constructor to initialize the Social class with a provider.
   * @param {ethers.providers.JsonRpcProvider} provider - The Ethereum provider.
   */
  constructor(provider) {
    this.provider = provider;
    this.twitterClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
  }

  /**
   * Share content on a social media platform.
   * @param {string} content - The content to be shared.
   * @param {string} platform - The social media platform (e.g., 'twitter').
   * @returns {Promise<void>}
   */
  async shareContent(content, platform) {
    try {
      console.log(`Sharing content '${content}' on ${platform}`);

      if (platform === 'twitter') {
        await this.twitterClient.post('statuses/update', { status: content });
        console.log('Content shared successfully on Twitter');
      } else {
        console.warn(`Unsupported platform: ${platform}`);
      }
    } catch (error) {
      console.error('Error sharing content:', error);
      throw error;
    }
  }
}

module.exports = Social;