const bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39')
const ecc = require('tiny-secp256k1')

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);

const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)


const psbtString = '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';

const network = bitcoin.networks.testnet; // Use 'bitcoin.networks.bitcoin' for mainnet

const psbt = bitcoin.Psbt.fromBase64(psbtString, { network });

// Define the private key for the input
// const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); // Replace with your private key // 3
// const privateKey = ECPair.fromWIF('cQNMaSxYNGaSLxxh3sSUkmz86CXQo9a3foK9GyXuHjSUhEEoTsWe', network); //2
var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble" 
var seed2 = bip39.mnemonicToSeedSync(mnemonic2)
const root2 = bip32.fromSeed(seed2)

var acct2 = root2.derivePath("m/48'/1'/0'/2'");

const child2 = acct2.derivePath("0/1") // correct
console.log("child2.publicKey ", child2.publicKey)


const child1 = root2.derivePath("m/48'/1'/0'/2'/0/1")
// const child1 = acct1.derivePath("0/1") // wrong
console.log("child1.publicKey ", child1.publicKey)
console.log("child1.toBase58() ", child1.toBase58())

const xpriv = child1.toBase58();
const node = bip32.fromBase58(xpriv, bitcoin.networks.testnet);
console.log("node ", node); 

const child2WIF = child2.toWIF();
console.log("child2WIF ", child2WIF); 
// const privateKey = ECPair.fromWIF(child2WIF, network);
const privateKey = ECPair.fromWIF('cSJYPM1Mbcemoju3ArnSwr87VGoJaJBcUcH4DZRUCupWxUUDSxVf', network);
console.log("privateKey ", privateKey); 
const myKey = ECPair.makeRandom({ network: network });
console.log("myKey ", myKey); 

// const multisig = createPayment('p2sh-p2ms(2 of 4)');
console.log("psbt ", psbt); 

psbt.signInput(0, privateKey)
console.log("psbt ", psbt); 
psbt.signInput(1, privateKey)
// Sign the PSBT with the private key
// psbt.signAllInputs(privateKey);
console.log("psbt ", psbt); 

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