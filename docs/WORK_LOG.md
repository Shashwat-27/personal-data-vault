# Work Log – Personal Data Vault

Day 1:
- Implemented AES-256-GCM file encryption using Web Crypto API
- Encryption performed entirely in the browser
- Verified encrypted output is unreadable without key
- No backend or server involvement


Day 2:
- Implemented user key pair generation
- Stored private key locally using IndexedDB
- Verified server cannot decrypt data

Day 3:
- Simulated external application with its own RSA key pair
- Re-wrapped AES file key for external app without decrypting file
- Verified external app can decrypt file using its private key
- Demonstrated secure access delegation
