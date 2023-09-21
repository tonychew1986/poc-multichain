const bitcoin = require('bitcoinjs-lib');

const ecc = require('tiny-secp256k1')

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);


const psbtString = 'cHNidP8BAFICAAAAAb5h1vTgkR5h9Q/j7jNGUuOSBLcx24pl+7Nk6TKwQ9+tAAAAAAD9////AYRKHQAAAAAAFgAUWWsK2iDD3jPNTISJh0qSqrtNZT60JiYAAAEBHylLHQAAAAAAFgAUk17iR6q35yLOVyPCvqaF2ZSLSJQBAMACAAAAAAEBvD/QJGLbsnQ/0klZtmVzTSxRlMeukOcQuDlEMnbUE10AAAAAAP3///8BKUsdAAAAAAAWABSTXuJHqrfnIs5XI8K+poXZlItIlAJIMEUCIQCNPwVZx2EE9p4ROz2in0YbQlJGVRSgacD9G9L7KXsr5AIgQyOqGDCdlNuv/dCEWFpz7OAyfVGz6ceSzRZCDGUDlzYBIQOzZBwD2kbmE98OOS1DD4bxK0FBNKgZl0pOSgrrHPtnca4mJgAiBgN43Ymdm5v3cSGZArV7FRRN7y/TXT/9p3SBiANKkWHv1xhDxX5JVAAAgAEAAIAAAACAAAAAAAEAAAAAIgIDs2QcA9pG5hPfDjktQw+G8StBQTSoGZdKTkoK6xz7Z3EYQ8V+SVQAAIABAACAAAAAgAAAAAACAAAAAA==';

const network = bitcoin.networks.testnet; // Use 'bitcoin.networks.bitcoin' for mainnet

const psbt = bitcoin.Psbt.fromBase64(psbtString, { network });

// Define the private key for the input
// const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); // Replace with your private key // 3
const privateKey = ECPair.fromWIF('cSJYPM1Mbcemoju3ArnSwr87VGoJaJBcUcH4DZRUCupWxUUDSxVf', network); //2

psbt.signInput(0, privateKey)
// Sign the PSBT with the private key
// psbt.signAllInputs(privateKey);

// Finalize the PSBT to get a fully signed transaction
psbt.finalizeAllInputs();

const psbtSigned = psbt.toBase64();
console.log("psbtSigned ", psbtSigned); // nice. correct

const signedTx = psbt.extractTransaction();
console.log("signedTx ", signedTx)
const signedTxHex = signedTx.toHex();
console.log("signedTxHex ", signedTxHex);

// this code works
// broadcast using https://blockstream.info/testnet/tx/push