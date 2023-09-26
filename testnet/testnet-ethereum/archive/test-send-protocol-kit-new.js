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

async function main() {
    const rootPath = "m/44'/60'/0'";
    const subPath = "0/0";
    const fullPath = rootPath + subPath;

    const hdNode1 = ethers.utils.HDNode.fromMnemonic(mnemonic1);
    const hdNode2 = ethers.utils.HDNode.fromMnemonic(mnemonic2);
    const hdNode3 = ethers.utils.HDNode.fromMnemonic(mnemonic3);
    console.log("hdNode1 ", hdNode1);
    console.log("hdNode2 ", hdNode2);
    console.log("hdNode3 ", hdNode3);

    const mnemonicWallet1 = hdNode1.derivePath(`m/44'/60'/0'/0/0`);
    const mnemonicWallet2 = hdNode2.derivePath(`m/44'/60'/0'/0/0`);
    const mnemonicWallet3 = hdNode3.derivePath(`m/44'/60'/0'/0/0`);
    console.log("mnemonicWallet1 ", mnemonicWallet1);
    console.log("mnemonicWallet2 ", mnemonicWallet2);
    console.log("mnemonicWallet3 ", mnemonicWallet3);

    const privateKey1 = mnemonicWallet1.privateKey;
    const privateKey2 = mnemonicWallet2.privateKey;
    const privateKey3 = mnemonicWallet3.privateKey;
    console.log("privateKey1 ", privateKey1);
    console.log("privateKey2 ", privateKey2);
    console.log("privateKey3 ", privateKey3);
    

    const signer1 = new ethers.Wallet(privateKey1, provider);
    const signer2 = new ethers.Wallet(privateKey2, provider);
    const signer3 = new ethers.Wallet(privateKey3, provider);
    console.log('signer1 ', signer1)
    console.log('signer1 ', signer1.getAddress())

    var seed1 = bip39.mnemonicToSeedSync(mnemonic1) 
    var seed2 = bip39.mnemonicToSeedSync(mnemonic2) 
    var seed3 = bip39.mnemonicToSeedSync(mnemonic3) 
    console.log("seed1 ", seed1);
    console.log("seed2 ", seed2);
    console.log("seed3 ", seed3);

    const root1 = bip32.fromSeed(seed1)
    const root2 = bip32.fromSeed(seed2)
    const root3 = bip32.fromSeed(seed3)
    console.log("root1 ", root1);
    console.log("root2 ", root2);
    console.log("root3 ", root3);

    var acct1 = root1.derivePath("m/44'/60'/0'");

    const xpub1 = acct1.neutered().toBase58();
    const xpub2 = acct1.neutered().toBase58();
    const xpub3 = acct1.neutered().toBase58();
    console.log("xpub1 ", xpub1);
    console.log("xpub2 ", xpub2);
    console.log("xpub3 ", xpub3);

    const HDNode1 = ethers.utils.HDNode.fromExtendedKey(xpub1);
    const HDNode2 = ethers.utils.HDNode.fromExtendedKey(xpub2);
    const HDNode3 = ethers.utils.HDNode.fromExtendedKey(xpub3);
    // const HDNode1 = ethers.HDNodeWallet.fromExtendedKey(xpub1);
    // const HDNode2 = ethers.HDNodeWallet.fromExtendedKey(xpub2);
    // const HDNode3 = ethers.HDNodeWallet.fromExtendedKey(xpub3);
    console.log("HDNode1 ", HDNode1);
    console.log("HDNode2 ", HDNode2);
    console.log("HDNode3 ", HDNode3);


    const address1_0 = HDNode1.derivePath("0/0");
    const address2_0 = HDNode2.derivePath("0/0");
    const address3_0 = HDNode3.derivePath("0/0");
    console.log("address1_0 ", address1_0.address);
    console.log("address2_0 ", address2_0);
    console.log("address3_0 ", address3_0);
    
    // const owner1Signer = new ethers.Wallet(privateKey1, provider)
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer1 //provider //privateKey1
    })
    console.log("ethAdapter ", ethAdapter)

    const chainId = await ethAdapter.getChainId()
    console.log("chainId ", chainId)

    // let safeAddress = "0xB1a96D496B198Bcd35d6cD328F832C56b5C77076";
    let safeAddress = "0xe32c39ef4CA5520764B75962A26b1cff371EFC53";

    // const safeFactory = await SafeFactory.create({ ethAdapter })
    // console.log("safeFactory ", safeFactory)
    const Safe = SafeProtocol.default
    const safeSdk = await Safe.create({ ethAdapter: ethAdapter, safeAddress })
    console.log("safeSdk ", safeSdk)

    // const safeFactory = await SafeFactory.connect({ ethAdapter, "0xB1a96D496B198Bcd35d6cD328F832C56b5C77076" })
    // // safeAddress for pre-created safe // gor:0xB1a96D496B198Bcd35d6cD328F832C56b5C77076
    // console.log("safeFactory ", safeFactory)

    const safeAmount = ethers.utils.parseEther('0.01', 'ether'); //.toHexString()
    console.log("safeAmount ", ethers.utils.formatEther(safeAmount))
    
    const safeTransactionData = {
        to: '0x073b965F98734DaDd401c33dc55EbD36d232AF58',
        value: safeAmount, //'<eth_value_in_wei>',
        data: '0x'
    }
    console.log("safeTransactionData ", safeTransactionData)

    const safeTransaction = await safeSdk.createTransaction({ safeTransactionData })
    console.log("safeTransaction ", safeTransaction)

    const txHash = await safeSdk.getTransactionHash(safeTransaction)
    console.log("txHash ", txHash)

    const ownerAddresses = await safeSdk.getOwnersWhoApprovedTx(txHash)
    console.log("ownerAddresses ", ownerAddresses)

    const safeAddress2 = await safeSdk.getAddress()
    console.log("safeAddress2 ", safeAddress2)

    const isOwner = await safeSdk.isOwner(signer1.getAddress())
    console.log("isOwner ", isOwner)

    const balance = await safeSdk.getBalance()
    console.log("balance ", ethers.utils.formatEther(balance))

    const chainId2 = await safeSdk.getChainId()
    console.log("chainId2 ", chainId2)

    const nonce = await safeSdk.getNonce()
    console.log("nonce ", nonce)

    const ownerAddresses2 = await safeSdk.getOwners()
    console.log("ownerAddresses2 ", ownerAddresses2)
    console.log('signer1 ', signer1.getAddress())

    const signedSafeTransaction = await safeSdk.signTransaction(safeTransaction)
    console.log("signedSafeTransaction ", signedSafeTransaction)
    console.log("signedSafeTransaction ", signedSafeTransaction.signatures)
    

    let gasLimit = await provider.estimateGas({
        from: signer1.getAddress(),
        to: safeAddress,
        value: safeAmount,
        data: '0x'
    });

    const options = {
        // from, // Optional
        gasLimit: 200000, // Optional
        gasPrice: ethers.utils.parseUnits('50', 'gwei'), // Optional
        // maxFeePerGas, // Optional
        // maxPriorityFeePerGas // Optional
        // nonce // Optional
    }

    // on-chain
    // const txResponse = await safeSdk.approveTransactionHash(txHash, options)
    // console.log("txResponse ", txResponse)
    // await txResponse.transactionResponse?.wait()
    // console.log("txResponse ", txResponse)

    const txResponse2 = await safeSdk.executeTransaction(signedSafeTransaction)
    await txResponse2.transactionResponse?.wait()
    console.log("txResponse2 ", txResponse2)

    // const owners = [address1_0, address2_0, address3_0]
    // const owners = [
    //     address1_0.address, 
    //     "0x0Af52045f63B109934db4b3a4020eF5CDc046BE6", 
    //     "0x073b965F98734DaDd401c33dc55EbD36d232AF58"
    // ]
    // const threshold = 2
    // const safeAccountConfig = {
    //     owners,
    //     threshold
    // }
    // console.log("safeAccountConfig ", safeAccountConfig)

    // const safeSdk = await safeFactory.deploySafe({ safeAccountConfig })
    // console.log("safeSdk ", safeSdk)

    // const newSafeAddress = await safeSdk.getAddress()
    // console.log("newSafeAddress ", newSafeAddress)
}

main()