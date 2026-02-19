# Network onboarding flow (testnet / devnet launch)

This document describes how to onboard a **testnet** (devnet) network so it appears on VibeMiner and miners can contribute hashrate. The flow is automated—no admin approval.

## Summary

1. **Register** as a network account.
2. **Sign in** and open the **Network dashboard**.
3. **Submit** the “Request listing” form with **Environment: Devnet**.
4. The network is **listed immediately** (devnet listings are free).

---

## Step-by-step

### 1. Register as a network

- Go to **[/register](https://vibeminer.tech/register)**.
- Choose **“Network / chain”** (not “Miner”).
- Enter:
  - **Network / chain name** (required)
  - **Website** (optional)
  - **Email** and **Password**
- Submit. Your account is created with `account_type: 'network'`.

### 2. Sign in

- Go to **[/login](https://vibeminer.tech/login)** and sign in with the same email/password.

### 3. Open the Network dashboard

- Go to **[/dashboard/network](https://vibeminer.tech/dashboard/network)**.
- Only **network** accounts can access this page. Miners are redirected to the miner dashboard.

### 4. Request listing (testnet / devnet)

- In the **“Request listing”** form, fill:
  - **Network name** (e.g. “My Chain Devnet”)
  - **Symbol** (e.g. “MYC”)
  - **Algorithm** (e.g. “RandomX”, “kHeavyHash”)
  - **Environment**: choose **Devnet** (testnet). **No listing fee** for devnet.
  - **Description** (optional; default: “{name} blockchain”)
  - **Pool URL** and **Pool port** (optional but needed for miners to connect)
  - **Website** (optional)
- Submit the form.

### 5. What happens on submit

- The app sends a **POST** to **`/api/networks/register`** with the form data.
- **Validation**: payload is validated with the shared network schema (`id`, `name`, `symbol`, `algorithm`, `environment`, `description`, `icon`, optional `poolUrl`, `poolPort`, `website`, `status`, etc.). The `id` is derived from the network name (lowercase, hyphens).
- **Devnet**: no payment is required. Mainnet would require the listing fee (see [/fees](/fees)).
- **Uniqueness**: the API checks that:
  - No row in **`network_listings`** has the same stored id (for devnet the stored id is `{id}-devnet`, e.g. `my-chain-devnet`).
  - The network is not already in the **static registry** in `@vibeminer/shared`.
- **Insert**: a new row is added to **`network_listings`** with `environment: 'devnet'`, `listing_fee_paid: 0`, `status: 'live'`.
- **Response**: success and network details. The UI shows “Listed automatically”.

### 6. After listing

- The network appears in the app’s network list (mainnet + devnet).
- Miners can select it and start mining (if pool URL/port are set and the pool is reachable).
- No further approval or deployment step—listing is live as soon as the API returns success.

---

## API (for testnet / devnet)

You can also onboard a devnet network programmatically:

**Endpoint:** `POST /api/networks/register`

**Body (devnet, no fee):**

```json
{
  "id": "my-chain",
  "name": "My Chain (Devnet)",
  "symbol": "MYC",
  "algorithm": "MyAlgo",
  "environment": "devnet",
  "description": "Test network for My Chain.",
  "icon": "⛓",
  "status": "live",
  "poolUrl": "pool.dev.mychain.com",
  "poolPort": 3333,
  "website": "https://mychain.com",
  "rewardRate": "Test only",
  "minPayout": "N/A"
}
```

- **Devnet**: do **not** send `feeConfirmed` or `feeTxHash`; they are only required for mainnet when `FEE_CONFIG.NETWORK_LISTING.devnetFree` is true.
- Stored id in the DB will be **`my-chain-devnet`**.
- Required fields and limits are defined in `packages/shared/src/schema.ts` (`BlockchainNetworkSchema`).

---

## Mainnet vs devnet (testnet)

| | Devnet (testnet) | Mainnet |
|---|------------------|--------|
| **Fee** | Free | One-time listing fee (see `/fees`) |
| **Stored id** | `{id}-devnet` | `{id}` |
| **Payment in API** | Not required | `feeConfirmed: true` or `feeTxHash` required (full payment flow TBD) |

---

## References

- **Request form**: `apps/web/src/components/RequestListingForm.tsx`
- **Register API**: `apps/web/src/app/api/networks/register/route.ts`
- **Schema**: `packages/shared/src/schema.ts` (`BlockchainNetworkSchema`)
- **Fees**: `packages/shared/src/fees.ts` (`FEE_CONFIG.NETWORK_LISTING`)
- **DB table**: `network_listings` in `apps/web/d1/schema.sql`
