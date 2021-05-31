import { task } from 'hardhat/config';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(__dirname, './.env') });

import { HardhatUserConfig } from 'hardhat/types';
import { NetworkUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import 'hardhat-typechain';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';

import path from 'path';
import fs from 'fs';

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

const VERBOSE = false;
const MNEMONIC = process.env.MNEMONIC || '';
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL || '';

const traverseKeys = (obj: any, results = []) => {
  const r: any = results;
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value !== 'object' || typeof value !== 'function') {
      console.log(value);
      r.push(value);
    } else if (typeof value === 'object') {
      traverseKeys(value, r);
    }
  });
  return r;
};

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(await account.address);
  }
});

task('networks', 'Prints network settings', async (args, hre) => {
  console.log(`Network settings => `);

  console.log(`Hardhat Runtime Environment => `)
  console.log(Object.keys(hre));

  VERBOSE && console.log(`Full HRE => `)
  VERBOSE && console.log(traverseKeys(hre));

  VERBOSE && console.log(Object.keys(hre['config']['networks']['alchemy']));

  console.log(`Alchemy => `)
  console.log(hre['config']['networks']['alchemy']);

  console.log(`Ropsten => `)
  console.log(hre['config']['networks']['ropsten']);
})

const createTestnetConfig = (
  network: keyof typeof chainIds,
): NetworkUserConfig => {
  const url: string = 'https://' + network + '.infura.io/v3/' + INFURA_API_KEY;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    url,
  };
};

/* You need to export an object to set up your config
  Go to https://hardhat.org/config/ to learn more */
const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: chainIds.hardhat,
    },
    goerli: createTestnetConfig('goerli'),
    kovan: createTestnetConfig('kovan'),
    rinkeby: createTestnetConfig('rinkeby'),
    ropsten: createTestnetConfig('ropsten'),
    alchemy: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${ETH_PRIVATE_KEY}`]
    }
  },
  solidity: {
    compilers: [
      { version: '0.6.12', },
      { version: '0.6.6', },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
  },
};

export default config;
