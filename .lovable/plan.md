## Goal
Remove the Selar checkout URL from `/playbook` and replace it with a Flutterwave checkout flow triggered from the same buy button.

## Approach
Use Flutterwave's **Inline Checkout** (`FlutterwaveCheckout` from `https://checkout.flutterwave.com/v3.js`). It's the lowest-friction option that keeps users on-site, needs only the public key, and avoids spinning up an edge function.

Defaults I'm choosing (since you skipped the questions):
- Price: **$30 USD** (round digital-product price; easy to change in one constant)
- Currency: `USD`
- Payment options: `card, banktransfer, ussd`
- Public key: stored as `VITE_FLUTTERWAVE_PUBLIC_KEY` in `.env` — you paste your `FLWPUBK-...` test/live key there. If unset, the button falls back to a friendly "checkout unavailable" toast so the page never breaks.

If you'd rather use NGN, a Payment Link, or a different price, tell me after the plan and I'll adjust the single constants block.

## Changes

### 1. `src/pages/Playbook.tsx`
- Remove `const CHECKOUT_URL = "https://selar.com/2186224016"`.
- Add a config block:
  ```ts
  const FLW_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY ?? "";
  const PLAYBOOK_PRICE = 30;
  const PLAYBOOK_CURRENCY = "USD";
  ```
- Add a `useEffect` that injects `<script src="https://checkout.flutterwave.com/v3.js">` once (idempotent — checks if already present).
- Replace the existing `<a href={CHECKOUT_URL} target="_blank">` buy button with a `<button>` that calls a new `handleCheckout()` function. Visual styling, copy, layout, and animations stay identical.
- `handleCheckout()` calls `window.FlutterwaveCheckout({...})` with:
  - `public_key`, `tx_ref` (`playbook-${Date.now()}`), `amount`, `currency`
  - `payment_options: "card,banktransfer,ussd"`
  - `customer`: prompts for email via a lightweight inline state (small modal/input) OR uses `window.prompt` for v1 simplicity — I'll use a minimal on-page email input that appears when the button is clicked, styled to match the sharp-edge dark aesthetic (no border-radius).
  - `customizations`: title "ArtiNovate Playbook", description, logo from existing asset
  - `callback`: closes modal + shows success toast (`sonner`)
  - `onclose`: no-op
- Add a TypeScript declaration `declare global { interface Window { FlutterwaveCheckout?: (opts: any) => void } }` at the top of the file.

### 2. `.env`
- Append `VITE_FLUTTERWAVE_PUBLIC_KEY=` (empty). You paste your public key here. Public keys are safe to ship in client code.

### 3. No other files change
- Nav, footer, routes, other pages untouched.
- No backend / edge function added. (Verification can be layered in later if you want server-side confirmation.)

## Out of scope (flag if you want them)
- Server-side transaction verification via edge function
- Webhook handling / order persistence in Supabase
- Email receipts / fulfillment automation
- Switching currency to NGN or using a hosted Payment Link instead

## Verification
- Load `/playbook`, click the buy button, confirm Flutterwave modal opens in test mode with the configured amount/currency.
- Confirm no remaining references to `selar` in the repo (`rg -i selar`).
