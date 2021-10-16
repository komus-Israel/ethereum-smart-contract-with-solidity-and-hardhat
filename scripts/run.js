const main = async () =>{
    const waveContractFractory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFractory.deploy();
    await waveContract.deployed();

    console.log('Contract is deployed to:', waveContract.address);
    
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