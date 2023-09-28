// const genMulti = require('../gen-multisig')

// var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"
// var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"
// var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"

// const rootPath = "m/48'/1'/0'/2'";
// let expected_xpub1 = "xpub6E1zumpz3fdjP6LEsYs4M2pFdeCBzS3c4CN1ZctDMVtq4DYNpTrHztb6frWySrJZKfc4pMUziLZHjmzRD7iqXP4GmXgCsP93pogAt6fMWZv"
// let expected_xpub2 = "xpub6DYf5mazmtsvj87fZMLaXiwBBNqvoTrXx6UssBuvztARfyZEE29sSgMzkgj4LoJSEWn2Fp1XkufqbwH7P3i4FeXyg2JfcmBohAvfThFAFi4"
// let expected_xpub3 = "xpub6EuY277fHpT2odfUddDzCZgRXzDgLE3rpeWdhD2kw3PUsAnyqBU1xyKpLrLpadFWnTZWBU9ax4biXRaDYyKFKRg3Jzf7QjYCpVxvKJm8kLJ"

// let expected_Vpub1 = "Vpub5mFZRgDbKG79757P9Vknkvy41VwZKYkCYEyEv6MyyFyUaCUq5YuSqt8kS9ZH1UDcjrSSBzHzgEEh6NP44x3m5PojsKPm6xy5B5pkgvwnvuf"
// let expected_Vpub2 = "Vpub5knDbfyc3VMLT6toqJEJwd5yZEbJ8aZ8S967DfPhceF5BxVgV7D2HfueWymMuRDVehcPdSpXioMExXfkEt2yofHSmp2DrM1q3T5FGQ93Sqk"
// let expected_Vpub3 = "Vpub5n96Y1WGZQvSXcScua7icTqDuqy3fLkTJh7s3gWXYoU8P9jS6GXAoxsU79P89FAaCePsZ6xauxH7t1xrQoeAsSRWQnNfeKNEAn7W84uSyCK"

// let expected_address1 = "tltc1qa388qr9prpfgfmqvvy0lhraj7ywld8p9vfuvvz423mladprrqg8safc04t";
// let expected_address2 = "tltc1qws49kmffel4438l5pux63glw68ms8cvawd9w7zwdhxwgr4zv2x3qa58u9q";
// let expected_address3 = "tltc1qgvggqsn0e2ayjjhku8p8unju7pvfxejc0me9xg5slfg0tugkcmpsxr9ky4";

// it('should generate the expected xpub output', async () => {
//     let xpub1 = genMulti.genXpub(mnemonic1, rootPath);
//     let xpub2 = genMulti.genXpub(mnemonic2, rootPath);
//     let xpub3 = genMulti.genXpub(mnemonic3, rootPath);
    
//     expect(xpub1).toBe(expected_xpub1);
//     expect(xpub2).toBe(expected_xpub2);
//     expect(xpub3).toBe(expected_xpub3);
// });

// it('should convert to the expected Vpub output', async () => {
//     let Vpub1 = genMulti.convertXpubToVpub(expected_xpub1);
//     let Vpub2 = genMulti.convertXpubToVpub(expected_xpub2);
//     let Vpub3 = genMulti.convertXpubToVpub(expected_xpub3);
    
//     expect(Vpub1).toBe(expected_Vpub1);
//     expect(Vpub2).toBe(expected_Vpub2);
//     expect(Vpub3).toBe(expected_Vpub3);
// });

// it('should generate the expected address based on derivation path & xpub', async () => {
//     let xpubArray = [expected_xpub1, expected_xpub2, expected_xpub3];

//     let address1 = genMulti.genDerivationAddress(xpubArray, rootPath, ["0/0", "0/0", "0/0"], 2)
//     let address2 = genMulti.genDerivationAddress(xpubArray, rootPath, ["0/1", "0/1", "0/1"], 2)
//     let address3 = genMulti.genDerivationAddress(xpubArray, rootPath, ["0/2", "0/2", "0/2"], 2)
    
//     expect(address1).toBe(expected_address1);
//     expect(address2).toBe(expected_address2);
//     expect(address3).toBe(expected_address3);
// });