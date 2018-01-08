import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

import sakura from '../css/sakura.css';

// This is information about our deployed contract, the address and it's interface
import VotingABI from '../../build/contracts/Voting.json';

import CandidateTable from './components/CandidateTable';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            web3: false,
            contract: false,
            candidates: [],
        }

        this.syncCandidate = this.syncCandidate.bind(this);
        this.setUpConnection = this.setUpConnection.bind(this);
    }

    componentWillMount() {
        this.setUpConnection();
    }

    async setUpConnection() {
        console.log(process.env.REACT_APP_RCP_PROVIDER);
        const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_RCP_PROVIDER);
        const web3 = new Web3(provider);
        const self = this;

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
        Promise.all(candidates.map(async candidate => {
            return {
                address: candidate,
                name: web3.utils.toAscii(candidate),
                votes: await deployedContract.totalVotesFor(candidate)
            }
        })).then(parsedCandidates => {
            self.setState({ web3, contract: deployedContract, candidates: parsedCandidates });
        });
    }

    async syncCandidate(candidateAddress) {
        const clonedCandidates = _.clone(this.state.candidates);

        const candidateIndex = _.findIndex(clonedCandidates, { address: candidateAddress });
        const newCandidate = clonedCandidates[candidateIndex];

        newCandidate.votes = await this.state.contract.totalVotesFor(candidateAddress);

        clonedCandidates.splice(candidateIndex, 1, newCandidate);

        this.setState({ candidates: clonedCandidates });
    }

    render() {
        const { candidates, contract } = this.state;

        return (
            <div className="main">
                <div className='row'>
                    <CandidateTable
                        candidates={candidates}
                        contract={contract}
                        syncCandidate={this.syncCandidate}
                    />
                </div>
            </div>
        );
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(< Main />, mountNode);
