const bitcoin = require('bitcoinjs-lib');

const ecc = require('tiny-secp256k1')

const { ECPairFactory } = require('ecpair');
const ECPair = ECPairFactory(ecc);


const psbtString = 'cHNidP8BAFICAAAAAa3WV6PFrKwr1WndYVifh7D/ivIK9dFaA6b9KQtaZBELAAAAAAD9////Ad9JHQAAAAAAFgAUE5NyrHuKoOJUP1Ecs1oQYEH8UegXNSYAAAEBHTpJHQAAAAAAFFlrCtogw94zzUyEiYdKkqq7TWU+AAA=';

// const psbtString = 'cHNidP8BAFICAAAAAa3WV6PFrKwr1WndYVifh7D/ivIK9dFaA6b9KQtaZBELAAAAAAD9////AZVIHQAAAAAAFgAUE5NyrHuKoOJUP1Ecs1oQYEH8UegaNSYAAAEBHzpJHQAAAAAAFgAUWWsK2iDD3jPNTISJh0qSqrtNZT4BAL8CAAAAAAEB81werzYK1b1jyKEzNvP+9yi+I6UUg0qWl81N38Bdef0AAAAAAP3///8BOkkdAAAAAAAWABRZawraIMPeM81MhImHSpKqu01lPgJHMEQCIFlTfSXSM4a42QZFEE8F4MQN/Xz0pZz0N3fyf/10dpVTAiAKeo5IrTcF77zkgxXtSfzLYQEBT0BFyulxE8cIqn/8iAEhAodbyfxF95+H/rSiF+HMwocetlyctNDb0ArpQurRO6x1FzUmACIGA7NkHAPaRuYT3w45LUMPhvErQUE0qBmXSk5KCusc+2dxGEPFfklUAACAAQAAgAAAAIAAAAAAAgAAAAAiAgKHW8n8Rfefh/60ohfhzMKHHrZcnLTQ29AK6ULq0TusdRhDxX5JVAAAgAEAAIAAAACAAAAAAAMAAAAA';

const network = bitcoin.networks.testnet; // Use 'bitcoin.networks.bitcoin' for mainnet

const psbt = bitcoin.Psbt.fromBase64(psbtString, { network });

// Define the private key for the input
// const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); // Replace with your private key // 3
const privateKey = ECPair.fromWIF('cPQyS1KFKrvCwLUnkb178VSAKB6YHsL2fhubAuigevnsHyTiWfEx', network); //2

psbt.signInput(0, privateKey)
// Sign the PSBT with the private key
// psbt.signAllInputs(privateKey);

// Finalize the PSBT to get a fully signed transaction
psbt.finalizeAllInputs();

const psbtSigned = psbt.toBase64();
console.log("psbtSigned ", psbtSigned); // nice. correct

const signedTx = psbt.extractTransaction();
console.log("signedTx ", signedTx)
const signedTxHex = signedTx.toHex();
console.log("signedTxHex ", signedTxHex);

// this code works
// broadcast using https://blockstream.info/testnet/tx/push

// converts unsigned psbt into signedtxhash