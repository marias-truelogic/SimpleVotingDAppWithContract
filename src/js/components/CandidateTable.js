import React from "react";

export default class CandidateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: this.props.accounts
        }
        this.buildUsersTable = this.buildUsersTable.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps !== this.props) {
            this.setState({ accounts: newProps.accounts });
        }
    }

    buildUsersTable() {
        const { accounts } = this.state;
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Candidates</th>
                        <th>Votes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts.map((account, index) => {
                            return (
                                <tr key={index}>
                                    TODO:
                                    <td>{account.accountAddress}</td>
                                    <td>{account.accountBalance}</td>
                                    <td>{account.accountBalance}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    render() {
        const { accounts } = this.state;
        return (
            <div className='userTableContainer'>
                {accounts ? this.buildUsersTable() : 'No accounts'}
            </div>
        );
    }
}