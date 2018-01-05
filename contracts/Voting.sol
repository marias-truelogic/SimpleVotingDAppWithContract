pragma solidity ^0.4.18;

contract Voting {
    // mapping is like an associative array / hash (ie. ['foo' => 'bar'])
    mapping (bytes32 => uint8) public votesReceived;

    // An array of byte32 values
    bytes32[] public candidateList;

    // Our constructor, this is executed when the contract is deployed to the blockchain
    // Accepts an array of byte32 values (these are the candidates people will vote on)
    function Voting(bytes32[] candidateNames) public {
        // Assign our candidates
        candidateList = candidateNames;
    }

    // This function retrieves a candidate's vote count
    // It accepts a bytes32 candidate name
    // It's 'view', so it only returns data, does not modify anything
    // It's public
    // And it returns a uint8 value (the total number of votes)
    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        // Require validates the condition, if false, it returns a REVERSE op code and does not use up the remaining gas
        // Useful for validating input. See: https://ethereum.stackexchange.com/a/24185
        require(validCandidate(candidate));

        return votesReceived[candidate];
    }

    // This function votes for the given candidate
    // It modifies a value
    // It's public and does not return anything
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));

        votesReceived[candidate] += 1;
    }

    // Also a 'view'-only function, it does not modify anything
    // It looks through the possible candidates
    // If it finds it, returns true, otherwise false
    function validCandidate(bytes32 candidate) view public returns (bool) {
        for (uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
