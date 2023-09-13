const web3 = require('@solana/web3.js');

const Solana = new web3.Connection(
  "https://quaint-long-arm.solana-testnet.discover.quiknode.pro/6dadba99a7134e14f0fb00897883da61d4c115ff/"
);

let destinationAddress = "Apera7b8ERJfbBavfPDQWuTjWr2cbVb7SxJEmZ5g1G5Y";

const main = async () => {
    const recentInfo = await Solana.getEpochInfo()
    console.log("~~~~~~~~~~~~~~~~~EPOCH INFO~~~~~~~~~~~~\n", recentInfo);

    const keyPair = web3.Keypair.generate();

    console.log("Public Key:", keyPair.publicKey.toString());
    console.log("Secret Key:",keyPair.secretKey)

    // const secret=""; // Replace with your secret key
    // const from = web3.Keypair.fromSecretKey(new Uint8Array(secret));
    // console.log("secret:",secret)
    // console.log("from:",from)

    // const transaction = new web3.Transaction().add(
    //     web3.SystemProgram.transfer({
    //       fromPubkey: from.publicKey,
    //       toPubkey: to.publicKey,
    //       lamports: web3.LAMPORTS_PER_SOL / 100,
    //     }),
    //   );
    
    //   // Sign transaction, broadcast, and confirm
    //   const signature = await web3.sendAndConfirmTransaction(
    //     connection,
    //     transaction,
    //     [from],
    //   );
    //   console.log('SIGNATURE', signature);
}
main();