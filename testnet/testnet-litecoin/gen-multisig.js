var bip39 = require('bip39')
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')
var b58 = require('bs58check')

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

// what you describe as 'seed'
var  randomBytes = crypto.randomBytes(16) // 128 bits is enough

// your 12 word phrase
var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"
// Zpub748c2Jcz46nE5gVEdhAuB6nQ9YNCB1KYDXTwb424rCxYboCQYdEzpvd5dyrLQfCqXtNKsca4afEakqbQQFTWV2nGcgjZM1gHSBYpciytGme
var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"
// Zpub74vAEeYWqC16rn8H3u6o965uQ2rBJso1WdjgGp4FfuQ4mzvFQCR9hSD2sXKdtvQbGPHCdcRpt3u2qRKdmfSyUGWp4F5jASp2Fxoo6DTARPh
var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"
// Zpub74DZ7Qh6X2y8XNDQrgnPZLMVjdLSFosijwT3eTYnGwqQC8ibtckWTaaCoX2T1uiSu9ghihDTVT63KcuuG51rVrvh7rWoqXi7XdaozK2qd4z

const rootPath = "m/48'/1'/0'/2'";
const network = bitcoin.networks.testnet;

const LITECOIN = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'tltc',
    bip32: {
        public: 0x019da462,
        private: 0x019d9cfe,
    },
    pubKeyHash: 0x6F,
    scriptHash: 0xC4,
    wif: 0xEF,
};

let xpub1 = genXpub(mnemonic1, rootPath)
let xpub2 = genXpub(mnemonic2, rootPath)
let xpub3 = genXpub(mnemonic3, rootPath)
console.log("xpub1 ", xpub1);
console.log("xpub2 ", xpub2);
console.log("xpub3 ", xpub3);

let Vpub1 = convertXpubToVpub(xpub1);
let Vpub2 = convertXpubToVpub(xpub2);
let Vpub3 = convertXpubToVpub(xpub3);
console.log("Vpub1 ", Vpub1);
console.log("Vpub2 ", Vpub2);
console.log("Vpub3 ", Vpub3);

let address1 = genDerivationAddress([xpub1, xpub2, xpub3], rootPath, ["0/0", "0/0", "0/0"], 2)
let address2 = genDerivationAddress([xpub1, xpub2, xpub3], rootPath, ["0/1", "0/1", "0/1"], 2)
let address3 = genDerivationAddress([xpub1, xpub2, xpub3], rootPath, ["0/2", "0/2", "0/2"], 2)
console.log("address1 ", address1);
console.log("address2 ", address2);
console.log("address3 ", address3);

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

function genDerivationAddress(xpubArray, rootPath, subPathArray, threshold) {
  let multisigQuorum = xpubArray.length;

  let fullPathArray = [];
  let pubKeyArray = [];
  for (var i=0; i<multisigQuorum; i++) {
    let subPath = subPathArray[i];
    let xpub = xpubArray[i];
    fullPathArray.push( rootPath + '/' + subPath);

    let path_index = subPath.split("/");
    let account_index = parseInt(path_index[0]);
    let address_index = parseInt(path_index[1]);
    
    let node = bip32.fromBase58(xpub);
    console.log("node ", node);
    
    let pubKey = node.derive(account_index).derive(address_index).publicKey;
    console.log("pubKey ", pubKey);
    
    let pubKeyString = pubKey.toString('hex');
    console.log("pubKeyString ", pubKeyString);

    pubKeyArray.push(pubKeyString);
  }
  console.log("fullPathArray ", fullPathArray);

  console.log("pubKeyArray ", pubKeyArray);
  pubKeyArray.sort();
  console.log("pubKeyArray ", pubKeyArray);

  const pubkeys = pubKeyArray.map((hex) => Buffer.from(hex, 'hex'));
  console.log("pubkeys ",pubkeys);

  const p2ms = bitcoin.payments.p2ms({ m: threshold, pubkeys, network: LITECOIN })
  const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: LITECOIN })
  console.log("p2ms ",p2ms);
  console.log("p2wsh ",p2wsh);
  const witnessScript = p2wsh.redeem.output;
  console.log("witnessScript ", witnessScript.toString('hex'));

  console.log("p2wsh.address ",p2wsh.address);

  return p2wsh.address
}


function convertXpubToVpub(xpub) {
    let data = b58.decode(xpub)
    data = data.slice(4);
    data = Buffer.concat([Buffer.from('02575483','hex'), data]); // see https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2017-September/014907.html for tenative (non-BIP-official) version bytes
    let Vpub = b58.encode(data);
    console.log("Vpub ", Vpub);

    return Vpub;
}

exports.genXpub = genXpub;
exports.convertXpubToVpub = convertXpubToVpub;
exports.genDerivationAddress = genDerivationAddress;