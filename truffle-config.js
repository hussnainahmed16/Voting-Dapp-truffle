module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (Ganache)
      port: 7545,            // Standard Ganache GUI port
      network_id: "*",       // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.0",      // Matches pragma solidity ^0.8.0
    }
  },
};