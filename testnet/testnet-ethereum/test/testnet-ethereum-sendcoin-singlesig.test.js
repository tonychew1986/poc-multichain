const genSingle = require('../sign-send-tx')
var { ethers, JsonRpcProvider } = require('ethers')
require("dotenv").config();

let expected_unsignedTx = `{
    nonce: 18,
    gasPrice: BigNumber { _hex: '0x10', _isBigNumber: true },
    gasLimit: 250000,
    to: '0x0Af52045f63B109934db4b3a4020eF5CDc046BE6',
    value: BigNumber { _hex: '0x2386f26fc10000', _isBigNumber: true },
    chainId: 5
  }`

let expected_signedTx = "0xf86712108303d090940af52045f63b109934db4b3a4020ef5cdc046be6872386f26fc10000802da08c6fbc74300a1bb5a7ae65528a664d39073baeedf62b39d603435c4e34d3e39aa060de2305122b790361990fb0d9a6631f94d14865ac838d841911fdc2c257e7b6"

var url = "https://goerli.infura.io/v3/fa926a9d3c2a4067af17c4df5b3d6079"

it('should generate the expected unsigned transaction', async () => {
    // let chainId = 5;
    // let sourceAddress = "0x17997E53C1a5066C463e5F0530414cB859dA0695"
    // let destinationAddress = "0x0Af52045f63B109934db4b3a4020eF5CDc046BE6"
    // let amount = ethers.utils.parseEther("0.01")
    // let nonce = 0
    // let gasPrice = 30

    // let provider = new ethers.providers.JsonRpcProvider(url);
    // console.log("provider ", provider);
    
    // let signer = new ethers.Wallet("01772ecaaf900c77344174b6c3154658c7d0ff58a94cd7974a00e6e0d0d4eac8", provider);
    // console.log('signer ', signer)

    // let unsignedTx = await genSingle.genUnsignTx(chainId, sourceAddress, destinationAddress, amount, nonce, gasPrice)
    // console.log('unsignedTx ', unsignedTx)

    // let signedTx = await genSingle.genSignedTx(signer, expected_unsignedTx)
    
    // // expect(unsignedTx).toBe(expected_unsignedTx);
    // expect(signedTx).toBe(expected_signedTx);
});

// it('should generate the expected signed transaction', async () => {
//     let address1 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/0")
//     let address2 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/1")
//     let address3 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/2")

//     expect(address1).toBe(expected_address1);
//     expect(address2).toBe(expected_address2);
//     expect(address3).toBe(expected_address3);
// });