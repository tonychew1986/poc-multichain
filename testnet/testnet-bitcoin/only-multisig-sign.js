const bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39')
const ecc = require('tiny-secp256k1')

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);

const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)


const psbtString = 'cHNidP8BAF4CAAAAAepPxfdjZVdT8skZH+ayf09y8RtgTiXmI8shbhfXQUDDAAAAAAD9////AUg+MgAAAAAAIgAgvyWdDt1ziybYzl0pvJrAaTCqkOOrXrKVH5k+3fu4HXM3NiYAAAEBKzU/MgAAAAAAIgAgdCpbbSnP61if9A8NqKPu0fcD4Z1zSu8JzbmcgdRMUaIBAP1cAQIAAAAAAQG7Nhb3WK/BY9Quv4D2hSfnDFa+Yfh7051uA7CFyxuNeQAAAAAA/f///wE1PzIAAAAAACIAIHQqW20pz+tYn/QPDaij7tH3A+Gdc0rvCc25nIHUTFGiBABHMEQCIA/nT5VTLcTw+JhnXglgSRQckHNNmPWGryh3Im9sJPOcAiBLuw5mIH2LDM1S9FQd88dPJ1KT1GtbnIqtwksoCpj6lgFHMEQCIAhubzF8qQh8hBsiqdYFikeK5ARa7TsdZIQ7UwOPNDDnAiBszBhoLKTnKHigyBwkKOa+Gi3F+Mvqmdx26s5dN1TwSgFpUiECmoFF/Ymu6oN+BHDgAv0bmQmMAAHYfOi48ATAQSg/9pwhAyVHZQ9UuneMggbTKjW+a/aSyHGZgR54bEMIRXQkv4VnIQMlluhNdvbyUSbF+R1XDpFC1gTTeI3xiD/Q1Y2bk1FsfVOuNTYmACICA79JZTbzhRhMkGnYgJARJwMGUlkWRNgwP73GAzB+mRZnRzBEAiAHDE4A7B5U51wIJhGigiPMd/BQmpCy1j+vvYm7Hho83AIgVfK459vR8MUcc/w3Z1UYIdm218sWwWs4vE00iGFC7AUBAQVpUiECQRd74SM3bzL2/x3yHbHhI94QNQdxTUvExvmKMSHUZ2EhAtHcf9IKKAqLPhi5YaoRRLg3fiFB8txTg2FtVQLydN43IQO/SWU284UYTJBp2ICQEScDBlJZFkTYMD+9xgMwfpkWZ1OuIgYCQRd74SM3bzL2/x3yHbHhI94QNQdxTUvExvmKMSHUZ2EMLSI8egAAAAABAAAAIgYC0dx/0gooCos+GLlhqhFEuDd+IUHy3FODYW1VAvJ03jcMkL7MpQAAAAABAAAAIgYDv0llNvOFGEyQadiAkBEnAwZSWRZE2DA/vcYDMH6ZFmccQ8V+STAAAIABAACAAAAAgAIAAIAAAAAAAQAAAAABAWlSIQLuHkZSlZQl3V13cxkSbq8t4z3PzVx9kEm7YWZMEh0lBSEDdLdhgpGF37XyjNW6r45X/McoEn4M4TC3nj8GtaQdmKAhA3wqE2FP8FqGJtErqH2kSbs/Iy768QprRjzfrs49H2iyU64iAgLuHkZSlZQl3V13cxkSbq8t4z3PzVx9kEm7YWZMEh0lBRxDxX5JMAAAgAEAAIAAAACAAgAAgAAAAAAEAAAAIgIDdLdhgpGF37XyjNW6r45X/McoEn4M4TC3nj8GtaQdmKAMLSI8egAAAAAEAAAAIgIDfCoTYU/wWoYm0SuofaRJuz8jLvrxCmtGPN+uzj0faLIMkL7MpQAAAAAEAAAAAA==';

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