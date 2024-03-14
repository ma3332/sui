import { recipientAddress, sendingAmount } from "./1_inputFromClient.js";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { IntentScope, messageWithIntent } from "@mysten/sui.js/cryptography";
import { blake2b } from "@noble/hashes/blake2b";
import { sha256 } from "@noble/hashes/sha256";

// use getFullnodeUrl to define Devnet RPC location
const rpcUrl = getFullnodeUrl("devnet");
// create a client connected to devnet
const client = new SuiClient({ url: rpcUrl });

// create an example transaction block.
const txb = new TransactionBlock();
// Split a coin object off of the gas object:
const [coin] = txb.splitCoins(txb.gas, [txb.pure(sendingAmount)]);
// Transfer the resulting coin object:
txb.transferObjects([coin], txb.pure(recipientAddress));
txb.setSender(addressFrom);

const bytes = await txb.build({ client });

const intentMessage = messageWithIntent(IntentScope.TransactionData, bytes);
const digestExternal = blake2b(intentMessage, { dkLen: 32 });
const digestInternal = sha256(digestExternal);

export { digestInternal, bytes };
