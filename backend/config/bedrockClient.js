const { BedrockRuntimeClient } = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: "us-east-1"
});

module.exports = client;