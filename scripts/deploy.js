const main = async ()=>{
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();


    //get the wallet address of the account running this contract
    console.log('Deploying contracts with account:', deployer.address)

    //get the account balance of the eth account Balance
    console.log('Account Balance:', accountBalance.toString());

    const Token = await hre.ethers.getContractFactory('WavePortal');
    const portal = await Token.deploy();
    await portal.deployed();

    console.log('Wave Portal address: ', portal.address);
}

const runMain = async()=>{
    try{
        await main();
        process.exit(0);
    } catch(error){
        console.log(error);
        process.exit(1)
    }
}

runMain();