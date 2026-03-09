import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-1"
});

export default client;


bedrockclient