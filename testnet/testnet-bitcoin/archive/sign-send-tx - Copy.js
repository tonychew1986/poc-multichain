var bip39 = require('bip39')
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')
var b58 = require('bs58check')
const axios = require('axios');


const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);

const network = bitcoin.networks.testnet;
// const network = bitcoin.networks.bitcoin;
const psbt = new bitcoin.Psbt({ network });

var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

var seed = bip39.mnemonicToSeedSync(mnemonic) // you'll use this in #3 below

const API = network === bitcoin.networks.testnet
    ? 'https://mempool.space/testnet/api'
    : 'https://mempool.space/testnet/api'

const fetchUnspents = async (address) => {
    let url = `${API}/address/${address}/utxo`;
    console.log('url ', url)
    
    try {
        let utxo = await axios.get(url);
        console.log('utxo ', utxo['data'])

        return utxo['data']
    } catch (error) {
        console.error(error);
    }
}

async function main() {

    console.log("mnemonic ", mnemonic);
    console.log("seed ", seed);

    const root = bip32.fromSeed(seed)
    console.log("root ", root);

    let sourceAddress = "tb1qt94s4k3qc00r8n2vsjycwj5j42a56ef7atsr35";
    // source address =  change address
    let destinationAddress = "tb1qzwfh9trm32swy4pl2ywtxkssvpqlc50gmlfstc";

    const hdRoot = bip32.fromSeed(seed);
    const masterFingerprint = hdRoot.fingerprint;

    const path = "m/84'/1'/0'/0/2";
    var acct = root.derivePath("m/84'/1'/0'");
    
    const keyPairAlice1 = "cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx"; //root.derivePath("m/84'/1'/0'/0/1").toWIF();
    console.log("keyPairAlice1 ", keyPairAlice1);
    const childNode = hdRoot.derivePath(path);

    // const alice = bitcoin.ECPair.fromWIF(
    //     keyPairAlice1,
    //   );
    const keyPair = ECPair.fromWIF(
        keyPairAlice1,
        network
    );

    const child1 = acct.derivePath("0/0")
    const child2 = acct.derivePath("0/1")
    const child3 = acct.derivePath("0/2")
    const child4 = acct.derivePath("0/3")
    // const childNode = hdRoot.derivePath(path);
    const pubkey1 = child1.publicKey;
    const pubkey2 = child2.publicKey;
    const pubkey3 = child3.publicKey;
    const pubkey4 = child4.publicKey;

    const unspents = await fetchUnspents(sourceAddress);
    // need to change back on new api
    // const totalAmount = unspents.reduce((summ, { satoshis }) => summ + satoshis, 0);
    // const withdrawAmount = 0.001 * 100000000;
    // const fee = 0.00001 * 100000000;
    // const change = totalAmount - (withdrawAmount + fee);
    
    console.log("unspents ", unspents)
    // console.log("totalAmount ", totalAmount)
    // console.log("change ", change)

    // const output_script = bitcoin.payments.p2wpkh({pubkey: pubkey3, network})
    // console.log('Previous output script:')
    // console.log(output_script.output.toString('hex'))

    const outputScript = bitcoin.payments.p2wpkh({
        pubkey: pubkey3, network
    }).output.toString('hex')
    console.log("outputScript ", outputScript)

    let pubKeyHashAlice = bitcoin.crypto.hash160(Buffer.from('outputScript', 'hex')).toString('hex')
    console.log('pubKeyHashAlice ', pubKeyHashAlice)

    // const psbt = new bitcoin.Psbt({network})
    //   .addInput({
    //     hash: 'TX_ID',
    //     index: TX_VOUT,
    //     witnessUtxo: {
    //       script: Buffer.from('0014' + alice[1].pubKeyHash, 'hex'),
    //       value: 1e8, 
    //     },
    //   })
    //   .addOutput({
    //     address: bob[1].p2wpkh,
    //     value: 5e7,
    //   }) 
    //  .addOutput({
    //     address: alice[1].p2wpkh,
    //     value: 499e5,
    //   })

    //   psbt.signInput(0, keyPairAlice1)
    //   psbt.validateSignaturesOfInput(0)

    //   psbt.finalizeAllInputs()

    //   console.log('Transaction hexadecimal:')
    // console.log(psbt.extractTransaction().toHex())

    // //decoderawtransaction TX_HEX

    // //sendrawtransaction TX_HEX

    // //getrawtransaction TX_ID true
    // const inputData = await getInputData(5e4, p2sh.payment, false, 'p2sh');
    const p2wpkh = createPayment('p2wpkh', [childNode], network);
    const inputData = await getInputData(5e4, p2wpkh.payment, true, 'noredeem');
    {
      const { hash, index, witnessUtxo } = inputData;
      console.log("inputData ", { hash, index, witnessUtxo });
    }

    psbt.addInput({
        hash: unspents[0]["txid"],
        index: unspents[0]["vout"],
        witnessUtxo: {
            // script: Buffer.from(pubKeyHashAlice, 'hex'), // non-segwit
            script: Buffer.from(outputScript, 'hex'),
            // script: Buffer.from("935ee247aab7e722ce5723c2bea685d9948b4894", 'hex'),
            // script: Buffer.from('0014' + pubKeyHashAlice, 'hex'),
            value: unspents[0]["value"],
        },
        //redeemScript: Buffer.from("035ab58d228031f4fc4ecfcc51ffcbfe718cc90dcde5d0287b853795e8bea96881", 'hex'),
    });
    console.log("psbt1 ", psbt)
    
    psbt.addOutput({
        address: destinationAddress,
        value: Math.floor(0.001 * 1e8),
    });
    console.log("psbt2 ", psbt)
    
    // psbt.addOutput({
    //     address: sourceAddress,
    //     value: Math.floor(0.001 * 1e8),
    // });
    
    // console.log("psbt3 ", psbt)
    
    psbt.signInput(0, keyPair);
    console.log("psbt3 ", psbt)
    console.log("psbt3 ", psbt["data"])
    console.log("psbt3 inputs ", psbt["data"]["inputs"])
    console.log("psbt3 outputs ", psbt["data"]["outputs"])
    // psbt.validateSignaturesOfInput(0)
    psbt.validateSignaturesOfAllInputs()
    console.log("psbt4 ", psbt)
    // psbt.finalizeInput(0);
    // console.log("psbt4 ", psbt)
    // psbt.signAllInputs(keyPairAlice1)
    // console.log("psbt4 ", psbt).
    psbt.finalizeAllInputs()
    console.log("psbt5 ", psbt)
    const tx = psbt.extractTransaction();
    console.log("tx.toHex() ", tx.toHex())
    return tx.toHex();
}

async function getInputData(
    amount, //: number,
    payment, //: any,
    isSegwit, //: boolean,
    redeemType, //: string,
  ) {
    const unspent = await regtestUtils.faucetComplex(payment.output, amount);
    const utx = await regtestUtils.fetch(unspent.txId);
    // for non segwit inputs, you must pass the full transaction buffer
    const nonWitnessUtxo = Buffer.from(utx.txHex, 'hex');
    // for segwit inputs, you only need the output script and value as an object.
    const witnessUtxo = getWitnessUtxo(utx.outs[unspent.vout]);
    const mixin = isSegwit ? { witnessUtxo } : { nonWitnessUtxo };
    const mixin2 = {};
    switch (redeemType) {
      case 'p2sh':
        mixin2.redeemScript = payment.redeem.output;
        break;
      case 'p2wsh':
        mixin2.witnessScript = payment.redeem.output;
        break;
      case 'p2sh-p2wsh':
        mixin2.witnessScript = payment.redeem.redeem.output;
        mixin2.redeemScript = payment.redeem.output;
        break;
    }
    return {
      hash: unspent.txId,
      index: unspent.vout,
      ...mixin,
      ...mixin2,
    };
  }

async function createPayment(
    _type, //: string, 
    myKeys, //?: any[], 
    network, //?: any
) {
    network = network || regtest;
    const splitType = _type.split('-').reverse();
    const isMultisig = splitType[0].slice(0, 4) === 'p2ms';
    const keys = myKeys || [];
    let m; //: number | undefined;
    // if (isMultisig) {
    //   const match = splitType[0].match(/^p2ms\((\d+) of (\d+)\)$/);
    //   m = parseInt(match![1], 10);
    //   let n = parseInt(match![2], 10);
    //   if (keys.length > 0 && keys.length !== n) {
    //     throw new Error('Need n keys for multisig');
    //   }
    //   while (!myKeys && n > 1) {
    //     keys.push(bitcoin.ECPair.makeRandom({ network }));
    //     n--;
    //   }
    // }
    if (!myKeys) keys.push(bitcoin.ECPair.makeRandom({ network }));
  
    let payment; //: any;
    splitType.forEach(type => {
      if (type.slice(0, 4) === 'p2ms') {
        payment = bitcoin.payments.p2ms({
          m,
          pubkeys: keys.map(key => key.publicKey).sort((a, b) => a.compare(b)),
          network,
        });
      } else if (['p2sh', 'p2wsh'].indexOf(type) > -1) {
        payment = (bitcoin.payments)[type]({
          redeem: payment,
          network,
        });
      } else {
        payment = (bitcoin.payments)[type]({
          pubkey: keys[0].publicKey,
          network,
        });
      }
    });
  
    return {
      payment,
      keys,
    };
  }
  
  function getWitnessUtxo(out) {
    delete out.address;
    out.script = Buffer.from(out.script, 'hex');
    return out;
  }
  

main()