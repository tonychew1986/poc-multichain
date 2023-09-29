require("dotenv").config();
var { ethers, JsonRpcProvider } = require('ethers')

var url = "https://endpoints.omniatech.io/v1/bsc/testnet/public"
var sourceAddress = "0x17997E53C1a5066C463e5F0530414cB859dA0695"
var destinationAddress = "0x0Af52045f63B109934db4b3a4020eF5CDc046BE6"
var value = "0.01"

let amount = ethers.utils.parseEther(value)
let gasLimit = 250000

const provider = new ethers.providers.JsonRpcProvider(url);
console.log("provider ", provider);

let chainId;

async function main() {
    let network = await provider.getNetwork();
    chainId = network.chainId;
    console.log('chainId ', chainId)

    let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log('signer ', signer)

    let balance = await getBalance(sourceAddress);
    console.log('balance ', balance)
    
    if (balance > 0) {
        let unsignedTx = await genUnsignTx(chainId, sourceAddress, destinationAddress, amount, "", "");
        let signedTx = await genSignedTx(signer, unsignedTx);
        let tx = await broadcastSignedTx(signedTx);
    }
}

main()

async function getBalance(sourceAddress) {
    let balance = await provider.getBalance(sourceAddress);
    balance = ethers.utils.formatEther(balance)
    console.log('balance ', balance)

    return balance;
}

async function genUnsignTx(chainId, sourceAddress, destinationAddress, amount, nonceProvided, gasPriceProvided, gasLimit = 250000) {
    let gasPrice;
    let nonce;

    if (gasPriceProvided !== "") {
        gasPrice = gasPriceProvided
    } else {
        gasPrice = await provider.getFeeData()
    }
    console.log('gasPrice ', gasPrice)

    if (nonceProvided !== "") {
        nonce = nonceProvided
    } else {
        nonce = await provider.getTransactionCount(sourceAddress, "latest");
    }
    console.log('nonce ', nonce)

    const unsignTx = {
        nonce: nonce,
        gasPrice: gasPrice.gasPrice,
        gasLimit: gasLimit,
        // EIP-1559 fields
        // maxFeePerGas: gasPrice.maxFeePerGas,
        // maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
        to: destinationAddress,
        value: amount,
        // data: data,
        chainId: chainId,
        // EIP-2718
        // type: 0
    }
    console.log("unsignTx ", unsignTx);

    return unsignTx
}

async function genSignedTx(signer, unsignTx) {
    let signedTx = await signer.signTransaction(unsignTx);
    console.log('signedTx ', signedTx);

    const hash1 = ethers.utils.keccak256(signedTx);
    console.log('hash1 ', hash1);

    return signedTx;
}

async function broadcastSignedTx(signedTx) {
    let broadcastTx = await provider.sendTransaction(signedTx)
    console.log('broadcastTx ', broadcastTx);

    return broadcastTx;
}

exports.getBalance = getBalance;
exports.genUnsignTx = genUnsignTx;
exports.genSignedTx = genSignedTx;
exports.broadcastSignedTx = broadcastSignedTx;