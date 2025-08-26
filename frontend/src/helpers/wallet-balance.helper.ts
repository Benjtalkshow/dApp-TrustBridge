// frontend/src/helpers/wallet-balance.helper.ts
import {
  Address,
  Contract,
  rpc,
  TransactionBuilder,
  xdr,
  scValToNative,
} from "@stellar/stellar-sdk";
import { NETWORK_CONFIG } from "@/config/contracts";

/**
 * We call token contract methods via Soroban RPC simulation.
 * - balance(Address)
 * - decimals() -> u32
 *
 * The return of `balance` is an integer (u128). We format it
 * to a decimal string using the token's decimals().
 */

const decimalsCache = new Map<string, number>();

async function buildSimulatedTx(
  server: rpc.Server,
  caller: string,
  c: Contract,
  fn: string,
  ...args: xdr.ScVal[]
) {
  // Any G... account with a valid sequence is fine for simulation
  const account = await server.getAccount(caller);
  return new TransactionBuilder(account, {
    fee: "100000",
    networkPassphrase: NETWORK_CONFIG.networkPassphrase,
  })
    .addOperation(c.call(fn, ...args))
    .setTimeout(30)
    .build();
}

async function callScVal(
  wallet: string,
  contractId: string,
  fn: string,
  ...args: xdr.ScVal[]
): Promise<xdr.ScVal> {
  const server = new rpc.Server(NETWORK_CONFIG.sorobanRpcUrl);
  const contract = new Contract(contractId);
  const tx = await buildSimulatedTx(server, wallet, contract, fn, ...args);
  const sim = await server.simulateTransaction(tx);
  // retval can be in result.retval (newer) or results[0].retval (older)
  // @ts-expect-error - Soroban RPC response structure varies between versions
  const retval = sim?.result?.retval ?? sim?.results?.[0]?.retval;
  if (!retval) {
    throw new Error(`No retval when calling ${fn} on ${contractId}`);
  }
  return xdr.ScVal.fromXDR(retval, "base64");
}

async function getDecimals(
  wallet: string,
  contractId: string,
): Promise<number> {
  if (decimalsCache.has(contractId)) return decimalsCache.get(contractId)!;
  const sc = await callScVal(wallet, contractId, "decimals");
  const n = Number(scValToNative(sc));
  decimalsCache.set(contractId, n);
  return n;
}

function bigintToDecimalString(raw: bigint, decimals: number): string {
  const base = BigInt(10) ** BigInt(decimals);
  const sign = raw < BigInt(0) ? "-" : "";
  const abs = raw < BigInt(0) ? -raw : raw;
  const whole = abs / base;
  const frac = abs % base;
  const fracStr = frac.toString().padStart(decimals, "0").replace(/0+$/, "");
  return fracStr ? `${sign}${whole}.${fracStr}` : `${sign}${whole}`;
}

/**
 * getTokenBalance
 * @param wallet G... address
 * @param tokenContractId C... contract ID for the token
 * @returns human string (e.g., "1234.56789")
 */
export async function getTokenBalance(
  wallet: string,
  tokenContractId: string,
): Promise<string> {
  try {
    const [balSc, dec] = await Promise.all([
      callScVal(
        wallet,
        tokenContractId,
        "balance",
        Address.fromString(wallet).toScVal(),
      ),
      getDecimals(wallet, tokenContractId),
    ]);

    const raw = scValToNative(balSc) as bigint; // u128
    return bigintToDecimalString(raw, dec);
  } catch (e) {
    console.error(`getTokenBalance(${tokenContractId}) failed:`, e);
    return "0";
  }
}

/**
 * getAllBalances
 * Convenience to fetch a map of balances for a symbol->contract map.
 */
export async function getAllBalances(
  wallet: string,
  tokens: Record<string, string>,
) {
  const entries = await Promise.all(
    Object.entries(tokens).map(async ([symbol, contractId]) => {
      const bal = await getTokenBalance(wallet, contractId);
      return [symbol, bal] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<string, string>;
}
