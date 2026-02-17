#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios');
const prompts = require('prompts');
const minimist = require('minimist');
const chalk = require('chalk');
const logger = require('./utils/logger');
const basicScanner = require('./scanners/basicScanner');
const advancedScanner = require('./scanners/advancedScanner');
const { RECIPIENT_WALLET_ADDRESS, SOLANA_RPC_ENDPOINT } = require('./constants');

const PREMIUM_LOCK_FILE = '.safepush_premium';

function isPremiumUnlocked() {
  return fs.existsSync(PREMIUM_LOCK_FILE);
}

function unlockPremium() {
  fs.writeFileSync(PREMIUM_LOCK_FILE, 'unlocked');
  logger.success('Premium features unlocked! Thank you for your support! 🙏');
}

async function verifyDonation() {
  logger.header('Premium Unlock via Solana Donation 💎');
  logger.info(`To unlock premium features, please send a small donation (e.g., ~$2 in SOL) to this address:`);
  logger.log(chalk.bold.cyan(RECIPIENT_WALLET_ADDRESS));
  logger.info('Once sent, please provide the transaction details below.');

  const response = await prompts([
    {
      type: 'text',
      name: 'fromAddress',
      message: 'What is the wallet address you sent the donation FROM?',
    },
    {
      type: 'text',
      name: 'txid',
      message: 'What is the transaction hash (signature)?',
    },
  ]);

  if (!response.fromAddress || !response.txid) {
    logger.danger('Unlock process cancelled.');
    return;
  }

  logger.info('Verifying transaction... This may take a moment.');

  try {
    const rpcResponse = await axios.post(SOLANA_RPC_ENDPOINT, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getTransaction',
      params: [response.txid, 'json'],
    });

    const transaction = rpcResponse.data.result;

    if (!transaction) {
      throw new Error('Transaction not found. Make sure the transaction has been confirmed on the network.');
    }

    const { postBalances, preBalances } = transaction.meta;
    const accountKeys = transaction.transaction.message.accountKeys;
    const fromIndex = accountKeys.findIndex(acc => acc === response.fromAddress);
    const toIndex = accountKeys.findIndex(acc => acc === RECIPIENT_WALLET_ADDRESS);

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error('The "from" or "to" address does not match the transaction details.');
    }
    
    const fromBalanceChange = postBalances[fromIndex] - preBalances[fromIndex];
    const toBalanceChange = postBalances[toIndex] - preBalances[toIndex];

    if (fromBalanceChange < 0 && toBalanceChange > 0) {
      logger.success('Donation confirmed!');
      unlockPremium();
    } else {
      throw new Error('Transaction details are incorrect. Could not verify the transfer.');
    }

  } catch (error) {
    logger.danger('Verification failed!');
    logger.info(error.message || 'Please double-check your transaction hash and wallet address. It can also take a few minutes for a transaction to be confirmed.');
  }
}


async function main() {
  const args = minimist(process.argv.slice(2));

  logger.log(chalk.bold.magenta('--- Welcome to SafePush! 🛡️ ---'));
  logger.info('A friendly tool to help you avoid committing secrets to your code.');

  if (args.unlock) {
    await verifyDonation();
    return;
  }

  const premium = isPremiumUnlocked();

  if (premium) {
    logger.success('Premium features are enabled. Running full scan.');
  } else {
    logger.info('Running in free mode. For advanced scanning, unlock premium features.');
    logger.link('Run `npx vibe-safe-push --unlock` to begin.');
  }

  await basicScanner();

  if (premium) {
    await advancedScanner();
  }

  logger.header('Scan Complete');
  logger.info('Remember to always keep your secrets safe!');
}

main();
