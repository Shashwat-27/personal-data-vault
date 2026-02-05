export async function wrapAESKey(aesKey, publicKey) {
  const wrappedKey = await crypto.subtle.wrapKey(
    "raw",
    aesKey,
    publicKey,
    { name: "RSA-OAEP" }
  );

  return wrappedKey; // ArrayBuffer
}
