const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {

    let buyer, seller, lender, inspector
    let realEstate, escrow

    it("save the address", async ()=> {

        //Steup fake accounds
        [buyer, seller, lender, inspector] = await ethers.getSigners();

        //Deploy realEstate contarct 
        const RealEstate = await ethers.getContractFactory("RealEstate");
         realEstate = await RealEstate.deploy();
        console.log("Address",realEstate.address);
        expect(realEstate.address).to.not.be.undefined;

        //Mint
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        await transaction.wait();

        //Deploy escrow contract
        const Escrow = await ethers.getContractFactory("Escrow");
        escrow = await Escrow.deploy(
            realEstate.address,
            seller.address,
            inspector.address,
            lender.address
        );

        const nft = await escrow.nftAddress();
        expect(nft).to.be.equal(realEstate.address); 
       
        const sell = await escrow.seller();
        expect(sell).to.be.equal(seller.address);   
    })
})
