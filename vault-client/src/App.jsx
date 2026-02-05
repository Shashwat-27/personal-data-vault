import { useState } from "react";
import { encryptFile } from "./crypto/encryptFile";
import { generateUserKeyPair } from "./crypto/keyGen";
import { wrapAESKey } from "./crypto/wrapkey";
import { unwrapAESKey } from "./crypto/unwrapkey";

function App() {
  const [file, setFile] = useState(null);
  const [userKeys, setUserKeys] = useState(null);
  const [status, setStatus] = useState("");

  const generateKeys = async () => {
    const keys = await generateUserKeyPair();
    setUserKeys(keys);
    console.log("User Public Key:", keys.publicKey);
    console.log("User Private Key:", keys.privateKey);
    setStatus("User keys generated");
  };

  const handleEncryptFlow = async () => {
    if (!file || !userKeys) {
      alert("Select file and generate keys first");
      return;
    }

    // Encrypt file (Day 1)
    const { encryptedBuffer, aesKey, iv } = await encryptFile(file);

    // Wrap AES key using user public key
    const wrappedKey = await wrapAESKey(aesKey, userKeys.publicKey);

    console.log("Wrapped AES Key:", wrappedKey);

    // Unwrap AES key using user private key
    const unwrappedKey = await unwrapAESKey(
      wrappedKey,
      userKeys.privateKey
    );

    // Decrypt file back (proof)
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      unwrappedKey,
      encryptedBuffer
    );

    const decoded = new TextDecoder().decode(decryptedBuffer);

    console.log("Decrypted File Content:", decoded);

    setStatus("Encryption + wrapping + unwrapping successful");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Personal Data Vault – Day 2</h2>

      <button onClick={generateKeys}>
        Generate User Keys
      </button>

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleEncryptFlow}>
        Encrypt & Wrap File
      </button>

      <p>{status}</p>
    </div>
  );
}

export default App;
