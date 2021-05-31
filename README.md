# [Solidity](https://reference.auditless.com/cheatsheet/) Template

![Solidity Hardhat Typescript Waffle Graphic](./.readme.png)

Includes:

- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [TypeChain](https://github.com/ethereum-ts/TypeChain): generate TypeScript types for smart contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
- [Waffle](https://github.com/EthWorks/Waffle): tooling for writing comprehensive smart contract tests
- [Solhint](https://github.com/protofire/solhint): linter
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter

This is a GitHub template, which means you can reuse it as many times as you want. You can do that by clicking the "Use this template" button at the top of the page.

## Usage

### Prerequisites

Set up your .env with:

```sh
cp -v .env.example .env
```

* [MNEMONIC](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase-Secret-Recovery-Phrase)
* [INFURA_API_KEY](https://infura.io/)
* [ETHERSCAN_API_KEY](https://etherscan.io/)
* REPORT_GAS=true

Before running any command, make sure to install dependencies:

```sh
yarn
```

### Prettier

```sh
yarn lint:prettier
```

### Linting 

If you want to re-initialize Solhint's configuration file with all the default rules enabled:

```sh
yarn && solhint --init
```

Or replace the existing file with:

```json
{
  "extends": "solhint:default"
}
```

Lint all the files inside the `contracts` directory:

```sh
solhint 'contracts/**/*.sol'
```

Or use the included:

```sh
yarn lint:sol
```

Or both Prettier and Solhint:

```sh
yarn lint
```

### Compile

Compile the smart contracts with Hardhat:

```sh
yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
yarn build
```

### Test

Run the Mocha tests:

```sh
yarn test
```

### Deploy contract to network 
_(requires Mnemonic and Infura API key)_

```
npx hardhat run --network rinkeby ./scripts/deploy.ts
```

### Validate a contract with Etherscan 
_(requires Etherscan API key)_

```
npx hardhat verify --network <network> <DEPLOYED_CONTRACT_ADDRESS> "Constructor argument 1"
```

### Added plugins

- Gas reporter [(hardhat-gas-reporter)](https://hardhat.org/plugins/hardhat-gas-reporter.html)
- Etherscan [(hardhat-etherscan)](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)
- Open Zeppelin [(@openzeppelin/hardhat-upgrades)](https://docs.openzeppelin.com/upgrades-plugins/1.x/hardhat-upgrades)

## Other 

### Prettier

```sh
npx prettier --write 'contracts/**/*.sol'
```

### Solidity Resources
* [Cheatsheet](./solidity-cheatsheet.md)
* [Style Guide](https://docs.soliditylang.org/en/develop/style-guide.html)

### Solhint

* [Rules](https://tokenhouse.github.io/solhint/rules.html)
* [Style Guide](https://protofire.github.io/solhint/docs/rules.html#style-guide-rules)

To disable all validations in the line following a comment:

```sol
 // solhint-disable-next-line
```

Current line:

```sol
  uint pseudoRand = uint(keccak256(abi.encodePacked(now, blockhash(block.number)))); // solhint-disable-line
```

Group of lines:

```sol
 /* solhint-disable */
 ...
  /* solhint-enable */
```

#### Additional Solidity Resources
* [Blog](https://blog.soliditylang.org/)
* [Cheatsheet](https://reference.auditless.com/cheatsheet/)
* [Voting Example](https://ethereum.org/en/developers/docs/smart-contracts/languages/)
* [Examples](https://solidity-by-example.org/)
* [Ethereum Docs](https://ethereum.org/en/developers/docs/)
* [App Stack Example](https://github.com/austintgriffith/scaffold-eth#-ui-library)
* [Awesome](https://github.com/bkrem/awesome-solidity/blob/master/README.md)
* [hardhat-docgen](https://github.com/ItsNickBarry/hardhat-docgen)

#### Todo
* @nomiclabs/hardhat-solhint
* hardhat-deploy-ethers
* @nomiclabs/hardhat-deploy
* @openzeppelin/hardhat-upgrades
* hardhat-watcher
* buidler-contract-sizer/ hardhat-contract-sizer

### Branding
<div style='text-align: center'>
<img src='https://raw.githubusercontent.com/ethereum/solidity/develop/docs/logo.svg' width='100px'>
</div>
