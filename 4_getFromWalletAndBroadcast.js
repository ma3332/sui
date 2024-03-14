import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { toB64 } from "@mysten/bcs";
import { Secp256k1PublicKey } from "@mysten/sui.js/keypairs/secp256k1";

import { bytes } from "./2_generateHash.js";
import { sig } from "./3_signInWallet.js";
import { pubKey } from "./0_privateKeyToAddressSUI.js";

// use getFullnodeUrl to define Devnet RPC location
const rpcUrl = getFullnodeUrl("devnet");
// create a client connected to devnet
const client = new SuiClient({ url: rpcUrl });

const SIGNATURE_SCHEME_TO_FLAG = {
  ED25519: 0,
  Secp256k1: 1,
  Secp256r1: 2,
  MultiSig: 3,
  ZkLogin: 5,
};

function toSerializedSignature({ signature, signatureScheme, publicKey }) {
  if (!publicKey) {
    throw new Error("`publicKey` is required");
  }
  const pubKeyBytes = publicKey.toRawBytes();
  const serializedSignature = new Uint8Array(
    1 + signature.length + pubKeyBytes.length
  );
  serializedSignature.set([SIGNATURE_SCHEME_TO_FLAG[signatureScheme]]);
  serializedSignature.set(signature, 1);
  serializedSignature.set(pubKeyBytes, 1 + signature.length);
  return toB64(serializedSignature);
}

const signatureSecp256K1 = toSerializedSignature({
  signature: sig.toCompactRawBytes(),
  signatureScheme: "Secp256k1",
  publicKey: new Secp256k1PublicKey(pubKey.data),
});

let txBroadCast = await client.executeTransactionBlock({
  transactionBlock: bytes,
  signature: signatureSecp256K1,
});

console.log(txBroadCast);
