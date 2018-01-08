A voting all using a Smart Contract

How to use:

- Make sure you have a block-chain client running (I use [Ganache](http://truffleframework.com/ganache/), if you use something else make sure to update `truffle.js`)
- Install dependencies: `yarn install`
- Compile and run truffle migrations: `truffle compile && truffle migrate`
- Update the `.env` file with your provider
- Run `yarn start`

TODO:
- [] Figure out a better structure for the contract + the FE. Maybe two repos.