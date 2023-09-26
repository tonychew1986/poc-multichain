
var SafeApiKit = require('@safe-global/api-kit')
var { EthersAdapter, Web3Adapter } = require('@safe-global/protocol-kit')


var { ethers, JsonRpcProvider } = require('ethers')
var { Web3 } = require('web3')
var bip39 = require('bip39')

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)



var RPC_URL = "https://goerli.infura.io/v3/fa926a9d3c2a4067af17c4df5b3d6079"
// const provider = new JsonRpcProvider(RPC_URL);
const provider = new Web3.providers.HttpProvider(RPC_URL)
const web3 = new Web3(provider)
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

    const mnemonicWallet1 = ethers.Wallet.fromPhrase(mnemonic1, fullPath);
    const mnemonicWallet2 = ethers.Wallet.fromPhrase(mnemonic2, fullPath);
    const mnemonicWallet3 = ethers.Wallet.fromPhrase(mnemonic3, fullPath);
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

    const HDNode1 = ethers.HDNodeWallet.fromExtendedKey(xpub1);
    const HDNode2 = ethers.HDNodeWallet.fromExtendedKey(xpub2);
    const HDNode3 = ethers.HDNodeWallet.fromExtendedKey(xpub3);
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
    const ethAdapter = new Web3Adapter({
        web3,
        signerAddress: privateKey1
    })
    console.log("ethAdapter ", ethAdapter)
    
    const safeService = new SafeApiKit({
        txServiceUrl: 'https://safe-transaction-goerli.safe.global',
        // txServiceUrl: 'https://safe-transaction-mainnet.safe.global',
        ethAdapter
    })

    const chainId = await ethAdapter.getChainId()
    console.log("chainId ", chainId)

    // let safeAddress = "0xB1a96D496B198Bcd35d6cD328F832C56b5C77076";
    let safeAddress = "0xe32c39ef4CA5520764B75962A26b1cff371EFC53";

    const serviceInfo = await safeService.getServiceInfo()
}

main()