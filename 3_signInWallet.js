import { digestInternal } from "./2_generateHash.js";
import { secp256k1 } from "@noble/curves/secp256k1";
import dotenv from "dotenv";
dotenv.config();

let privKey = process.env.PRIVATE_KEY;

function fromHEX(hexStr) {
  const normalized = hexStr.startsWith("0x") ? hexStr.slice(2) : hexStr;
  const padded = normalized.length % 2 === 0 ? normalized : `0${normalized}}`;
  const intArr = padded.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];

  return Uint8Array.from(intArr);
}

// secp256k1 curve in Wallet
const sig = secp256k1.sign(digestInternal, fromHEX(privKey), {
  lowS: true,
});

export { sig };
