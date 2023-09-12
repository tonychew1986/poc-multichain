
var {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    Hbar,
    AccountId,
    KeyList,
    TransferTransaction,
    Transaction,
} = require('@hashgraph/sdk')
var dotenv = require('dotenv')

dotenv.config();

/** @type {PrivateKey | undefined} */
let user1Key;

/** @type {PrivateKey | undefined} */
let user2Key;

/** @type {PrivateKey | undefined} */
let user3Key;

async function main() {
    let client;

    try {
        client = Client.forName(process.env.HEDERA_NETWORK).setOperator(
            AccountId.fromString(process.env.OPERATOR_ID),
            PrivateKey.fromString(process.env.OPERATOR_KEY)
        );
    } catch (error) {
        throw new Error(
            "Environment variables HEDERA_NETWORK, OPERATOR_ID, and OPERATOR_KEY are required."
        );
    } 

    // generate keys
    const privateKeyList = [];
    const publicKeyList = [];

    user1Key = PrivateKey.generate();
    user2Key = PrivateKey.generate();
    user3Key = PrivateKey.generate();

    let user1publicKey = user1Key.publicKey;
    let user2publicKey = user2Key.publicKey;
    let user3publicKey = user3Key.publicKey;

    console.log(`private key for user 1= ${user1Key.toString()}`);
    console.log(`public key for user 1= ${user1Key.publicKey.toString()}`);
    console.log(`private key for user 2= ${user2Key.toString()}`);
    console.log(`public key for user 2= ${user2Key.publicKey.toString()}`);
    console.log(`private key for user 3= ${user3Key.toString()}`);
    console.log(`public key for user 3= ${user3Key.publicKey.toString()}`);

    // create a multi-sig account
    // const keyList = new KeyList([user1Key, user2Key, user3Key]);
    // console.log(`keyList = ${keyList}`);

    privateKeyList.push(user1Key);
    privateKeyList.push(user2Key);
    privateKeyList.push(user3Key);

    publicKeyList.push(user1publicKey);
    publicKeyList.push(user2publicKey);
    publicKeyList.push(user3publicKey);

    const thresholdKey = new KeyList(publicKeyList, 2);

    const createAccountTransaction = new AccountCreateTransaction()
        .setInitialBalance(new Hbar(2)) // 5 h
        .setAccountMemo("HX 2-of-3 multi-sig account")
        .setKey(thresholdKey);

    console.log(`createAccountTransaction  = ${createAccountTransaction }`);

    const response = await createAccountTransaction.execute(client);

    let receipt = await response.getReceipt(client);

    console.log(`account id = ${receipt.accountId.toString()}`);

    // create a transfer from new account to 0.0.3
    const transferTransaction = new TransferTransaction()
        .setNodeAccountIds([new AccountId(3)])
        .addHbarTransfer(receipt.accountId, -1)
        .addHbarTransfer("0.0.3", 1)
        .freezeWith(client);

    // convert transaction to bytes to send to signatories
    const transactionBytes = transferTransaction.toBytes();
    const transactionToExecute = Transaction.fromBytes(transactionBytes);

    // ask users to sign and return signature
    const user1Signature = user1Signs(transactionBytes);
    const user2Signature = user2Signs(transactionBytes);

    // recreate the transaction from bytes
    await transactionToExecute.signWithOperator(client);
    transactionToExecute.addSignature(user1Key.publicKey, user1Signature);
    transactionToExecute.addSignature(user2Key.publicKey, user2Signature);

    const result = await transactionToExecute.execute(client);
    receipt = await result.getReceipt(client);
    console.log(receipt.status.toString());
}

/**
 * @param {Uint8Array} transactionBytes
 * @returns {Uint8Array}
 */
function user1Signs(transactionBytes) {
    const transaction = Transaction.fromBytes(transactionBytes);
    return user1Key.signTransaction(transaction);
}

/**
 * @param {Uint8Array} transactionBytes
 * @returns {Uint8Array}
 */
function user2Signs(transactionBytes) {
    const transaction = Transaction.fromBytes(transactionBytes);
    return user2Key.signTransaction(transaction);
}

void main();