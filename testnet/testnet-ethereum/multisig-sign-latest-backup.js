var Safe, { SafeFactory, SafeAccountConfig } = require('@safe-global/protocol-kit')
var { EthersAdapter, Web3Adapter } = require('@safe-global/protocol-kit')
var { ContractNetworksConfig } = require('@safe-global/protocol-kit')
var { SafeTransactionDataPartial } = require('@safe-global/safe-core-sdk-types')

var SafeProtocol = require('@safe-global/protocol-kit')

var { ethers, JsonRpcProvider } = require('ethers')
var { Web3 } = require('web3')
var bip39 = require('bip39')

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)



var RPC_URL = "https://goerli.infura.io/v3/fa926a9d3c2a4067af17c4df5b3d6079"
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
console.log("provider ", provider);

var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"

var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"

const rootPath = "m/44'/60'/0'";

// let safeAddress = "0xe780BF709860bA04903398369Aa20903d39B1a0a";
let safeAddress = "0xf38122004890ebEc2F2EC142175C2BeF5457ae70";

let amount = ethers.utils.parseEther("0.01", 'ether')

async function main() {
    let network = await provider.getNetwork();
    chainId = network.chainId;
    console.log('chainId ', chainId)

    const ethAdapterProvider = new EthersAdapter({
        ethers,
        signerOrProvider: provider //provider //privateKey1
    })
    console.log("ethAdapterProvider ", ethAdapterProvider)

    let privateKey1 = genDerivationPrivateKey(mnemonic1, rootPath, "0/0")
    let privateKey2 = genDerivationPrivateKey(mnemonic2, rootPath, "0/0")
    let privateKey3 = genDerivationPrivateKey(mnemonic3, rootPath, "0/0")
    
    const signer1 = new ethers.Wallet(privateKey1, provider);
    const signer2 = new ethers.Wallet(privateKey2, provider);
    const signer3 = new ethers.Wallet(privateKey3, provider);
    console.log('signer1 ', signer1)
    console.log('signer2 ', signer2)
    console.log('signer3 ', signer3)

    const address1 = await signer1.getAddress();
    const address2 = await signer2.getAddress();
    const address3 = await signer3.getAddress();

    isOwner(ethAdapterProvider, address1);
    isOwner(ethAdapterProvider, address2);
    isOwner(ethAdapterProvider, address3);
    
    let balance1 = await getBalance(address1);
    let balance2 = await getBalance(address2);
    let balanceContract = await getBalance(safeAddress);
    console.log('balance1 ', balance1)
    console.log('balance2 ', balance2)
    console.log('balanceContract ', balanceContract)

    let unsignedTx = await genMultisigUnsignTx(ethAdapterProvider, safeAddress, '0x073b965F98734DaDd401c33dc55EbD36d232AF58', amount, "", "");
    
    console.log("---------------")
    console.log("first signing")
    console.log("---------------")
    if (balance1 > 0 || balance2 > 0) {
        let signedTx1 = await genMultisigSignedTx(signer1, unsignedTx, safeAddress);
    }
    console.log("---------------")
    console.log("second signing")
    console.log("---------------")

    // if (balance1 > 0 || balance2 > 0) {
    //     let signedTx2 = await genSignedTx(signer2, signedTx1);
    // }
    
    // let tx = await broadcastSignedTx(signedTx2);

    // const Safe = SafeProtocol.default
    // const safeSdk1 = await Safe.create({ ethAdapter: ethAdapter1, safeAddress })
    // console.log("safeSdk1 ", safeSdk1)
    // const safeSdk2 = await Safe.create({ ethAdapter: ethAdapter2, safeAddress })
    // console.log("safeSdk2 ", safeSdk2)

    // const safeTransaction = await safeSdk1.createTransaction({ safeTransactionData })
    // console.log("safeTransaction ", safeTransaction)

    // const txHash = await safeSdk1.getTransactionHash(safeTransaction)
    // console.log("txHash ", txHash)

    // const ownerAddresses = await safeSdk1.getOwnersWhoApprovedTx(txHash)
    // console.log("ownerAddresses ", ownerAddresses)

    // const safeAddress2 = await safeSdk1.getAddress()
    // console.log("safeAddress2 ", safeAddress2)

    // const isOwner = await safeSdk1.isOwner(signer1.getAddress())
    // console.log("isOwner ", isOwner)

    // const balance = await safeSdk1.getBalance()
    // console.log("balance ", ethers.utils.formatEther(balance))

    // const chainId2 = await safeSdk1.getChainId()
    // console.log("chainId2 ", chainId2)

    // const nonce = await safeSdk1.getNonce()
    // console.log("nonce ", nonce)

    // const ownerAddresses2 = await safeSdk1.getOwners()
    // console.log("ownerAddresses2 ", ownerAddresses2)
    // console.log('signer1 ', signer1.getAddress())

    // const signedSafeTransaction1 = await safeSdk1.signTransaction(safeTransaction)
    // console.log("signedSafeTransaction1 ", signedSafeTransaction1)
    // console.log("signedSafeTransaction1 ", signedSafeTransaction1.signatures)
    
    // const signedSafeTransaction2 = await safeSdk2.signTransaction(signedSafeTransaction1)
    // console.log("signedSafeTransaction2 ", signedSafeTransaction2)
    // console.log("signedSafeTransaction2 ", signedSafeTransaction2.signatures)

    // let gasLimit = await provider.estimateGas({
    //     from: signer1.getAddress(),
    //     to: safeAddress,
    //     value: safeAmount,
    //     data: '0x'
    // });

    // const options = {
    //     // from, // Optional
    //     gasLimit: 200000, // Optional
    //     gasPrice: ethers.utils.parseUnits('50', 'gwei'), // Optional
    //     // maxFeePerGas, // Optional
    //     // maxPriorityFeePerGas // Optional
    //     // nonce // Optional
    // }

    // // on-chain
    // // const txResponse = await safeSdk.approveTransactionHash(txHash, options)
    // // console.log("txResponse ", txResponse)
    // // await txResponse.transactionResponse?.wait()
    // // console.log("txResponse ", txResponse)

    // const txResponse2 = await safeSdk1.executeTransaction(signedSafeTransaction2)
    // await txResponse2.transactionResponse?.wait()
    // console.log("txResponse2 ", txResponse2)
}

main()


async function isOwner(ethAdapterProvider, address) {
    const Safe = SafeProtocol.default
    const safeSdk = await Safe.create({ ethAdapter: ethAdapterProvider, safeAddress })

    let isOwner = await safeSdk.isOwner(address)
    console.log("isOwner ", isOwner)

    return isOwner;
}

async function getBalance(sourceAddress) {
    let balance = await provider.getBalance(sourceAddress);
    balance = ethers.utils.formatEther(balance)
    console.log('balance ', balance)

    return balance;
}

async function getContractBalance(sourceAddress, contract) {
    let balanceToken = await contract.balanceOf(sourceAddress);
    balanceToken = (balanceToken).toString()
    console.log('balanceToken ', balanceToken)

    return balanceToken;
}

function genDerivationPrivateKey(mnemonic, rootPath, subPath) {
  let fullPath = rootPath + "/" + subPath;
  let hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
  console.log("hdNode ", hdNode);

  let mnemonicWallet = hdNode.derivePath(fullPath);
  console.log("mnemonicWallet ", mnemonicWallet);

  let privateKey = mnemonicWallet.privateKey;
  console.log("privateKey ", privateKey);

  return privateKey
}

async function genMultisigUnsignTx(ethAdapterProvider, sourceAddress, destinationAddress, amount, nonceProvided, gasPriceProvided, gasLimit = 250000) {
    let gasPrice;
    let nonce;

    if (gasPriceProvided !== "") {
        gasPrice = gasPriceProvided
    } else {
        gasPrice = await provider.getFeeData()
    }
    console.log('gasPrice ', gasPrice)

    // if (nonceProvided !== "") {
    //     nonce = nonceProvided
    // } else {
    //     nonce = await provider.getTransactionCount(sourceAddress, "latest");
    // }
    // console.log('nonce ', nonce)
    // let safeAmount = ethers.utils.parseEther('0.01', 'ether'); //.toHexString()
    // console.log("safeAmount ", ethers.utils.formatEther(safeAmount))
    
    let safeTransactionData = {
        to: '0x073b965F98734DaDd401c33dc55EbD36d232AF58',
        value: amount, //'<eth_value_in_wei>',
        data: '0x'
    }
    
    const Safe = SafeProtocol.default
    const safeSdk = await Safe.create({ ethAdapter: ethAdapterProvider, safeAddress })
    
    const safeTransaction = await safeSdk.createTransaction({ safeTransactionData })
    console.log("safeTransaction ", safeTransaction)

    const txHash = await safeSdk.getTransactionHash(safeTransaction)
    console.log("txHash ", txHash)

    // const unsignTx = {
    //     nonce: nonce,
    //     gasPrice: gasPrice.gasPrice,
    //     gasLimit: gasLimit,
    //     // EIP-1559 fields
    //     // maxFeePerGas: gasPrice.maxFeePerGas,
    //     // maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
    //     to: destinationAddress,
    //     value: amount,
    //     // data: data,
    //     chainId: chainId,
    //     // EIP-2718
    //     // type: 0
    // }
    // console.log("unsignTx ", unsignTx);

    let unsignTx = safeTransactionData

    return unsignTx
}

async function genMultisigSignedTx(signer, unsignTx, safeAddress) {
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer //provider //privateKey1
    })
    console.log("ethAdapter ", ethAdapter)
    console.log("signer ", signer)
    
    const Safe = SafeProtocol.default
    const safeSdk = await Safe.create({ ethAdapter: ethAdapter, safeAddress })
    console.log("safeSdk ", safeSdk)
    console.log("unsignTx ", unsignTx)

    const balance = await safeSdk.getBalance()
    console.log("balance ", ethers.utils.formatEther(balance))

    const nonce = await safeSdk.getNonce()
    console.log("nonce ", nonce)

    const ownerAddresses = await safeSdk.getOwners()
    console.log("ownerAddresses ", ownerAddresses)

    const signedSafeTransaction = await safeSdk.signTransaction(unsignTx)
    console.log("signedSafeTransaction ", signedSafeTransaction)
    console.log("signedSafeTransaction ", signedSafeTransaction.signatures)

    const txHash = await safeSdk.getTransactionHash(signedSafeTransaction)
    console.log("txHash ", txHash)

    const ownerAddressesApprove = await safeSdk.getOwnersWhoApprovedTx(txHash)
    console.log("ownerAddressesApprove ", ownerAddressesApprove)

    let signedTx = signedSafeTransaction
    console.log("signedTx ", signedTx)

    return signedTx;
}

async function broadcastSignedTx(signedTx) {
    let broadcastTx = await provider.sendTransaction(signedTx)
    console.log('broadcastTx ', broadcastTx);

    return broadcastTx;
}

exports.getBalance = getBalance;
exports.getContractBalance = getContractBalance;
exports.genDerivationPrivateKey = genDerivationPrivateKey;
exports.genMultisigUnsignTx = genMultisigUnsignTx;
exports.genMultisigSignedTx = genMultisigSignedTx;
exports.broadcastSignedTx = broadcastSignedTx;