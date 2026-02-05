// src/crypto/keyGen.js

export async function generateUserKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true, // extractable for now (we harden later)
    ["wrapKey", "unwrapKey"] // 🔑 THIS IS THE FIX
  );

  return keyPair;
}
