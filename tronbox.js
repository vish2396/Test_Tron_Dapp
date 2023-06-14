module.exports = {
  networks: {
    development: {
      privateKey: '4bfbbf0f2ed9ea662d54b490fb4f28e283e82eeb884fb9cfcf5bc9055128ef79',
      consume_user_resource_percent: 30,
      fee_limit: 1e9,
      fullHost: "http://127.0.0.1:9090",
      network_id: "*"
    },
    Hello_Tron: {
      privateKey: '4bfbbf0f2ed9ea662d54b490fb4f28e283e82eeb884fb9cfcf5bc9055128ef79',
      consume_user_resource_percent: 30,
      fee_limit: 1e9,
      fullHost: "http://127.0.0.1:9090",
      network_id: "*",
      timeout:60000,
    },
    compilers: {
      solc: {
        version: '0.5.4'
      }
    }
  }
};
