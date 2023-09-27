const bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39')
const ecc = require('tiny-secp256k1')

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);

const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)


const psbtString = 'cHNidP8BAF4CAAAAAY/EvH1GYiNtLTjnGdR9d/xM6DKlxGE5Kcw/3JhmE/i3AAAAAAD9////AciT8AgAAAAAIgAgdCpbbSnP61if9A8NqKPu0fcD4Z1zSu8JzbmcgdRMUaJJHi0AAAEA/VcBAQAAAAGH5V9gPE/beCQo/c4aY+V76gVuQ5YgbjE3q3s7STWbeQEAAADZAEcwRAIgfn2woxg1mWbPdfuD7Xdt9hbh3jlD5Yqc0J/9v1IGA5oCIH+pRNYovARVlDfkazjpENxK/G2KqGameMJfrWBEQ9BKAUcwRAIgfNkaJmuINwks46E//yw2SsNHU3Ge33SH7sGsZInEdSUCIFHKzVrcKCE7Cu7VfZscnK9bu6HyN+ohkZrK3DPDbvQQAUdSIQOIu52Hh+lK2I6PpFsSdju/zbyvrlkrjjb52/43gm2X7yECOhmKim5oe2H5qmokx4eTC8daYMCbM8Af3rsc2dDlWUtSrv////8CgNHwCAAAAAAiACDsTnAMoRhShOwMYR/7j7LxHfacJWJ4xgqqjv/WhGMCD2nsd677AAAAF6kUwVrNHqPxam2d0CtdxpZNwBKUypOHAAAAAAEFaVIhAxLZKHlXgLmFWC4xXKOnT/EV1153NbOXBY696U1swFY0IQNDazQM+SNHcSbX71qxX84LgTqfx1CZbUQW81/9xb0iOCEDYy0zS9UAs6mAmhWleJSeM1hFO6D4AX8iuVmQO0i5+qhTriIGAxLZKHlXgLmFWC4xXKOnT/EV1153NbOXBY696U1swFY0HEPFfkkwAACAAQAAgAAAAIACAACAAAAAAAAAAAAiBgNDazQM+SNHcSbX71qxX84LgTqfx1CZbUQW81/9xb0iOBwHwXZPMAAAgAEAAIAAAACAAgAAgAAAAAAAAAAAIgYDYy0zS9UAs6mAmhWleJSeM1hFO6D4AX8iuVmQO0i5+qgcBUUCXDAAAIABAACAAAAAgAIAAIAAAAAAAAAAAAABAWlSIQJBF3vhIzdvMvb/HfIdseEj3hA1B3FNS8TG+YoxIdRnYSEC0dx/0gooCos+GLlhqhFEuDd+IUHy3FODYW1VAvJ03jchA79JZTbzhRhMkGnYgJARJwMGUlkWRNgwP73GAzB+mRZnU64iAgJBF3vhIzdvMvb/HfIdseEj3hA1B3FNS8TG+YoxIdRnYRwHwXZPMAAAgAEAAIAAAACAAgAAgAAAAAABAAAAIgIC0dx/0gooCos+GLlhqhFEuDd+IUHy3FODYW1VAvJ03jccBUUCXDAAAIABAACAAAAAgAIAAIAAAAAAAQAAACICA79JZTbzhRhMkGnYgJARJwMGUlkWRNgwP73GAzB+mRZnHEPFfkkwAACAAQAAgAAAAIACAACAAAAAAAEAAAAA';

const network = bitcoin.networks.testnet; // Use 'bitcoin.networks.bitcoin' for mainnet

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

const psbt = bitcoin.Psbt.fromBase64(psbtString, { network: LITECOIN });

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