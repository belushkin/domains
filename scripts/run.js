const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("ninja");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);
  let txn = await domainContract.register("mortal");
  await txn.wait();

  const address = await domainContract.getAddress("mortal");
  console.log("Owner of domain mortal:", address);

  // Trying to set a record that doesn't belong to me!
  txn = await domainContract.connect(randomPerson).setRecord("mortal", "Haha my domain now!");
  await txn.wait();
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
