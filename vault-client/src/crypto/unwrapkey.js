export async function unwrapAESKey(wrappedKey, privateKey) {
  const aesKey = await crypto.subtle.unwrapKey(
    "raw",
    wrappedKey,
    privateKey,
    { name: "RSA-OAEP" },
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  return aesKey;
}
