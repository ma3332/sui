import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui.js/faucet";
import {
  Secp256k1Keypair,
  Secp256k1PublicKey,
} from "@mysten/sui.js/keypairs/secp256k1";
import dotenv from "dotenv";
dotenv.config();

let privKey = process.env.PRIVATE_KEY;

function fromHEX(hexStr) {
  const normalized = hexStr.startsWith("0x") ? hexStr.slice(2) : hexStr;
  const padded = normalized.length % 2 === 0 ? normalized : `0${normalized}}`;
  const intArr = padded.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];

  return Uint8Array.from(intArr);
}

const kp_sender = Secp256k1Keypair.fromSecretKey(fromHEX(privKey));

const senderSuiAddress = kp_sender.getPublicKey().toSuiAddress();

const tx = await requestSuiFromFaucetV0({
  host: getFaucetHost("devnet"),
  recipient: senderSuiAddress,
});

console.log(tx);
