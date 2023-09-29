const genMulti = require('../gen-multisig')

var mnemonic1 = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"
var mnemonic2 = "outer unusual this swamp endorse wrong sauce dash camp argue mention poem refuse goat engage flip second pyramid guess lounge sound gun craft noble"
var mnemonic3 = "daughter slam polar summer boost end can mansion armor rotate bamboo scan skin offer earn sleep control maze message void fit artist speak swarm"

const rootPath = "m/44'/60'/0'";
let expected_xpub1 = "xpub6CDvE462ejZE83scWLuQES8j8StrnEnkEUfDA7drpULxKKvke96aUThrbYHJvaBpJXLtJTdNgqvv4PBAYhfZMECB4ugQETqyCQTb267pGi9"
let expected_xpub2 = "xpub6D3THqQruQ5dpLN814C4Datb8NLahcTDhRzypSmzQRgtsiNJx3Armk1iLmmvHjFhiAfHaa9QG1irnCVqt8r7m6Vm27qHuak1qcuQGYUpVzc"
let expected_xpub3 = "xpub6Bz9nsQMhj1n8U7GWTHPSFtqCJ8yT65yVyCb7s4692C3McRr9iGq8xZ6Xsa8FzJR2CvnwafioRJwbaaBTJs1FwaJHimgziHrcd7WrEXJkaW"

let expected_address1 = "0xa3c0318941267ec2C62A23aa711ebECC5D677263";
let expected_address2 = "0x1181f6E644B5FAe2748f6c674Fe3e7B8683Dc7De";
let expected_address3 = "0x76288888297a3d79D5d4EEaaE6637fb8bCca6F47";

let expected_privatekey1 = "0x28f6f1460f284f2db257fe2f9a9ae9fdb6cf018ae6e7a17e7af02203107668ce";
let expected_privatekey2 = "0xf4b172566e059a0ca159355927d7a971c2190295d8f72d7f887ebad5280a854e";
let expected_privatekey3 = "0xa92e3d8fbeee92ac34e151637bfa94dcfeb3c1d3f0ec89aca981c0560781e4e8";

it('should generate the expected xpub output', async () => {
    let xpub1 = genMulti.genXpub(mnemonic1, rootPath)
    let xpub2 = genMulti.genXpub(mnemonic2, rootPath)
    let xpub3 = genMulti.genXpub(mnemonic3, rootPath)
    
    expect(xpub1).toBe(expected_xpub1);
    expect(xpub2).toBe(expected_xpub2);
    expect(xpub3).toBe(expected_xpub3);
});

it('should generate the expected address based on derivation path & xpub', async () => {
    let address1 = genMulti.genDerivationAddress(expected_xpub1, rootPath, "0/0")
    let address2 = genMulti.genDerivationAddress(expected_xpub2, rootPath, "0/0")
    let address3 = genMulti.genDerivationAddress(expected_xpub3, rootPath, "0/0")

    expect(address1).toBe(expected_address1);
    expect(address2).toBe(expected_address2);
    expect(address3).toBe(expected_address3);
});

it('should generate the expected private key based on derivation path & mnemonic', async () => {
    let privateKey1 = genMulti.genDerivationPrivateKey(mnemonic1, rootPath, "0/0")
    let privateKey2 = genMulti.genDerivationPrivateKey(mnemonic2, rootPath, "0/0")
    let privateKey3 = genMulti.genDerivationPrivateKey(mnemonic3, rootPath, "0/0")

    expect(privateKey1).toBe(expected_privatekey1);
    expect(privateKey2).toBe(expected_privatekey2);
    expect(privateKey3).toBe(expected_privatekey3);
});
