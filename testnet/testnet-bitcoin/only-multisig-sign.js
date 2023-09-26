const bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39')
const ecc = require('tiny-secp256k1')

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);

const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)


const psbtString = 'cHNidP8BAF4CAAAAAT6g9koqdURIGZ1DKj3wtdiW0AbtmiRlZ7qwojzWCpYTAAAAAAD9////AW48MgAAAAAAIgAgRHDigaq5CP5tHr8xufGcfpzxYsdFmVIr5prn+7zGXCwXNyYAAAEBK1s9MgAAAAAAIgAgdCpbbSnP61if9A8NqKPu0fcD4Z1zSu8JzbmcgdRMUaIBAP1cAQIAAAAAAQEJC3J2MYRLrmGy7YDFFfwdrUJlUZ5+HKYWzSHrvRnlbQAAAAAA/f///wFbPTIAAAAAACIAIHQqW20pz+tYn/QPDaij7tH3A+Gdc0rvCc25nIHUTFGiBABHMEQCIBLHi8ir/V4c5EnhuEtIdeCNrgV24blbSlXzJs5dBP3YAiBPuRxrdYmCFhvPF7vVHqCN11vl0h1kAmEfJPFJH3oiUwFHMEQCIH2/j0e9eOse63Cxt0i6CSRWA92JueXibZbRryenp9JAAiB/BlnYMaK2/jTrAn1Zyc175P9U8qS2fSKsZ/qmxYrxJgFpUiEC7h5GUpWUJd1dd3MZEm6vLeM9z81cfZBJu2FmTBIdJQUhA3S3YYKRhd+18ozVuq+OV/zHKBJ+DOEwt54/BrWkHZigIQN8KhNhT/BahibRK6h9pEm7PyMu+vEKa0Y8367OPR9oslOuFDcmACICA79JZTbzhRhMkGnYgJARJwMGUlkWRNgwP73GAzB+mRZnRzBEAiAUlGxyEjSv74v2oBwit7wa3aK8X1/LGisziMhPeT818gIgNv18RIbV9hlVu4BwbprKpnJlVOMaij1boyOZJaBKcwwBAQVpUiECQRd74SM3bzL2/x3yHbHhI94QNQdxTUvExvmKMSHUZ2EhAtHcf9IKKAqLPhi5YaoRRLg3fiFB8txTg2FtVQLydN43IQO/SWU284UYTJBp2ICQEScDBlJZFkTYMD+9xgMwfpkWZ1OuIgYCQRd74SM3bzL2/x3yHbHhI94QNQdxTUvExvmKMSHUZ2EMLSI8egAAAAABAAAAIgYC0dx/0gooCos+GLlhqhFEuDd+IUHy3FODYW1VAvJ03jcMkL7MpQAAAAABAAAAIgYDv0llNvOFGEyQadiAkBEnAwZSWRZE2DA/vcYDMH6ZFmccQ8V+STAAAIABAACAAAAAgAIAAIAAAAAAAQAAAAABAWlSIQIkxtJtVCchXrs+ojkC9phEQSgHl4z07/SCI8/9wer+HyED2t1EtxkplyCVzWc6XGgkRdCE/DsC711WnwEtNjmx7LUhA/vPjQndHvHkOamUFErhNX0B41m5urdG4maSmw0LPpyhU64iAgIkxtJtVCchXrs+ojkC9phEQSgHl4z07/SCI8/9wer+HwyQvsylAAAAAAUAAAAiAgPa3US3GSmXIJXNZzpcaCRF0IT8OwLvXVafAS02ObHstQwtIjx6AAAAAAUAAAAiAgP7z40J3R7x5DmplBRK4TV9AeNZubq3RuJmkpsNCz6coRxDxX5JMAAAgAEAAIAAAACAAgAAgAAAAAAFAAAAAA==';

const network = bitcoin.networks.testnet; // Use 'bitcoin.networks.bitcoin' for mainnet

const psbt = bitcoin.Psbt.fromBase64(psbtString, { network });

// Define the private key for the input
// const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); // Replace with your private key // 3
// const privateKey = ECPair.fromWIF('cQNMaSxYNGaSLxxh3sSUkmz86CXQo9a3foK9GyXuHjSUhEEoTsWe', network); //2
var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble" 
var seed2 = bip39.mnemonicToSeedSync(mnemonic2)
const root2 = bip32.fromSeed(seed2)

console.log(psbt.txInputs)
console.log(psbt.txOutputs)

var acct2 = root2.derivePath("m/48'/1'/0'/2'");

const child2 = acct2.derivePath("0/1") // correct
console.log("child2.publicKey ", child2.publicKey)
console.log("child2.privateKey ", child2.privateKey)


// const child1 = root2.derivePath("m/48'/1'/0'/2'/0/1")
// // const child1 = acct1.derivePath("0/1") // wrong
// console.log("child1.publicKey ", child1.publicKey)
// console.log("child1.toBase58() ", child1.toBase58())

// const xpriv = child1.toBase58();
// const node = bip32.fromBase58(xpriv, bitcoin.networks.testnet);
// console.log("node ", node); 

const child2WIF = child2.toWIF();
console.log("child2WIF ", child2WIF); 
// const privateKey = ECPair.fromWIF(child2.privateKey, network);
const privateKey = ECPair.fromWIF('cPbtz5Dx29jvKgjAYhDSq6mL1Eh8NGjmF7mQG21nsiyjqKitBTyQ', network);
console.log("privateKey ", privateKey); 
// const myKey = ECPair.makeRandom({ network: network });
// console.log("myKey ", myKey); 

// // const multisig = createPayment('p2sh-p2ms(2 of 4)');
// console.log("psbt ", psbt); 

// psbt.signAllInputsHD(child2)
psbt.signInput(0, privateKey)
// console.log("psbt ", psbt); 
// psbt.signInput(1, privateKey)
// Sign the PSBT with the private key
// psbt.signAllInputs(privateKey);
console.log("psbt ", psbt); 
const psbtPartialSigned = psbt.toBase64();
console.log("psbtPartialSigned ", psbtPartialSigned);

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