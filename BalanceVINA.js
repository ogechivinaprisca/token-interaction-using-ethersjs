// To check VINA token balance in a wallet
const ethers = Noderequire("ethers");
const VINA_RECEIVER_PKEY = "the_receiver_wallet_private_key";
const VINA_CONTRACT_ADDRESS = "0xd0BB0e6cb66E58cAb0CEA6F507139b6994621D15";
const provider = ethers.getDefaultProvider("goerli");
/* For the “abi” variable, I don't think it necessary to define all ABI. I just used some part of it according to my needs,
which is to check balance. 
The “getVINABalance” function calls the “balanceOf(walletAddress)” function from the ABI.
*/
const getVINABalance = async (wallet) => {
  const abi = [
    {
      name: "balanceOf",
      type: "function",
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      constant: true,
      payable: false,
    },
  ];
  const contract = new ethers.Contract(VINA_CONTRACT_ADDRESS, abi, wallet);
  const balance = await contract.balanceOf(wallet.address);
  return balance;
};
async function init() {
  const receiverWallet = new ethers.Wallet(VINA_RECEIVER_PKEY, provider);
  const receiverVINABalance = await getVINABalance(receiverWallet);
  console.log(
    "Reciever balance: ",
    ethers.utils.formatUnits(receiverVINABalance, 18) + " VINA",
    receiverWallet.address
  );
}
init();
