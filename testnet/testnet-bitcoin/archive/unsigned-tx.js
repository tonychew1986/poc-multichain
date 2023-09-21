const bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39')
const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);
const axios = require('axios');


// const psbtString = 'cHNidP8BAFICAAAAAb5h1vTgkR5h9Q/j7jNGUuOSBLcx24pl+7Nk6TKwQ9+tAAAAAAD9////AYRKHQAAAAAAFgAUWWsK2iDD3jPNTISJh0qSqrtNZT60JiYAAAEBHylLHQAAAAAAFgAUk17iR6q35yLOVyPCvqaF2ZSLSJQBAMACAAAAAAEBvD/QJGLbsnQ/0klZtmVzTSxRlMeukOcQuDlEMnbUE10AAAAAAP3///8BKUsdAAAAAAAWABSTXuJHqrfnIs5XI8K+poXZlItIlAJIMEUCIQCNPwVZx2EE9p4ROz2in0YbQlJGVRSgacD9G9L7KXsr5AIgQyOqGDCdlNuv/dCEWFpz7OAyfVGz6ceSzRZCDGUDlzYBIQOzZBwD2kbmE98OOS1DD4bxK0FBNKgZl0pOSgrrHPtnca4mJgAiBgN43Ymdm5v3cSGZArV7FRRN7y/TXT/9p3SBiANKkWHv1xhDxX5JVAAAgAEAAIAAAACAAAAAAAEAAAAAIgIDs2QcA9pG5hPfDjktQw+G8StBQTSoGZdKTkoK6xz7Z3EYQ8V+SVQAAIABAACAAAAAgAAAAAACAAAAAA==';

const network = bitcoin.networks.testnet; // Use 'bitcoin.networks.bitcoin' for mainnet


let sourceAddress = "tb1qt94s4k3qc00r8n2vsjycwj5j42a56ef7atsr35";
// source address =  change address
let destinationAddress = "tb1qzwfh9trm32swy4pl2ywtxkssvpqlc50gmlfstc";


const fetchUnspents = async (address) => {
    const API = network === bitcoin.networks.testnet
      ? 'https://mempool.space/testnet/api'
      : 'https://mempool.space/testnet/api'
  
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

let psbtString;

// function getWitnessUtxo(out) {
//     delete out.address;
//     out.script = Buffer.from(out.script, 'hex');
//     return out;
//   }

async function main() {
    const unspents = await fetchUnspents(sourceAddress);

    //const psbt = bitcoin.Psbt.fromBase64(psbtString, { network });
    
    const psbt = new bitcoin.Psbt({ network });
    psbt.setVersion(2); // These are defaults. This line is not needed.
    psbt.setLocktime(2503959); // These are defaults. This line is not needed.

    var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"
    
    var seed = bip39.mnemonicToSeedSync(mnemonic) // you'll use this in #3 below

    console.log("mnemonic ", mnemonic);
    console.log("seed ", seed);

    const root = bip32.fromSeed(seed)
    console.log("root ", root);
    
    var acct = root.derivePath("m/84'/1'/0'");
    const child1 = acct.derivePath("0/2")
    const pubkey1 = child1.publicKey;
    console.log('pubkey1 ', pubkey1)
    

    const outputScript = bitcoin.payments.p2wpkh({
        pubkey: pubkey1, network
    }).output //.toString('hex')
    console.log("outputScript ", outputScript.toString('hex'))

    let pubKeyHashAlice = bitcoin.crypto.hash160(Buffer.from(outputScript, 'hex')).toString('hex')
    console.log('pubKeyHashAlice ', pubKeyHashAlice)

    console.log('script', Buffer.from('03b3641c03da46e613df0e392d430f86f12b414134a819974a4e4a0aeb1cfb6771', 'hex'))

    if (unspents.length > 0) {

        let inputData2 = {
            hash: unspents[0]["txid"],
            index: unspents[0]["vout"],
            sequence: 0xfffffffd, // These are defaults. This line is not needed.
            // nonWitnessUtxo: {
            witnessUtxo: {
                // script: Buffer.from(pubKeyHashAlice, 'hex'), // non-segwit
                // script: Buffer.from(outputScript, 'hex'),
                // script: Buffer.from(unspentOutput.scriptPubKey, 'hex'),
                // script: Buffer.from("935ee247aab7e722ce5723c2bea685d9948b4894", 'hex'),
                // script: Buffer.from('0014' + pubKeyHashAlice, 'hex'),
                script: Buffer.from('596b0ada20c3de33cd4c8489874a92aabb4d653e', 'hex'),
                value: unspents[0]["value"],
            },
            // redeemScript: Buffer.from(unspentOutput.redeemScript, 'hex'),
        }
        console.log("inputData2 ", inputData2)

        console.log("valid sample unsigned psbt 1", "cHNidP8BAFICAAAAAa3WV6PFrKwr1WndYVifh7D/ivIK9dFaA6b9KQtaZBELAAAAAAD9////AZVIHQAAAAAAFgAUE5NyrHuKoOJUP1Ecs1oQYEH8UegZNSYAAAEBHzpJHQAAAAAAFgAUWWsK2iDD3jPNTISJh0qSqrtNZT4BAL8CAAAAAAEB81werzYK1b1jyKEzNvP+9yi+I6UUg0qWl81N38Bdef0AAAAAAP3///8BOkkdAAAAAAAWABRZawraIMPeM81MhImHSpKqu01lPgJHMEQCIFlTfSXSM4a42QZFEE8F4MQN/Xz0pZz0N3fyf/10dpVTAiAKeo5IrTcF77zkgxXtSfzLYQEBT0BFyulxE8cIqn/8iAEhAodbyfxF95+H/rSiF+HMwocetlyctNDb0ArpQurRO6x1FzUmACIGA7NkHAPaRuYT3w45LUMPhvErQUE0qBmXSk5KCusc+2dxGEPFfklUAACAAQAAgAAAAIAAAAAAAgAAAAAiAgKHW8n8Rfefh/60ohfhzMKHHrZcnLTQ29AK6ULq0TusdRhDxX5JVAAAgAEAAIAAAACAAAAAAAMAAAAA")

        console.log("valid sample unsigned psbt 2", "cHNidP8BAFICAAAAAa3WV6PFrKwr1WndYVifh7D/ivIK9dFaA6b9KQtaZBELAAAAAAD9////AZVIHQAAAAAAFgAUE5NyrHuKoOJUP1Ecs1oQYEH8UegXNSYAAAEAvwIAAAAAAQHzXB6vNgrVvWPIoTM28/73KL4jpRSDSpaXzU3fwF15/QAAAAAA/f///wE6SR0AAAAAABYAFFlrCtogw94zzUyEiYdKkqq7TWU+AkcwRAIgWVN9JdIzhrjZBkUQTwXgxA39fPSlnPQ3d/J//XR2lVMCIAp6jkitNwXvvOSDFe1J/MthAQFPQEXK6XETxwiqf/yIASECh1vJ/EX3n4f+tKIX4czChx62XJy00NvQCulC6tE7rHUXNSYAIgYDs2QcA9pG5hPfDjktQw+G8StBQTSoGZdKTkoK6xz7Z3EYQ8V+SVQAAIABAACAAAAAgAAAAAACAAAAACICAodbyfxF95+H/rSiF+HMwocetlyctNDb0ArpQurRO6x1GEPFfklUAACAAQAAgAAAAIAAAAAAAwAAAAA=")

        console.log("sample signed psbt tx", "02000000000101add657a3c5acac2bd569dd61589f87b0ff8af20af5d15a03a6fd290b5a64110b0000000000fdffffff0195481d0000000000160014139372ac7b8aa0e2543f511cb35a106041fc51e80247304402206921d0024dfaea9b144165d90530206693dd90269ab7cfc155aaad3cf1676a3b02201950f6d4be8488eb6f289022b52da5d1abd45d940d38a1f39ec119306c0ff216012103b3641c03da46e613df0e392d430f86f12b414134a819974a4e4a0aeb1cfb677119352600")

        psbt.addInput(inputData2);
        console.log("psbt1 ", psbt)

        psbtString = psbt.toBase64();
        console.log(psbtString); // nice. correct

        psbt.addOutput({
            address: destinationAddress,
            value: 1919290, //Math.floor(0.001 * 1e8),
        });
        console.log("psbt2 ", psbt)


        psbtString = psbt.toBase64();
        console.log(psbtString); // nice. correct

        // // Define the private key for the input
        // // const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); // Replace with your private key // 3
        // const privateKey = ECPair.fromWIF('cSJYPM1Mbcemoju3ArnSwr87VGoJaJBcUcH4DZRUCupWxUUDSxVf', network); //2

        // psbt.signInput(0, privateKey)
        // // Sign the PSBT with the private key
        // // psbt.signAllInputs(privateKey);

        // // Finalize the PSBT to get a fully signed transaction
        // psbt.finalizeAllInputs();

        // const psbtSigned = psbt.toBase64();
        // console.log("psbtSigned ", psbtSigned); // nice. correct

        // const signedTx = psbt.extractTransaction();
        // console.log("signedTx ", signedTx)
        // const signedTxHex = signedTx.toHex();
        // console.log("signedTxHex ", signedTxHex);

        // this code works
        // broadcast using https://blockstream.info/testnet/tx/push
    } else {
        console.log("there is no utxo in this address")
    }
}
main()


/// https://api.blockcypher.com/v1/btc/test3/txs/8a361894da5998d86d231c2994f495baa7ef458c1a242763df62d605fc665384?limit=50&includeHex=true

//witness is from previous transaction output. direct copy