var bip39 = require('bip39')
var crypto = require('crypto')
var ethers = require('ethers')
// var HDNodeWallet = require('ethers/wallet')

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

// your 12 word phrase
var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

const rootPath = "m/44'/6111111'/0'/0'/0'/0'";

let xpub = genXpub(mnemonic, rootPath)
console.log("xpub ", xpub);

let address1 = genDerivationAddress(xpub, rootPath, "0/0")
let address2 = genDerivationAddress(xpub, rootPath, "0/1")
let address3 = genDerivationAddress(xpub, rootPath, "0/2")

function genXpub(mnemonic, rootPath) {
    var seed = bip39.mnemonicToSeedSync(mnemonic)
    console.log("seed ", seed);
    
    const root = bip32.fromSeed(seed)
    console.log("root ", root);
    
    var acct = root.derivePath(rootPath);
    
    const xpub = acct.neutered().toBase58();
    console.log("xpub ", xpub);

    return xpub
}

function genDerivationAddress(xpub, rootPath, subPath) {
    let HDNode = ethers.utils.HDNode.fromExtendedKey(xpub);
    console.log("HDNode ", HDNode);
    
    const address = HDNode.derivePath(subPath);
    console.log("address ", address.address)

    return address.address
}

exports.genXpub = genXpub;
exports.genDerivationAddress = genDerivationAddress;