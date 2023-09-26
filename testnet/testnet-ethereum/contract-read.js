var { ethers, JsonRpcProvider } = require('ethers')
const fs = require('fs');
const axios = require('axios');

var RPC_URL = "https://mainnet.infura.io/v3/fa926a9d3c2a4067af17c4df5b3d6079"
const provider = new JsonRpcProvider(RPC_URL);
console.log("provider ", provider);

const jsonFile = "./abi/abi_bayc.json";
const abi=JSON.parse(fs.readFileSync(jsonFile));

let tokenContract = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
const contract = new ethers.Contract(tokenContract, abi, provider)

let tokenId = 20;
let ipfsRoute = "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/"

// https://etherscan.io/token/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d#readContract
async function main() {
    let bayc_provenance = await contract.BAYC_PROVENANCE();
    console.log("bayc_provenance ", bayc_provenance);
    let baseURI = await contract.baseURI();
    console.log("baseURI ", baseURI);
    console.log("baseURI ", ipfsRoute + tokenId);

    let ipfsData = await axios({
        method: 'get',
        url: ipfsRoute + tokenId,
    })
    .then(function (response) {
        console.log("data", response.data)
        return response.data.image
    });

    console.log("ipfsData", ipfsData)
}

main()