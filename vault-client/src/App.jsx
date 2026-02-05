import { useState } from "react";
import { encryptFile } from "./crypto/encryptFile";
import { generateUserKeyPair } from "./crypto/keyGen";
import { generateAppKeyPair } from "./crypto/appKeyGen";
import { wrapAESKey } from "./crypto/wrapkey";
import { unwrapAESKey } from "./crypto/unwrapkey";

function App() {
  const [file, setFile] = useState(null);
  const [userKeys, setUserKeys] = useState(null);
  const [appKeys, setAppKeys] = useState(null);
  const [status, setStatus] = useState("");

  // 1) Generate USER keys
  const generateUserKeys = async () => {
    const keys = await generateUserKeyPair();
    setUserKeys(keys);
    console.log("User Public Key:", keys.publicKey);
    console.log("User Private Key:", keys.privateKey);
    setStatus("User keys generated");
  };

  // 2) Generate APP keys (external app)
  const generateExternalAppKeys = async () => {
    const keys = await generateAppKeyPair();
    setAppKeys(keys);
    console.log("App Public Key:", keys.publicKey);
    console.log("App Private Key:", keys.privateKey);
    setStatus("External app keys generated");
  };

  // 3) Encrypt file + grant access to APP
  const handleGrantAccess = async () => {
    if (!file || !userKeys || !appKeys) {
      alert("Generate user keys, app keys, and select a file first");
      return;
    }

    // Encrypt file (Day 1)
    const { encryptedBuffer, aesKey, iv } = await encryptFile(file);

    // Wrap AES key for USER (Day 2)
    const wrappedForUser = await wrapAESKey(aesKey, userKeys.publicKey);

    // Unwrap AES key using USER private key (permission step)
    const k1Plain = await unwrapAESKey(wrappedForUser, userKeys.privateKey);

    // Re-wrap SAME AES key for APP (🔥 Day 3)
    const wrappedForApp = await wrapAESKey(k1Plain, appKeys.publicKey);
    console.log("Wrapped AES Key for App:", wrappedForApp);

    // ---- PROOF SECTION ----
    // App unwraps AES key using APP private key
    const appUnwrappedKey = await unwrapAESKey(
      wrappedForApp,
      appKeys.privateKey
    );

    // App decrypts file
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      appUnwrappedKey,
      encryptedBuffer
    );

    const decoded = new TextDecoder().decode(decryptedBuffer);
    console.log("APP Decrypted File Content:", decoded);

    setStatus("Grant access successful: App can decrypt file");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Personal Data Vault – Day 3</h2>

      <button onClick={generateUserKeys}>
        Generate User Keys
      </button>

      <br /><br />

      <button onClick={generateExternalAppKeys}>
        Generate External App Keys
      </button>

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleGrantAccess}>
        Grant Access to App
      </button>

      <p>{status}</p>
    </div>
  );
}

export default App;
