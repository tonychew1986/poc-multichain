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
// const provider = new JsonRpcProvider(RPC_URL);
// const provider = new Web3.providers.HttpProvider(RPC_URL)
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
// const web3 = new Web3(provider)
console.log("provider ", provider);
// const safeOwner = provider.getSigner(0)
// console.log("safeOwner ", safeOwner);

var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"

var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"

// let safeAddress = "0xe780BF709860bA04903398369Aa20903d39B1a0a";
let safeAddress = "0xf38122004890ebEc2F2EC142175C2BeF5457ae70";

async function main() {
    const ethAdapterProvider = new EthersAdapter({
        ethers,
        signerOrProvider: provider //provider //privateKey1
    })

    const Safe = SafeProtocol.default
    const safeSdk1 = await Safe.create({ ethAdapter: ethAdapterProvider, safeAddress })
    console.log("safeSdk1 ", safeSdk1)

    const safeAmount = ethers.utils.parseEther('0.01', 'ether'); //.toHexString()
    console.log("safeAmount ", ethers.utils.formatEther(safeAmount))
    
    const safeTransactionData = {
        to: '0x073b965F98734DaDd401c33dc55EbD36d232AF58',
        value: safeAmount, //'<eth_value_in_wei>',
        data: '0x'
    }
    console.log("safeTransactionData ", safeTransactionData)

    const safeTransaction = await safeSdk1.createTransaction({ safeTransactionData })
    console.log("safeTransaction ", safeTransaction)

    const txHash = await safeSdk1.getTransactionHash(safeTransaction)
    console.log("txHash ", txHash)
}

main()