# LandVault — Verify Before You Buy Land

**LandHack 2026 · CSE-TECH, DIU · Track: Digital Land Records, Verification & Digitization**
**Problem statements addressed:** P5 (Citizen Pre-Purchase Verification) with a P3 (Fraud & Double-Selling Detection) engine underneath.

LandVault is a citizen-facing land-record verification portal. A buyer enters a dag / khatian / mouza / owner name and gets one verified dossier per plot:

- **Ownership chain** across all four survey generations (CS → SA → RS → BS) with khatian references
- **Mutation & transfer history** with registration/mutation status
- **Registered documents** with cryptographic hash status
- **Explainable fraud-risk score (0–100)** from 6 deterministic signals: double sale (+45), deed hash mismatch (+40), ownership chain break (+30), registration–mutation gap (+20), suspicious rapid resale (+20), pending litigation / khas / acquisition (+15 each)
- **Deed authenticity checker** — paste a deed number + the hash from the paper copy; a tamper-simulation demo shows forgery detection
- **Buyer's checklist** generated from the detected signals
- **Full Bangla / English UI toggle**

## Data

`index.html` embeds a **100% synthetic demo registry**: 12 fictional plots across Dhaka, Gazipur, Cumilla and Chattogram, with scripted fraud cases (double-sold plot SV-007, forged deed SV-009, chain breaks, khas land, pending litigation). No real persons, plots, deeds or NID numbers are used. No government portals were accessed or scraped — per the LandHack 2026 rulebook.

## Run

Open `index.html` in any modern browser. No build step, no backend, no network calls — fully offline single file.

## Demo script (60 seconds)

1. Click **⚠ Double-sold plot** → dossier opens at 100/CRITICAL with 4 explained signals.
2. Scroll the ownership chain CS → SA → RS → BS and the mutation table showing the same plot sold twice.
3. Click **Verify →** on deed DL-2025-01208, then **Simulate a tampered copy** → hash mismatch verdict.
4. Toggle **বাং** for the full Bangla UI.

## AI assistance disclosure

Per the LandHack 2026 rulebook: this project was built with AI coding assistance (Muse, Meta). All code, data and logic were reviewed and are fully explainable by the team. The deterministic risk engine contains no ML black box — every point of risk maps to a visible record.

## License / IP

Team retains full IP ownership per the hackathon rulebook. Demo code shared for judging purposes.
