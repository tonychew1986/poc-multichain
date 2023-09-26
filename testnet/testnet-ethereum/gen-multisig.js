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
var RPC_URL = "https://goerli.infura.io/v3/fa926a9d3c2a4067af17c4df5b3d6079"
// const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

// const provider = new JsonRpcProvider(RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
console.log("provider ", provider);

const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc)

// what you describe as 'seed'
var  randomBytes = crypto.randomBytes(16) // 128 bits is enough

// your 12 word phrase
var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"
// xpub6CDvE462ejZE83scWLuQES8j8StrnEnkEUfDA7drpULxKKvke96aUThrbYHJvaBpJXLtJTdNgqvv4PBAYhfZMECB4ugQETqyCQTb267pGi9
var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"
// xpub6D3THqQruQ5dpLN814C4Datb8NLahcTDhRzypSmzQRgtsiNJx3Armk1iLmmvHjFhiAfHaa9QG1irnCVqt8r7m6Vm27qHuak1qcuQGYUpVzc
var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"
// xpub6Bz9nsQMhj1n8U7GWTHPSFtqCJ8yT65yVyCb7s4692C3McRr9iGq8xZ6Xsa8FzJR2CvnwafioRJwbaaBTJs1FwaJHimgziHrcd7WrEXJkaW

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

  var seed1 = bip39.mnemonicToSeedSync(mnemonic1) 
  var seed2 = bip39.mnemonicToSeedSync(mnemonic2) 
  var seed3 = bip39.mnemonicToSeedSync(mnemonic3) 

  // console.log("mnemonic1 ", mnemonic1);
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
  var acct2 = root2.derivePath("m/44'/60'/0'");
  var acct3 = root3.derivePath("m/44'/60'/0'");
  // check if 60 is testnet. there should be a testnet path differentiation

  const xpub1 = acct1.neutered().toBase58();
  const xpub2 = acct2.neutered().toBase58();
  const xpub3 = acct3.neutered().toBase58();

  console.log("xpub1 ", xpub1);
  console.log("xpub2 ", xpub2);
  console.log("xpub3 ", xpub3);

  const HDNode1 = ethers.utils.HDNode.fromExtendedKey(xpub1);
  const HDNode2 = ethers.utils.HDNode.fromExtendedKey(xpub2);
  const HDNode3 = ethers.utils.HDNode.fromExtendedKey(xpub3);
  console.log("HDNode1 ", HDNode1);
  console.log("HDNode2 ", HDNode2);
  console.log("HDNode3 ", HDNode3);


  const address1_0 = HDNode1.derivePath("0/0");
  const address1_1 = HDNode1.derivePath("0/1");
  const address1_2 = HDNode1.derivePath("0/2");
  const address1_3 = HDNode1.derivePath("0/3");
  const address1_4 = HDNode1.derivePath("0/4");
  const address1_5 = HDNode1.derivePath("0/5");

  console.log("address1_0 ", address1_0)
  console.log("address1_1 ", address1_1)
  console.log("address1_2 ", address1_2)
  console.log("address1_3 ", address1_3)
  console.log("address1_4 ", address1_4)
  console.log("address1_5 ", address1_5)

  const address2_0 = HDNode2.derivePath("0/0");
  const address2_1 = HDNode2.derivePath("0/1");
  const address2_2 = HDNode2.derivePath("0/2");
  const address2_3 = HDNode2.derivePath("0/3");
  const address2_4 = HDNode2.derivePath("0/4");
  const address2_5 = HDNode2.derivePath("0/5");

  console.log("address2_0 ", address2_0)
  console.log("address2_1 ", address2_1)
  console.log("address2_2 ", address2_2)
  console.log("address2_3 ", address2_3)
  console.log("address2_4 ", address2_4)
  console.log("address2_5 ", address2_5)

  const address3_0 = HDNode3.derivePath("0/0");
  const address3_1 = HDNode3.derivePath("0/1");
  const address3_2 = HDNode3.derivePath("0/2");
  const address3_3 = HDNode3.derivePath("0/3");
  const address3_4 = HDNode3.derivePath("0/4");
  const address3_5 = HDNode3.derivePath("0/5");

  console.log("address3_0 ", address3_0)
  console.log("address3_1 ", address3_1)
  console.log("address3_2 ", address3_2)
  console.log("address3_3 ", address3_3)
  console.log("address3_4 ", address3_4)
  console.log("address3_5 ", address3_5)

  const owner1Signer = new ethers.Wallet(privateKey1, provider)
  const owner2Signer = new ethers.Wallet(privateKey2, provider)
  const owner3Signer = new ethers.Wallet(privateKey3, provider)
  console.log("owner1Signer ", owner1Signer)
  console.log("owner2Signer ", owner2Signer)
  console.log("owner3Signer ", owner3Signer)

  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer
  })
  const ethAdapterOwner2 = new EthersAdapter({
    ethers,
    signerOrProvider: owner2Signer
  })
  const ethAdapterOwner3 = new EthersAdapter({
    ethers,
    signerOrProvider: owner3Signer
  })
  console.log("ethAdapterOwner1 ", ethAdapterOwner1)
  console.log("ethAdapterOwner2 ", ethAdapterOwner2)
  console.log("ethAdapterOwner3 ", ethAdapterOwner3)

  console.log("xxx ")
  const { chainId } = await provider.getNetwork()
  console.log(chainId) // 42
  // var chainId = await ethAdapterOwner1.getChainId()
  // // console.log("xxx ")
  // console.log("chainId ", chainId)

  // const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
  // const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })
  const Safe = SafeProtocol.default
  console.log("Safe ", Safe)
  // const safeSdk = await Safe.create({ ethAdapter: ethAdapterOwner1})
  const safeSdk = await Safe.create({
    ethAdapter: ethAdapterOwner1,
  });

  // isL1SafeMasterCopy: true,
  // safeAddress: GNOSIS_SAFE_ADDR,
  console.log("safeSdk ", safeSdk)
  
  const safeAccountConfig = {
    owners: [
      await owner1Signer.getAddress(),
      await owner2Signer.getAddress(),
      await owner3Signer.getAddress()
    ],
    threshold: 2,
    // ... (Optional params)
  }

  // const predictedSafe = {
  //   safeAccountConfig,
  //   safeDeploymentConfig
  // }

  const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
  // const safeSdk = await Safe.create({ ethAdapter:ethAdapterOwner1, predictedSafe });

  console.log("safeFactory ", safeFactory)
  // const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
  // console.log("xxx ")
  
  /* This Safe is tied to owner 1 because the factory was initialized with
  an adapter that had owner 1 as the signer. */
  const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
  
  const safeAddress = await safeSdkOwner1.getAddress()
  
  console.log('Your Safe has been deployed:')
  console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
  console.log(`https://app.safe.global/gor:${safeAddress}`)
  
  // const safeAmount = ethers.utils.parseUnits('0.01', 'ether').toHexString()
  
  // const transactionParameters = {
  //   to: safeAddress,
  //   value: safeAmount
  // }
  
  // const tx = await owner1Signer.sendTransaction(transactionParameters)
  
  // console.log('Fundraising.')
  // console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
  
  
  
  // create gnosis safe smart contract
  // set m of n
  // add addresses
  // publish on-chain
  // wait for confirmation
  // get smart contract address
}

main()