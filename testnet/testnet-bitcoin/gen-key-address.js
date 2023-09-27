var bip39 = require('bip39')
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')
var b58 = require('bs58check')

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

const TESTNET = bitcoin.networks.testnet;

// your 12 word phrase
var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

const rootPath = "m/84'/1'/0'";
// const subPath = "0/0";
// const fullPath = rootPath + subPath;

const BTC_TEST = {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x045f1cf6,
      private: 0x045f18bc,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
}

let {xpub, vpub} = genXpub(mnemonic, rootPath)
console.log("xpub ", xpub);
console.log("vpub ", vpub);

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
    
    let data = b58.decode(xpub)
    data = data.slice(4);
    data = Buffer.concat([Buffer.from('045f1cf6','hex'), data]); // see https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2017-September/014907.html for tenative (non-BIP-official) version bytes
    let vpub = b58.encode(data);
    console.log("vpub ", vpub);

    return {xpub, vpub}
}


function genDerivationAddress(xpub, rootPath, subPath) {
    let fullPath = rootPath + '/' + subPath;
    console.log(xpub, rootPath, subPath);
    console.log(fullPath);

    let path_index = subPath.split("/");
    let account_index = parseInt(path_index[0]);
    let address_index = parseInt(path_index[1]);

    let node = bip32.fromBase58(xpub);
    console.log("node ", node);

    const { address } = bitcoin.payments.p2wpkh({
        pubkey: node.derive(account_index).derive(address_index).publicKey,
        network: bitcoin.networks.testnet
    });
    console.log("address ", address);

    return address
}

exports.genXpub = genXpub;
exports.genDerivationAddress = genDerivationAddress;