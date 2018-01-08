A voting all using a Smart Contract

How to use:

- Make sure you have a blockchain client running (I use [Ganache](http://truffleframework.com/ganache/), if you use something else make sure to update `truffle.js`)
- Install dependencies: `npm install`
- Compile and run truffle migrations: `truffle compile && truffle migrate`
- Update the `.env` file with your provider(REACT_APP_RCP_PROVIDER) and `from` address (REACT_APP_TEST_ADDRESS)
- Note: The `from` address has to have Eth in their wallet. It's used to make transactions
- Run `npm start` to run a Dev server

How it works:
- The Truffle framework takes care of compiling and creating the Abi files to interact with our client
- When we migrate it, the migration files run. Two of which deploy the contract to the blockchain
- 

TODO:
- [] Figure out a better structure for the contract + the FE. Maybe two repos.