import React from "react";
import ReactDOM from "react-dom";

require('dotenv').config();

// import UserTable from './components/UserTable';
// import Form from './components/Form';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

        this.state = {
            candidates: [],
        }

        this.retrieveCandidates = this.retrieveCandidates.bind(this);
    }

    componentWillMount() {
        this.retrieveCandidates();
    }

    retrieveCandidates() {
        const self = this;
        const candidates = [];

        this.setState({ candidates });
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
