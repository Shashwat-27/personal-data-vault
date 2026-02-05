// Client-side AES file encryption using Web Crypto API

export async function encryptFile(file) {
  // 1. Read file into memory
  const fileBuffer = await file.arrayBuffer();

  // 2. Generate AES-256 key
  const aesKey = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true, // extractable for demo (will restrict later)
    ["encrypt", "decrypt"]
  );

  // 3. Generate IV (12 bytes recommended)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 4. Encrypt file
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    aesKey,
    fileBuffer
  );

  return {
    encryptedBuffer,
    aesKey,
    iv
  };
}
