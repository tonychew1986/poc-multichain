const genSingle = require('../gen-key-address')

var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

const rootPath = "m/44'/60'/0'";
let expected_xpub = "xpub6CDvE462ejZE83scWLuQES8j8StrnEnkEUfDA7drpULxKKvke96aUThrbYHJvaBpJXLtJTdNgqvv4PBAYhfZMECB4ugQETqyCQTb267pGi9"

let expected_address1 = "0xa3c0318941267ec2C62A23aa711ebECC5D677263";
let expected_address2 = "0x0EC466023CB6f921AFC55F65816F1c6aBfdBb270";
let expected_address3 = "0x848b81d688852475eCd4853F20e09e118982aDC0";

it('should generate the expected xpub output', async () => {
    let xpub = genSingle.genXpub(mnemonic, rootPath)
    
    expect(xpub).toBe(expected_xpub);
});

it('should generate the expected address based on derivation path & xpub', async () => {
    let address1 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/0")
    let address2 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/1")
    let address3 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/2")

    expect(address1).toBe(expected_address1);
    expect(address2).toBe(expected_address2);
    expect(address3).toBe(expected_address3);
});