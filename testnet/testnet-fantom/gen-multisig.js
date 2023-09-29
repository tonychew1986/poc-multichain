var bip39 = require('bip39')
var crypto = require('crypto')
var { ethers, JsonRpcProvider } = require('ethers')
// var HDNodeWallet = require('ethers/wallet')
var { EthersAdapter } = require('@safe-global/protocol-kit')
var SafeProtocol = require('@safe-global/protocol-kit')

var SafeApiKit = require('@safe-global/api-kit')
var { SafeFactory } = require('@safe-global/protocol-kit')
var { SafeAccountConfig } = require('@safe-global/protocol-kit')
var { ContractNetworksConfig } = require(  '@safe-global/protocol-kit')
var Safe = require('@safe-global/protocol-kit')

// https://chainlist.org/?search=goerli&testnets=true
// const RPC_URL='https://eth-goerli.public.blastapi.io'
var RPC_URL = "https://rpc.ankr.com/fantom_testnet"
// const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

// const provider = new JsonRpcProvider(RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
console.log("provider ", provider);

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

// your 12 word phrase
var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"
// xpub6CDvE462ejZE83scWLuQES8j8StrnEnkEUfDA7drpULxKKvke96aUThrbYHJvaBpJXLtJTdNgqvv4PBAYhfZMECB4ugQETqyCQTb267pGi9
var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"
// xpub6D3THqQruQ5dpLN814C4Datb8NLahcTDhRzypSmzQRgtsiNJx3Armk1iLmmvHjFhiAfHaa9QG1irnCVqt8r7m6Vm27qHuak1qcuQGYUpVzc
var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"
// xpub6Bz9nsQMhj1n8U7GWTHPSFtqCJ8yT65yVyCb7s4692C3McRr9iGq8xZ6Xsa8FzJR2CvnwafioRJwbaaBTJs1FwaJHimgziHrcd7WrEXJkaW
const rootPath = "m/44'/60'/0'";

let xpub1 = genXpub(mnemonic1, rootPath)
let xpub2 = genXpub(mnemonic2, rootPath)
let xpub3 = genXpub(mnemonic3, rootPath)
console.log("xpub1 ", xpub1);
console.log("xpub2 ", xpub2);
console.log("xpub3 ", xpub3);

let address1 = genDerivationAddress(xpub1, rootPath, "0/0")
let address2 = genDerivationAddress(xpub2, rootPath, "0/0")
let address3 = genDerivationAddress(xpub3, rootPath, "0/0")

let privateKey1 = genDerivationPrivateKey(mnemonic1, rootPath, "0/0")
let privateKey2 = genDerivationPrivateKey(mnemonic2, rootPath, "0/0")
let privateKey3 = genDerivationPrivateKey(mnemonic3, rootPath, "0/0")

let contract = genContractAddress(
  [address1, address2, address3], 
  [privateKey1, "", ""],
  2
)

function genXpub(mnemonic, rootPath) {
    var seed = bip39.mnemonicToSeedSync(mnemonic)
    console.log("seed ", seed);
    
    const root = bip32.fromSeed(seed)
    console.log("root ", root);
    
    var acct = root.derivePath(rootPath);
    
    const xpub = acct.neutered().toBase58();
    console.log("xpub ", xpub);

    return xpub
}

function genDerivationAddress(xpub, rootPath, subPath) {
    let HDNode = ethers.utils.HDNode.fromExtendedKey(xpub);
    console.log("HDNode ", HDNode);
    
    const address = HDNode.derivePath(subPath);
    console.log("address ", address.address)

    return address.address
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

async function genContractAddress(addressArray, keyArray, threshold) {
  let quorum = addressArray.length;

  let ethAdapterOwnerArray = [];
  for (var i=0; i<quorum; i++) {
    if (keyArray[i] !== "") {
      let ownerSigner = new ethers.Wallet(keyArray[i], provider)
      console.log("ownerSigner ", ownerSigner)
  
      // only need 1 signer, the rest can be provider
      let ethAdapterOwner = new EthersAdapter({
        ethers,
        signerOrProvider: ownerSigner
      })
      console.log("ethAdapterOwner ", ethAdapterOwner)
  
      ethAdapterOwnerArray.push(ethAdapterOwner)
    }
  }
  console.log("ethAdapterOwnerArray ", ethAdapterOwnerArray) 

  let { chainId } = await provider.getNetwork()
  console.log(chainId) 
  
  // const Safe = SafeProtocol.default
  // console.log("Safe ", Safe)
  
  // const safeSdk = await Safe.create({
  //   ethAdapter: ethAdapterOwner,
  // });
  // console.log("safeSdk ", safeSdk)
  
  const safeAccountConfig = {
    owners: addressArray,
    threshold: threshold,
    // ... (Optional params)
  }

  let safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwnerArray[0] })
  console.log("safeFactory ", safeFactory)
  
  /* This Safe is tied to owner 1 because the factory was initialized with
  an adapter that had owner 1 as the signer. */
  let safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
  
  let safeAddress = await safeSdkOwner1.getAddress()
  
  console.log('Your Safe has been deployed:')
  console.log(`https://testnet.ftmscan.com/address/${safeAddress}`)
  console.log(`https://app.safe.global/ftm:${safeAddress}`)

  return safeAddress
}

exports.genXpub = genXpub;
exports.genDerivationPrivateKey = genDerivationPrivateKey;
exports.genDerivationAddress = genDerivationAddress;
exports.genContractAddress = genContractAddress;