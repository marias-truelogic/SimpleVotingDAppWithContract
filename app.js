const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const votingCode = fs.readFileSync('./contracts/Voting.sol').toString();
const compiledCode = solc.compile(votingCode);

const errors = [];
const warnings = [];
(compiledCode.errors || []).forEach((err) => {
    if (/\:\s*Warning\:/.test(err)) {
        warnings.push(err);
    } else {
        errors.push(err);
    }
});

if (errors.length) {
    throw new Error('solc.compile: ' + errors.join('\n'));
}
if (warnings.length) {
    console.warn('solc.compile: ' + warnings.join('\n'));
}

// The compiled code has two important parts
// - byteCode: which is the compiled file, which will be deployed to the blockchain
// - interface: which is the interface of the contract (called abi), it tells the user how you interact with the smart contract

const compiledContract = compiledCode.contracts[':Voting'];

const abiDefinition = JSON.parse(compiledContract.interface);
const VotingContract = web3.eth.contract(abiDefinition);
const byteCode = compiledContract.byteCode;

// Here we deploy the contract to the blockchain
// The first array is the candidates required in the constructor
// 'byteCode' is the byteCode of our smart contract
// 'from' is the originating address, here we use one of our fake accounts, 
// but in the real blockchain you have to own the account and unlock before transacting (using the passphrase used to create the account).
// 'Gas' is how much you're willing to pay the miners to include your code in the blockchain. It's calculated by the network (code complexity, etc)
// You can see an estimate in "compiledContract.gasEstimates"

// const accountBalace = web3.eth.getBalance(web3.eth.accounts[0]);

const deployedContract = VotingContract.new(["Lorem", "Ipsum", "Dolor"], { data: byteCode, from: '0x30ef51b1eaeef1e1c5d99b699723a137e6b7f06e', gas: 4700000});

console.log(deployedContract); // The address of our deployed contract

const contractIstance = VotingContract.at(deployedContract.address);