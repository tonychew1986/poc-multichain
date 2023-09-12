var bip39 = require('bip39')
var crypto = require('crypto')
var ethers = require('ethers')
var HDNodeWallet = require('ethers/wallet')

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

// what you describe as 'seed'
var  randomBytes = crypto.randomBytes(16) // 128 bits is enough

// your 12 word phrase
var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

// "when aunt guess group anxiety country rival inspire rug advice emerge party"; //bip39.entropyToMnemonic(randomBytes.toString('hex')) 

// what is accurately described as the wallet seed
var seed = bip39.mnemonicToSeedSync(mnemonic) // you'll use this in #3 below

console.log("mnemonic ", mnemonic);
console.log("seed ", seed);

//const path = "m/44'/0/0"
//console.log("path ", path);

// const mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost'
// const seed = bip39.mnemonicToSeed(mnemonic)
const root = bip32.fromSeed(seed)
console.log("root ", root);

var acct = root.derivePath("m/44'/61'/0'");

// const child1 = root.derivePath("m/44'/60'/0'/0/0")
// const child2 = root.derivePath("m/44'/60'/0'/0/1")
// const child3 = root.derivePath("m/44'/60'/0'/0/2")

// console.log("child1 ", child1);
// console.log("child2 ", child2);
// console.log("child3 ", child3);

const xpub = acct.neutered().toBase58();
console.log("xpub ", xpub);

const HDNode = ethers.HDNodeWallet.fromExtendedKey(xpub);
console.log("HDNode ", HDNode);


const address0 = HDNode.derivePath("0/0");
const address1 = HDNode.derivePath("0/1");
const address2 = HDNode.derivePath("0/2");
const address3 = HDNode.derivePath("0/3");
const address4 = HDNode.derivePath("0/4");
const address5 = HDNode.derivePath("0/5");

console.log("address0 ", address0)
console.log("address1 ", address1)
console.log("address2 ", address2)
console.log("address3 ", address3)
console.log("address4 ", address4)
console.log("address5 ", address5)