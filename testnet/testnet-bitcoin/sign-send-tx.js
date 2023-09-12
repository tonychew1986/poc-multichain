var bitcoin = require('bitcoinjs-lib')


const psbt = new bitcoin.Psbt({network})
  .addInput({
    hash: 'TX_ID',
    index: TX_VOUT,
    witnessUtxo: {
      script: Buffer.from('0014' + alice[1].pubKeyHash, 'hex'),
      value: 1e8, 
    },
  })
  .addOutput({
    address: bob[1].p2wpkh,
    value: 5e7,
  }) 
 .addOutput({
    address: alice[1].p2wpkh,
    value: 499e5,
  })

  psbt.signInput(0, keyPairAlice1)
  psbt.validateSignaturesOfInput(0)

  psbt.finalizeAllInputs()

  console.log('Transaction hexadecimal:')
console.log(psbt.extractTransaction().toHex())

//decoderawtransaction TX_HEX

//sendrawtransaction TX_HEX

//getrawtransaction TX_ID true