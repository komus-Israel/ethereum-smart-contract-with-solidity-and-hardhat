const main = async () =>{
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFractory = await hre.ethers.getContractFactory('WavePortal');

    //deploy the smart contract    
    const waveContract = await waveContractFractory.deploy();  
    await waveContract.deployed();


    //console.log('Contract is deployed to:', waveContract.address);
    //console.log('Contract deployed by', owner.address);
    //console.log('random person address', randomPerson.address);

    
    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait()
    

    waveCount = await waveContract.getTotalWaves();

    //let another person wave

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait()

    waveCount = await waveContract.getTotalWaves();

    //get the total addresses

    wavedAddresses = await waveContract.getAddresses();


    //console.log('The total addresses that waved are:', await wavedAddresses.wait())
    
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