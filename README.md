Multi Blockchain Code
=====================================

<URL>

How does this work?
----------------

This repository contains code for various blockchain. Code implementation is associated with "Generate key + address" & "Sign + Send transactions"


Implementation reference
----------------

Refer to https://iancoleman.io/bip39/


Considerations
----------------

1. Implementation is intentionally separated into MainNet & TestNet to reduce application & business logic. This also helps make independent testing and feature verification easier


Caveats
----------------

1. Signing feature only consist of co-signing and may not consist of additional implementation to handle UTXO, Combine PSBT or handle different address format


Feature Readiness
----------------

## Mainnet

| Blockchain        | Single Gen Address           | Single Coin Transfer | Single Token Transfer | Multi Gen Address           | Multi Coin Transfer | Multi Token Transfer |
| ------------- |:-------------:| -----:|-----:|-----:|-----:|-----:|
| Bitcoin      | :heavy_check_mark: | &cross; | :no_entry_sign: | :heavy_check_mark: | &cross; | :no_entry_sign: |
| Litecoin     | :heavy_check_mark:      |   &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| Ethereum | :heavy_check_mark:      |    :heavy_check_mark: | :heavy_check_mark: | &cross; | &cross; | &cross; |
| Bitcoin Cash | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| Cosmos | :construction:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Binance Smart Chain | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | &cross; | &cross; | &cross; |
| Dogecoin | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| Dash | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| Tron | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Polygon | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | &cross; | &cross; | &cross; |
| Solana | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Avalanche | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Ethereum Classic | :heavy_check_mark:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Algorand | :construction:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Hedera | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Filecoin | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Arbitrum | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Aptos | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| TonCoin | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Optimism | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Sui | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Stellar | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Ripple | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Decred | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Nano | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |

## Testnet

| Blockchain        | Single Gen Address           | Single Coin Transfer | Single Token Transfer | Multi Gen Address           | Multi Coin Transfer | Multi Token Transfer |
| ------------- |:-------------:| -----:|-----:|-----:|-----:|-----:|
| Bitcoin      | :heavy_check_mark: | :heavy_check_mark: | :no_entry_sign: | :heavy_check_mark: | :heavy_check_mark: | :no_entry_sign: |
| Litecoin     | :heavy_check_mark:      |   &cross; | :no_entry_sign: | :heavy_check_mark: | &cross; | :no_entry_sign: |
| Ethereum (Goerli) | :heavy_check_mark:      |    :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Bitcoin Cash | :construction:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| Cosmos | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Binance Smart Chain | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | :heavy_check_mark: | &cross; | &cross; |
| Dogecoin | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| Dash | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| Tron | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Polygon (Mumbai) | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| Solana | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Avalanche | :heavy_check_mark:      |    &cross; | &cross; | :heavy_check_mark: | &cross; | &cross; |
| Ethereum Classic | :heavy_check_mark:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Algorand | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Hedera | &cross;      |    &cross; | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| Filecoin | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Arbitrum | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Aptos | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| TonCoin | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Optimism | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Sui | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Stellar | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Ripple | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Decred | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| Nano | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |


----------------


## Instructions

To run code script:

```bash
$ node [file]
```

Install NPM modules on fresh deployment:

```bash
$ npm install
```

Running test suite:

```bash
$ npm test
```
