require("dotenv").config();
var { ethers, JsonRpcProvider } = require('ethers')
var HDNodeWallet = require('ethers/wallet')

var url = "https://endpoints.omniatech.io/v1/bsc/testnet/public"
var sourceAddress = "0x17997E53C1a5066C463e5F0530414cB859dA0695"
var destinationAddress = "0x0Af52045f63B109934db4b3a4020eF5CDc046BE6"
var value = "0.01"
let chainId = 97 // bsc testnet

const provider = new JsonRpcProvider(url);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log('signer ', signer)

async function main() {
    const balance = await provider.getBalance(sourceAddress);
    console.log('balance ', balance)

    let amt = ethers.parseEther(value)
    let txCount = await provider.getTransactionCount(sourceAddress, "latest");
    var gasPrice  = await provider.getFeeData()
    console.log('gasPrice ', gasPrice)
    let gasLimit = 250000

    // sending of transaction without compiling unsigned transaction
    // const tx = await signer.sendTransaction({
    //     to: destinationAddress,
    //     value: ethers.parseUnits('0.01', 'ether'),
    //   });
    //   console.log(tx);

    // unsigned tx
    const unsigned_tx = {
        nonce: txCount,
        gasPrice: gasPrice.gasPrice,
        gasLimit: gasLimit,
        // EIP-1559 fields
        // maxFeePerGas: gasPrice.maxFeePerGas,
        // maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
        to: destinationAddress,
        value: amt,
        // data: data,
        chainId: chainId,
        // EIP-2718
        // type: 0
    }
    console.log("unsigned_tx ", unsigned_tx);

    // let serialized = ethers.utils.serializeTransaction(unsigned_tx);

    // console.log("serialized ", serialized)

    let signedTx = await signer.signTransaction(unsigned_tx);
    console.log('signedTx ', signedTx);

    const hash1 = ethers.keccak256(signedTx);
    console.log('hash1 ', hash1);

    let broadcastTx = await provider.broadcastTransaction(signedTx)
    console.log('broadcastTx ', broadcastTx);


    // const erc20 = new ethers.Contract(address, abi, provider);
    // const estimation = await erc20.estimateGas.transfer(recipient, 100);

    
    // For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas should be used.

    // For legacy transactions and networks which do not support EIP-1559, the gasPrice should be used.
4
    // var gasEstimate = await provider.estimateGas({
    //     // Wrapped ETH address
    //     to: destinationAddress,
      
    //     // `function deposit() payable`
    //     //data: "0xd0e30db0",
      
    //     // 1 ether
    //     value: ethers.parseEther(value)
    //   });

    
    // console.log('txCount ', txCount)

    // const tx = new Tx({
    //     nonce: ethers.hexlify(txCount),
    //     destinationAddress,
    //     value: ethers.parseEther(value),
    //     gasLimit: 50000, //100000
    //     gasPrice,
    // });
    // console.log('tx ', tx)

    // erc20
    // multisig
    // nft

}

main()