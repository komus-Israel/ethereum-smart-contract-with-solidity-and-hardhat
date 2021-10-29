const main = async () =>{
    const [_, randomPerson] = await hre.ethers.getSigners();
    const waveContractFractory = await hre.ethers.getContractFactory('WavePortal');

    //deploy the smart contract    
    const waveContract = await waveContractFractory.deploy({
            value: hre.ethers.utils.parseEther('0.0001'),
        });  
    await waveContract.deployed();
    console.log('Contract addy:', waveContract.address)

    /*
        Get contact balance
    */

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contrace balance:', hre.ethers.utils.formatEther(contractBalance));

    //console.log('Contract is deployed to:', waveContract.address);
    //console.log('Contract deployed by', owner.address);
    //console.log('random person address', randomPerson.address);

    
    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave('A new message');
    await waveTxn.wait()

    
    waveCount = await waveContract.getTotalWaves();

    //let another person wave

    waveTxn = await waveContract.connect(randomPerson).wave('Another new Message');
    await waveTxn.wait()

    /*
        Get contract balance to see what happened
    */

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contrace balance:', hre.ethers.utils.formatEther(contractBalance));
    

    let allWaves = await waveContract.getAllWaves();
    console.log('all waves: ', allWaves);

    waveCount = await waveContract.getTotalWaves();

    //get the total addresses

    wavedAddresses = await waveContract.getAddresses();
    console.log('The total addresses that waved are:', await wavedAddresses)
    
}



const runMain = async () =>{
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();