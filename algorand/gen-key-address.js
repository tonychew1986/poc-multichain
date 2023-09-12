var bip39 = require('bip39')
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')
var b58 = require('bs58check')

var algosdk = require('algosdk')

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

const algodclient = new algosdk.Algodv2(token, baseServer, port);

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

// what you describe as 'seed'
var randomBytes = crypto.randomBytes(16) // 128 bits is enough

// your 12 word phrase
var mnemonic = "farm genre hobby banner exact enrich wagon gold define curtain rebuild matrix season chuckle cargo wolf umbrella jump tomorrow utility type pattern pet abandon wait"

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

var acct = root.derivePath("m/44'/283'/0'");
console.log("acct ", acct);
// const LITECOIN = {
//     messagePrefix: '\x19Litecoin Signed Message:\n',
//     bech32: 'ltc',
//     bip32: {
//         public: 0x019da462,
//         private: 0x019d9cfe,
//     },
//     pubKeyHash: 0x30,
//     scriptHash: 0x05,
//     wif: 0xb0,
// };

const child1 = root.derivePath("m/44'/283'/0'/0/0")
const child2 = root.derivePath("m/44'/283'/0'/0/1")
const child3 = root.derivePath("m/44'/283'/0'/0/2")

console.log("child1 ", child1);
console.log("child2 ", child2);
console.log("child3 ", child3);

const xpub = acct.neutered().toBase58();
console.log("xpub ", xpub);

//const xpriv = acct.toBase58();
//console.log("xpriv ", xpriv);

// let data = b58.decode(xpub)
// data = data.slice(4);
// data = Buffer.concat([Buffer.from('04b24746','hex'), data]); // see https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2017-September/014907.html for tenative (non-BIP-official) version bytes
// let zpub = b58.encode(data);
// console.log("zpub ", zpub);

// const child1Address = bitcoin.payments.p2pkh({ pubkey: child1.publicKey, network: LITECOIN }).address
// const child2Address = bitcoin.payments.p2pkh({ pubkey: child2.publicKey, network: LITECOIN }).address
// const child3Address = bitcoin.payments.p2pkh({ pubkey: child3.publicKey, network: LITECOIN }).address

// console.log("child1Address ", child1Address);
// console.log("child2Address ", child2Address);
// console.log("child3Address ", child3Address);

var keys = algosdk.generateAccount();

console.log("keys", keys["addr"]);

var account_mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
console.log("account_mnemonic ", account_mnemonic);

var recoveredAccount = algosdk.mnemonicToSecretKey(account_mnemonic);
console.log("recoveredAccount ", recoveredAccount);

// let testaddr = algosdk.encoding.encode_address(base64.b64decode("ZXUc/psAtm6K6AOMpvytibbSa8H6WFc6O8XTp/rHuEE="))
// console.log("testaddr ", testaddr);

const pk = algosdk.decodeAddress(keys["addr"]);
console.log("pk ", pk,);
const addr = algosdk.encodeAddress(pk.publicKey);
console.log("addr ", addr);

const b64Encoded = 'SGksIEknbSBkZWNvZGVkIGZyb20gYmFzZTY0';
const b64Decoded = Buffer.from(b64Encoded, 'base64').toString();
console.log(b64Encoded, b64Decoded);