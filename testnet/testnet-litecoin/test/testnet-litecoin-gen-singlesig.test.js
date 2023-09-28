const genSingle = require('../gen-key-address')

var mnemonic = "cabin version vessel crash eye hero left pool frown stable uphold prevent rude couch primary drum student heavy sail airport lens ball swap first"

const rootPath = "m/84'/1'/0'";
let expected_xpub = "xpub6Bvbt2LwsbQHeRPds4uKuEJzUCHiEQrZVKzcZrcoDFeXbzce6JcHSvTM7DE9jnju7U11aoB4hHybn3bmRSXMwk5bR3g94cJVzUkauZrsHNL"
let expected_vpub = "vpub5YG5Gh17aEKKwq1QCML5V47z8FzpMAsZf6xB14q2TEtmVnzBazHACo954oJyjyS4JBmQ5qywmyGW1UNdz3hLMGiPgNHHtnfXT2dJ8LPWmT5"
//"tpubDDs6fEDFJzv6g5kgfVh64YZiXuyd7xoNQKnJP36nEj62yZmgxHcUHz7o2nrZjn9tH4pXjw7oE6Yp8oa3nWE5L6AYkYjFzdZ56TWbyENtnaZ"

let expected_address1 = "tltc1qp482ztucz5h47sd7kyrxwx4509dm2a58z2vc3l";
let expected_address2 = "tltc1qjd0wy3a2klnj9njhy0ptaf59mx2gkjy54jkxd9";
let expected_address3 = "tltc1qt94s4k3qc00r8n2vsjycwj5j42a56ef7yrjapa";

it('should generate the expected xpub output', async () => {
    let {xpub, vpub} = genSingle.genXpub(mnemonic, rootPath)
    
    expect(xpub).toBe(expected_xpub);
    expect(vpub).toBe(expected_vpub);
});

it('should generate the expected address based on derivation path & xpub', async () => {
    let address1 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/0")
    let address2 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/1")
    let address3 = genSingle.genDerivationAddress(expected_xpub, rootPath, "0/2")

    expect(address1).toBe(expected_address1);
    expect(address2).toBe(expected_address2);
    expect(address3).toBe(expected_address3);
});