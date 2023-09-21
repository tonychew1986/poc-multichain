const bitcoin = require('bitcoinjs-lib');

const ecc = require('tiny-secp256k1')

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);


const psbtString = 'cHNidP8BAFICAAAAAYRTZvwF1mLfYyckGoxF76e6lfSUKRwjbdiYWdqUGDaKAAAAAAD/////Ad9JHQAAAAAAFgAUE5NyrHuKoOJUP1Ecs1oQYEH8UegAAAAAAAEBH4RKHQAAAAAAFgAU0P46I4qL3+34Pjg7fi5T/joNdGoAAA==';

const correctPsbtString = 'cHNidP8BAFICAAAAAYRTZvwF1mLfYyckGoxF76e6lfSUKRwjbdiYWdqUGDaKAAAAAAD9////Ad9JHQAAAAAAFgAUE5NyrHuKoOJUP1Ecs1oQYEH8UegGJyYAAAEBH4RKHQAAAAAAFgAUWWsK2iDD3jPNTISJh0qSqrtNZT4BAL8CAAAAAAEBvmHW9OCRHmH1D+PuM0ZS45IEtzHbimX7s2TpMrBD360AAAAAAP3///8BhEodAAAAAAAWABRZawraIMPeM81MhImHSpKqu01lPgJHMEQCIC7JiGcztSWTSZlaW3E2j9obkf1yzCjOXaXOciYMeAzVAiAQz671kkhNzJBOyoSuXhCVIfNkCjGTLUW7Wre6xzUCzQEhA3jdiZ2bm/dxIZkCtXsVFE3vL9NdP/2ndIGIA0qRYe/XtCYmACIGA7NkHAPaRuYT3w45LUMPhvErQUE0qBmXSk5KCusc+2dxGEPFfklUAACAAQAAgAAAAIAAAAAAAgAAAAAiAgKHW8n8Rfefh/60ohfhzMKHHrZcnLTQ29AK6ULq0TusdRhDxX5JVAAAgAEAAIAAAACAAAAAAAMAAAAA';

const network = bitcoin.networks.testnet; // Use 'bitcoin.networks.bitcoin' for mainnet

const psbt = bitcoin.Psbt.fromBase64(correctPsbtString, { network });

// Define the private key for the input
// const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); // Replace with your private key // 3
const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); //2

psbt.signInput(0, privateKey)
// Sign the PSBT with the private key
// psbt.signAllInputs(privateKey);

// Finalize the PSBT to get a fully signed transaction
psbt.finalizeAllInputs();

const psbtSigned = psbt.toBase64();
console.log("psbtSigned ", psbtSigned); // nice. correct

const signedTx = psbt.extractTransaction();
console.log("signedTx ", signedTx)
console.log("signedTx['ins'] ", signedTx['ins'])
console.log("----")
console.log("signedTx['ins'][0]['hash'] ", Buffer.from(JSON.stringify(signedTx['ins'][0]['hash'])))
console.log("----")
console.log("signedTx['ins'][0]['hash'] ", Buffer.from(JSON.stringify(signedTx['ins'][0]['hash'])).toString('hex'))
console.log("----")
console.log("signedTx['ins'][0]['hash'] ", Buffer.from(JSON.stringify(signedTx['ins'][0]['hash'])).toString('base64'))
console.log("----")
console.log("signedTx['ins'][0]['hash'] ", JSON.parse(Buffer.from(JSON.stringify(signedTx['ins'][0]['hash'])).toString()))
console.log("----")
console.log("signedTx['ins'][0]['hash'] ", JSON.parse(Buffer.from(JSON.stringify(signedTx['ins'][0]['hash']))).toString())
console.log("----")
console.log("signedTx['ins'][0]['script'] ", Buffer.from(JSON.stringify(signedTx['ins'][0]['script'])).toString('hex'))
console.log("----")
console.log("signedTx['ins'][0]['witness'] ", Buffer.from(JSON.stringify(signedTx['ins'][0]['witness'])).toString('hex'))
console.log("----")
console.log("signedTx['outs'][0]['script'] ", Buffer.from(JSON.stringify(signedTx['outs'][0]['script'])).toString('hex'))
console.log("----")
const signedTxHex = signedTx.toHex();
console.log("signedTxHex ", signedTxHex);

// this code works
// broadcast using https://blockstream.info/testnet/tx/push