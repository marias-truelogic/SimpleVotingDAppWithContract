import React from "react";
import ReactDOM from "react-dom";
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

// This is information about our deployed contract, the address and it's interface
import VotingABI from '../../build/contracts/Voting.json';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: false,
            contract: false,
            candidates: [],
        }

        this.retrieveCandidates = this.retrieveCandidates.bind(this);
        this.setUpConnection = this.setUpConnection.bind(this);
    }

    componentWillMount() {
        this.setUpConnection();
    }

    async setUpConnection() {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3 = new Web3(provider);

        // Loads the contract definition from the deployed json
        const VotingContract = TruffleContract(VotingABI);
        VotingContract.setProvider(provider);

        //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
        if (typeof VotingContract.currentProvider.sendAsync !== "function") {
            VotingContract.currentProvider.sendAsync = function () {
                return VotingContract.currentProvider.send.apply(
                    VotingContract.currentProvider,
                    arguments
                );
            };
        }

        // Check for deployed contract
        const deployedContract = await VotingContract.deployed();

        // Get candidates
        const candidates = await deployedContract.getCandidates();

        // Make them user-friendly
        const parsedCandidates = candidates.map(candidate => web3.utils.toAscii(candidate));

        this.setState({ web3, contract: deployedContract, candidates: parsedCandidates });
    }

    render() {
        return (
            <div className="main">
                <div className='row'>
                    here
                </div>
                <div className="divider"></div>
                <div className='row'>
                    here 2
                </div>
            </div>
        );
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(< Main />, mountNode);
