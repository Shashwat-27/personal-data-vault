// src/crypto/appKeyGen.js
export async function generateAppKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true, // extractable for demo
    ["wrapKey", "unwrapKey"]
  );
  return keyPair;
}
