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

const fs = require('fs');
const jsonFile = "./abi/abi.json";
const abi=JSON.parse(fs.readFileSync(jsonFile));


var RPC_URL = "https://goerli.infura.io/v3/fa926a9d3c2a4067af17c4df5b3d6079"
// const provider = new JsonRpcProvider(RPC_URL);
// const provider = new Web3.providers.HttpProvider(RPC_URL)
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
// const web3 = new Web3(provider)
console.log("provider ", provider);
// const safeOwner = provider.getSigner(0)
// console.log("safeOwner ", safeOwner);


let tokenContract = "0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc"
const contract = new ethers.Contract(tokenContract, abi, provider)

var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"

var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"

const rootPath = "m/44'/60'/0'";

// let safeAddress = "0xe780BF709860bA04903398369Aa20903d39B1a0a";
let safeAddress = "0xf38122004890ebEc2F2EC142175C2BeF5457ae70";
    
let destinationAddress = "0x073b965F98734DaDd401c33dc55EbD36d232AF58";

async function main() {
    let network = await provider.getNetwork();
    chainId = network.chainId;
    console.log('chainId ', chainId)
    // const subPath = "0/0";
    // const fullPath = rootPath + subPath;

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

    await isOwner(provider, safeAddress, address1);
    await isOwner(provider, safeAddress, address2);
    await isOwner(provider, safeAddress, address3);

    await getOwners(provider, safeAddress);
    
    let balance1 = await getBalance(address1);
    let balance2 = await getBalance(address2);
    let balanceContract = await getBalance(safeAddress);
    let balanceTokenContract = await getContractTokenBalance(safeAddress, contract);

    console.log('balance1 ', balance1)
    console.log('balance2 ', balance2)
    console.log('balanceContract ', balanceContract)
    console.log('balanceTokenContract ', balanceTokenContract)

    let amountToken = ethers.utils.parseUnits("1.0", 18);
    let data = contract.interface.encodeFunctionData("transfer", [destinationAddress, amountToken] )
    let unsignedTokenTx = await genMultisigTokenUnsignTx(provider, safeAddress, destinationAddress, amountToken, tokenContract, data, "", "");
    
    let signedTxArray = [];
    let signedTx;
    signedTxArray.push(unsignedTokenTx)

    console.log("---------------")
    console.log("first signing")
    console.log("---------------")
    if (balance1 > 0 || balance2 > 0) {
        signedTx = await genMultisigSignedTx(signer1, signedTxArray[signedTxArray.length - 1], safeAddress);
        signedTxArray.push(signedTx)
    }
    console.log("---------------")
    console.log("second signing")
    console.log("---------------")
    console.log('signedTxArray ', signedTxArray)

    if (balance1 > 0 || balance2 > 0) {
        signedTx = await genMultisigSignedTx(signer2, signedTxArray[signedTxArray.length - 1], safeAddress);
        signedTxArray.push(signedTx)
    }
    
    console.log('signedTxArray ', signedTxArray)
    
    let tx = await broadcastSignedTx(signer1, signedTxArray[signedTxArray.length - 1], safeAddress);
    console.log('tx ', tx)
}

main()


async function isOwner(provider, safeAddress, address) {
    const ethAdapterProvider = new EthersAdapter({
        ethers,
        signerOrProvider: provider //provider //privateKey1
    })
    console.log("ethAdapterProvider ", ethAdapterProvider)

    const Safe = SafeProtocol.default
    const safeSdk = await Safe.create({ ethAdapter: ethAdapterProvider, safeAddress })

    let isOwner = await safeSdk.isOwner(address)
    console.log("isOwner ", isOwner)

    return isOwner;
}

async function getOwners(provider, safeAddress) {
    const ethAdapterProvider = new EthersAdapter({
        ethers,
        signerOrProvider: provider //provider //privateKey1
    })
    console.log("ethAdapterProvider ", ethAdapterProvider)

    const Safe = SafeProtocol.default
    const safeSdk = await Safe.create({ ethAdapter: ethAdapterProvider, safeAddress })

    let ownerAddresses = await safeSdk.getOwners()
    console.log("ownerAddresses ", ownerAddresses)

    return ownerAddresses;
}

async function getBalance(sourceAddress) {
    let balance = await provider.getBalance(sourceAddress);
    balance = ethers.utils.formatEther(balance)
    console.log('balance ', balance)

    return balance;
}

async function getContractTokenBalance(sourceAddress, contract) {
    let balanceTokenContract = await contract.balanceOf(sourceAddress);
    balanceTokenContract = (balanceTokenContract).toString()
    console.log('balanceTokenContract ', balanceTokenContract)

    return balanceTokenContract;
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

async function genMultisigTokenUnsignTx(provider, sourceAddress, destinationAddress, amountToken, tokenContract, data, nonceProvided, gasPriceProvided, gasLimit = 250000) {
    let gasPrice;
    let nonce;

    let network = await provider.getNetwork();
    chainId = network.chainId;
    console.log('chainId ', chainId)

    const ethAdapterProvider = new EthersAdapter({
        ethers,
        signerOrProvider: provider //provider //privateKey1
    })
    console.log("ethAdapterProvider ", ethAdapterProvider)

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
    

    var gasPriceDerived  = await provider.getFeeData()
    console.log('gasPriceDerived ', gasPriceDerived)

    let gasLimitDerived = await provider.estimateGas({
        from: sourceAddress,
        to: tokenContract,
        value: ethers.utils.parseUnits("0.000", "ether"),
        data: data
    });
    let safeTransactionData = {
        // nonce: txCount,
        gasPrice: gasPriceDerived.gasPrice,
        gasLimit: gasLimitDerived,
        // EIP-1559 fields
        // maxFeePerGas: gasPrice.maxFeePerGas,
        // maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
        to: tokenContract,
        value: ethers.utils.parseUnits("0.000", "ether"),
        data: data,
        chainId: chainId,
        // EIP-2718
        // type: 0
    }
    
    const Safe = SafeProtocol.default
    const safeSdk = await Safe.create({ ethAdapter: ethAdapterProvider, safeAddress })
    
    const safeTransaction = await safeSdk.createTransaction({ safeTransactionData })
    console.log("safeTransaction ", safeTransaction)

    const txHash = await safeSdk.getTransactionHash(safeTransaction)
    console.log("txHash ", txHash)

    let unsignTx = safeTransaction

    return unsignTx
}

async function genMultisigSignedTx(signer, unsignTx, safeAddress) {
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer //provider //privateKey1
    })
    console.log("ethAdapter ", ethAdapter)
    console.log("signer ", signer)
    
    console.log("unsignTx.signatures ", unsignTx.signatures)

    let Safe = SafeProtocol.default
    let safeSdk = await Safe.create({ ethAdapter: ethAdapter, safeAddress })
    console.log("safeSdk ", safeSdk)
    console.log("unsignTx ", unsignTx)

    const balance = await safeSdk.getBalance()
    console.log("balance ", ethers.utils.formatEther(balance))

    const nonce = await safeSdk.getNonce()
    console.log("nonce ", nonce)
    console.log("------------------")
    console.log("------------------")

    console.log("unsignTx ", unsignTx)

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

async function broadcastSignedTx(signer, signedTx, safeAddress) {
    console.log('broadcastSignedTx');
    console.log('signedTx ', signedTx);

    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer //provider //privateKey1
    })

    let Safe = SafeProtocol.default
    let safeSdk = await Safe.create({ ethAdapter: ethAdapter, safeAddress })

    let broadcastTx = await safeSdk.executeTransaction(signedTx)
    await broadcastTx.transactionResponse?.wait()
    console.log('broadcastTx ', broadcastTx);

    return broadcastTx;
}

// const options = {
//     // from, // Optional
//     gasLimit: gasLimitDerived, // Optional
//     gasPrice: gasPriceDerived, // Optional
//     // maxFeePerGas, // Optional
//     // maxPriorityFeePerGas // Optional
//     // nonce // Optional
// }

// on-chain
// const txResponse = await safeSdk.approveTransactionHash(txHash, options)
// console.log("txResponse ", txResponse)
// await txResponse.transactionResponse?.wait()
// console.log("txResponse ", txResponse)

exports.isOwner = isOwner;
exports.getOwners = getOwners;
exports.getBalance = getBalance;
exports.getContractTokenBalance = getContractTokenBalance;
exports.getContractBalance = getContractBalance;
exports.genDerivationPrivateKey = genDerivationPrivateKey;
exports.genMultisigTokenUnsignTx = genMultisigTokenUnsignTx;
exports.genMultisigSignedTx = genMultisigSignedTx;
exports.broadcastSignedTx = broadcastSignedTx;