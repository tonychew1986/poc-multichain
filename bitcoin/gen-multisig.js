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

var seed1 = bip39.mnemonicToSeedSync(mnemonic1) 
var seed2 = bip39.mnemonicToSeedSync(mnemonic2) 
var seed3 = bip39.mnemonicToSeedSync(mnemonic3) 

// console.log("mnemonic1 ", mnemonic1);
console.log("seed1 ", seed1);
console.log("seed2 ", seed2);
console.log("seed3 ", seed3);

const root1 = bip32.fromSeed(seed1)
const root2 = bip32.fromSeed(seed2)
const root3 = bip32.fromSeed(seed3)
console.log("root1 ", root1);
console.log("root2 ", root2);
console.log("root3 ", root3);

var acct1 = root1.derivePath("m/48'/0'/0'/2'");
var acct2 = root2.derivePath("m/48'/0'/0'/2'");
var acct3 = root3.derivePath("m/48'/0'/0'/2'");

const child1 = acct1.derivePath("0/2")
const child2 = acct2.derivePath("0/2")
const child3 = acct3.derivePath("0/2")

console.log("child1 ", child1);
console.log("child2 ", child2);
console.log("child3 ", child3);

const xpub1 = acct1.neutered().toBase58();
const xpub2 = acct2.neutered().toBase58();
const xpub3 = acct3.neutered().toBase58();

function convertXpubToZpub(xpub) {
    let data = b58.decode(xpub)
    data = data.slice(4);
    data = Buffer.concat([Buffer.from('02aa7ed3','hex'), data]); // see https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2017-September/014907.html for tenative (non-BIP-official) version bytes
    let zpub = b58.encode(data);
    console.log("zpub ", zpub);

    return zpub;
}

let zpub1 = convertXpubToZpub(xpub1);
let zpub2 = convertXpubToZpub(xpub2);
let zpub3 = convertXpubToZpub(xpub3);

// let child1 = bitcoin.payments.p2wsh({
//   //redeem: bitcoin.payments.p2wpkh({
//     pubkey: bip32.fromBase58(xpub1).derive(0).derive(1).publicKey,
//   //}),
// });
// let child2 = bitcoin.payments.p2wsh({
//   //redeem: bitcoin.payments.p2wpkh({
//     pubkey: bip32.fromBase58(xpub2).derive(0).derive(1).publicKey,
//   //}),
// });
// let child3 = bitcoin.payments.p2wsh({
//   //redeem: bitcoin.payments.p2wpkh({
//     pubkey: bip32.fromBase58(xpub3).derive(0).derive(1).publicKey,
//   //}),
// });

let childPubkey1 = child1.publicKey.toString('hex');
let childPubkey2 = child2.publicKey.toString('hex');
let childPubkey3 = child3.publicKey.toString('hex');

console.log("childPubkey1 ", childPubkey1);
console.log("childPubkey2 ", childPubkey2);
console.log("childPubkey3 ", childPubkey3);

const pubArray = [];
pubArray.push(childPubkey1);
pubArray.push(childPubkey2);
pubArray.push(childPubkey3);

pubArray.sort();

const pubkeys = [
  pubArray[0],
  pubArray[1],
  pubArray[2],
].map((hex) => Buffer.from(hex, 'hex'));
console.log("pubkeys ",pubkeys);

const network = bitcoin.networks.bitcoin;

const p2ms = bitcoin.payments.p2ms({ m: 2, pubkeys, network })
const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network })
console.log("p2ms ",p2ms);
console.log("p2wsh ",p2wsh);
const witnessScript = p2wsh.redeem.output;
console.log("witnessScript ", witnessScript.toString('hex'));

console.log("p2wsh.address ",p2wsh.address);