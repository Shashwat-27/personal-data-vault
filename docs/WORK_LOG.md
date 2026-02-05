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
- Implemented key wrapping for user
- Tested encryption/decryption flow
- Added encryption demo UI

Day 4:
- Implemented permission grant screen
- Added key re-wrapping for external app
- Verified file not decrypted during grant

Day 5:
- Built demo external application
- Successfully decrypted shared data
- Verified access control via token

Day 6:
- Implemented revoke functionality
- Deleted wrapped key on revoke
- Verified decryption failure after revoke
