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
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" width="14px" /></span> <span>Bitcoin</span>      | :heavy_check_mark: | &cross; | :no_entry_sign: | :heavy_check_mark: | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/2.png" width="14px" /></span> <span>Litecoin</span>     | :heavy_check_mark:      |   &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" width="14px" /></span> <span>Ethereum</span> | :heavy_check_mark:      |    :heavy_check_mark: | :heavy_check_mark: | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png" width="14px" /></span> <span>Bitcoin Cash</span> | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png" width="14px" /></span> <span>Cosmos</span> | :construction:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" width="14px" /></span> <span>Binance Smart Chain</span> | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/74.png" width="14px" /></span> <span>Dogecoin</span> | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/131.png" width="14px" /></span> <span>Dash</span> | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png" width="14px" /></span> <span>Tron</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" width="14px" /></span> <span>Polygon</span> | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png" width="14px" /></span> <span>Solana</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png" width="14px" /></span> <span>Avalanche</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1321.png" width="14px" /></span> <span>Ethereum Classic</span> | :heavy_check_mark:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/4030.png" width="14px" /></span> <span>Algorand</span> | :construction:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/4642.png" width="14px" /></span> <span>Hedera</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/2280.png" width="14px" /></span> <span>Filecoin</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png" width="14px" /></span> <span>Arbitrum</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/21794.png" width="14px" /></span> <span>Aptos</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png" width="14px" /></span> <span>TonCoin</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png" width="14px" /></span> <span>Optimism</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png" width="14px" /></span> <span>Sui</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/512.png" width="14px" /></span> <span>Stellar</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" width="14px" /></span> <span>Ripple</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1168.png" width="14px" /></span> <span>Decred</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1567.png" width="14px" /></span> <span>Nano</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png" width="14px" /></span> <span>Celo</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png" width="14px" /></span> <span>Harmony</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14803.png" width="14px" /></span> <span>Aurora</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png" width="14px" /></span> <span>Fantom</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png" width="14px" /></span> <span>Near</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" width="14px" /></span> <span>Linea</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1659.png" width="14px" /></span> <span>Gnosis</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |

## Testnet

| Blockchain        | [Single] <br/> Gen Address           | [Single] <br/> Coin Transfer | [Single] <br/> Token Transfer | [Multi] <br/> Gen Address           | [Multi] <br/> Coin Transfer | [Multi] <br/> Token Transfer |
| ------------- |:-------------:| -----:|-----:|-----:|-----:|-----:|
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" width="14px" /></span> <span>Bitcoin</span>      | :heavy_check_mark: | :heavy_check_mark: | :no_entry_sign: | :heavy_check_mark: | :heavy_check_mark: | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/2.png" width="14px" /></span> <span>Litecoin</span>     | :heavy_check_mark:      |   &cross; | :no_entry_sign: | :heavy_check_mark: | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" width="14px" /></span> <span>Ethereum</span> | :heavy_check_mark:      |    :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png" width="14px" /></span> <span>Bitcoin Cash</span> | :construction:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png" width="14px" /></span> <span>Cosmos</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" width="14px" /></span> <span>Binance Smart Chain</span> | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/74.png" width="14px" /></span> <span>Dogecoin</span> | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/131.png" width="14px" /></span> <span>Dash</span> | :heavy_check_mark:      |    &cross; | :no_entry_sign: | &cross; | &cross; | :no_entry_sign: |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png" width="14px" /></span> <span>Tron</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png" width="14px" /></span> <span>Polygon</span> | :heavy_check_mark:      |    :heavy_check_mark: | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png" width="14px" /></span> <span>Solana</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png" width="14px" /></span> <span>Avalanche</span> | :heavy_check_mark:      |    &cross; | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1321.png" width="14px" /></span> <span>Ethereum Classic</span> | :heavy_check_mark:      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/4030.png" width="14px" /></span> <span>Algorand</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/4642.png" width="14px" /></span> <span>Hedera</span> | &cross;      |    &cross; | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/2280.png" width="14px" /></span> <span>Filecoin</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png" width="14px" /></span> <span>Arbitrum</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/21794.png" width="14px" /></span> <span>Aptos</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png" width="14px" /></span> <span>TonCoin</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png" width="14px" /></span> <span>Optimism</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png" width="14px" /></span> <span>Sui</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/512.png" width="14px" /></span> <span>Stellar</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" width="14px" /></span> <span>Ripple</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1168.png" width="14px" /></span> <span>Decred</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1567.png" width="14px" /></span> <span>Nano</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png" width="14px" /></span> <span>Celo</span> | :heavy_check_mark:      |    &cross; | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png" width="14px" /></span> <span>Harmony</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14803.png" width="14px" /></span> <span>Aurora</span> | :heavy_check_mark:      |    &cross; | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png" width="14px" /></span> <span>Fantom</span> | :heavy_check_mark:      |    &cross; | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png" width="14px" /></span> <span>Near</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" width="14px" /></span> <span>Linea</span> | &cross;      |    &cross; | &cross; | &cross; | &cross; | &cross; |
| <span><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1659.png" width="14px" /></span> <span>Gnosis</span> | :heavy_check_mark:      |    &cross; | &cross; | :heavy_check_mark: | :heavy_check_mark: | &cross; |


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
