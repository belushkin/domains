const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("ninja");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("avokado");
  await txn.wait();
  console.log("Minted domain avokado.ninja");

  txn = await domainContract.setRecord("avokado", "Am I a avokado or a ninja??");
  await txn.wait();
  console.log("Set record for avokado.ninja");

  const address = await domainContract.getAddress("avokado");
  console.log("Owner of domain avokado:", address);
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