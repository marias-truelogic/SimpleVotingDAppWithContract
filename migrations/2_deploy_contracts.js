var Voting = artifacts.require("./Voting.sol");

// This migration takes care of deploying the smart contract to the blockchain
module.exports = function (deployer) {
    deployer.deploy(Voting, ['lorem', 'ipsum', 'dolor']);
};
