# VibeSafePush 🛡️✨

**Your friendly neighborhood CLI for keeping secrets out of your code.**

VibeSafePush is an educational tool designed for "vibe coders," beginners, and anyone who wants a simple, friendly way to learn about the dangers of accidental sensitive data exposure. It scans your local files for common secrets and credentials, teaching you *why* they're dangerous and how to handle them.

![VibeSafePush Demo](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnhvaW84Yzd1aDkxOHhiOTdhdm5lcWtoMDA2NndsOG5ocjUzaTdlcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H03PuVdwREB21ANkLX/giphy.gif) 

---

## Features

### 💖 Free Features (Always)

- **.env File Check:** Warns you if a `.env` file is present, reminding you to add it to `.gitignore`.
- **node_modules Check:** Reminds you that this hefty folder should never be in version control.
- **Basic Secret Scanning:** Scans your files for common, easy-to-spot API key patterns.
- **Educational Output:** Explains *why* each finding is a risk in simple, encouraging language.

### 💎 Premium Features (Unlockable via Donation)

- **Advanced Secret Scanning:** Hunts for more complex and specific patterns, including:
  - AWS Keys (Access Key ID & Secret)
  - Firebase Configs
  - JWTs (JSON Web Tokens)
  - Private Key blocks (`-----BEGIN RSA PRIVATE KEY-----`)
- **Verbose Output:** Provides more detail on potential vulnerabilities.
- **Pre-commit Hook Template:** Gives you a ready-to-use Git hook to automate scans before every commit.
- **Support the Project:** Your donation helps keep this tool alive and growing!

---

## Installation & Usage

No installation needed! Just run it directly in your project folder using `npx`.

```bash
npx vibe-safe-push
```

Or, if you've cloned the repository:

```bash
node index.js
```

### Example Output (Free Scan)

```
--- Welcome to SafePush! 🛡️ ---
💡 A friendly tool to help you avoid committing secrets to your code.
💡 Running in free mode. For advanced scanning, unlock premium features.
👉 Run `npx vibe-safe-push --unlock` to begin.

--- Running Free Scan ✨ ---

⚠️  Found a .env file.
💡 While .env files are common for local development, they should NOT be committed to version control. Make sure it is listed in your .gitignore file!

🔥 Found a Generic API Key in: src/config.js
💡 Found a potential API key. These keys grant access to services and should never be stored directly in code.

--- Scan Complete ---
💡 Remember to always keep your secrets safe!
```

---

## How to Unlock Premium Features 💎

We use a simple, crypto-based unlock system. No sign-ups, no credit cards, no fuss.

### Step 1: Donate

Send a small donation (around **$2 USD** worth of SOL) to our Solana wallet. This proves you're a real human and helps us maintain the project!

**Recipient Wallet Address:**
```
YOUR_SOLANA_WALLET_ADDRESS_HERE 
```
*(Please replace this with the actual address from `constants.js` if you are forking this project).*

### Step 2: Get Your Transaction Details

After your transaction is confirmed on the Solana network, you'll need two pieces of information:
1.  **Your Wallet Address:** The address you sent the SOL *from*.
2.  **Transaction Signature (TXID):** The unique ID for your transaction. You can find this in your wallet's transaction history or on a Solana explorer like [Solscan](https://solscan.io/) or [Explorer by Solana Labs](https://explorer.solana.com/).

### Step 3: Run the Unlock Command

Run the following command in your terminal:

```bash
npx vibe-safe-push --unlock
```

The CLI will prompt you to enter the two pieces of information from Step 2.

```
--- Premium Unlock via Solana Donation 💎 ---
💡 To unlock premium features, please send a small donation (e.g., ~$2 in SOL) to this address:
   YOUR_SOLANA_WALLET_ADDRESS_HERE
💡 Once sent, please provide the transaction details below.

? What is the wallet address you sent the donation FROM? › ...
? What is the transaction hash (signature)? › ...

💡 Verifying transaction... This may take a moment.
✅ Donation confirmed!
✅ Premium features unlocked! Thank you for your support! 🙏
```

Once unlocked, SafePush creates a `.safepush_premium` file in your project's root directory. As long as that file is there, you'll have access to premium features!

---

## For Vibe Coders ✌️

Coding should be fun and creative. But seeing your app on the front page of Hacker News because you accidentally leaked your AWS keys? Not a vibe.

- **Think of secrets like your house key.** You wouldn't post a picture of it on Instagram. Don't post your API keys on GitHub.
- **Use `.env` files for your secrets.** These files let you use your keys in your local project without ever writing them in your main code.
- **Always add `.env` to your `.gitignore` file.** This is the magic spell that tells Git, "Hey, ignore this file, it's just for me."

Happy coding, and stay safe!
