import React from "react";

export default class CandidateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: this.props.candidates,
            contract: this.props.contract,
        }
        this.voteForCandidate = this.voteForCandidate.bind(this);
        this.buildCandidatesTable = this.buildCandidatesTable.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps !== this.props) {
            this.setState({ candidates: newProps.candidates, contract: newProps.contract });
        }
    }

    async voteForCandidate(candidate) {
        // IMPORTANT: FROM address is required, since this address will be paying for the gas. 
        // Every action that involves writing has a gas cost
        await this.state.contract.voteForCandidate(candidate, { from: process.env.REACT_APP_TEST_ADDRESS});
        this.props.syncCandidate(candidate);
    }

    buildCandidatesTable() {
        const { candidates } = this.state;
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Candidates</th>
                        <th>Votes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        candidates.map((candidate, index) => {
                            return (
                                <tr key={index}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.votes.toString()}</td>
                                    <td>
                                        <button onClick={() => { this.voteForCandidate(candidate.address) }}>Vote</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    render() {
        const { candidates } = this.state;
        return (
            <div className='userTableContainer'>
                {candidates ? this.buildCandidatesTable() : 'No Candidates'}
            </div>
        );
    }
}