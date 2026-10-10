export type AccountPrizeConfig = {
  accountId: string;
  amount: number;
};

export const DEFAULT_PRIZE_OPTIONS = [
  38, 68, 88, 138, 168, 188, 238, 268, 288, 338, 368, 388, 438, 468, 488, 538, 568, 588, 638,
  668, 688, 738, 768, 788, 838, 868, 888,
];

const DEFAULT_RANDOM_PRIZE_MIN_K = 88;
const DEFAULT_RANDOM_PRIZE_MAX_K = 888;
const DEFAULT_RANDOM_PRIZE_TAILS = [18, 38, 58, 68, 88] as const;

export function getRandomPrizeK(
  options: { minK?: number; maxK?: number; tails?: readonly number[] } = {}
): number {
  const minK = Math.floor(options.minK ?? DEFAULT_RANDOM_PRIZE_MIN_K);
  const maxK = Math.floor(options.maxK ?? DEFAULT_RANDOM_PRIZE_MAX_K);
  const tails = options.tails?.length ? options.tails : DEFAULT_RANDOM_PRIZE_TAILS;

  const low = Math.min(minK, maxK);
  const high = Math.max(minK, maxK);

  const maxBase = Math.floor(high / 100) + 1;
  const candidates: number[] = [];

  for (let base = 0; base <= maxBase; base += 1) {
    for (const tail of tails) {
      const value = base * 100 + Math.floor(tail);
      if (value >= low && value <= high) {
        candidates.push(value);
      }
    }
  }

  if (!candidates.length) {
    return low;
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

const PRIZE_CONFIG_API = '/api/prize-config';

export type AdminCredentials = {
  username: string;
  password: string;
};

export class AdminAuthError extends Error {}

export function normalizeAccountId(accountId: string): string {
  return accountId.trim().toLowerCase();
}

export function sanitizePrizeConfigs(value: unknown): AccountPrizeConfig[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const byAccount = new Map<string, number>();
  for (const item of value) {
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof item.accountId !== 'string' ||
      typeof item.amount !== 'number' ||
      !Number.isFinite(item.amount)
    ) {
      continue;
    }

    const accountId = normalizeAccountId(item.accountId);
    const amount = Math.floor(item.amount);
    if (accountId && amount > 0) {
      byAccount.set(accountId, amount);
    }
  }

  return Array.from(byAccount, ([accountId, amount]) => ({ accountId, amount }));
}

function adminHeaders(credentials: AdminCredentials): Record<string, string> {
  return {
    'x-admin-username': encodeURIComponent(credentials.username),
    'x-admin-password': encodeURIComponent(credentials.password),
  };
}

async function readJson(res: Response): Promise<Record<string, unknown>> {
  return (await res.json().catch(() => ({}))) as Record<string, unknown>;
}

export async function fetchConfiguredPrize(accountId: string): Promise<number | null> {
  const normalizedAccountId = normalizeAccountId(accountId);
  if (!normalizedAccountId) {
    return null;
  }

  const res = await fetch(`${PRIZE_CONFIG_API}?account=${encodeURIComponent(normalizedAccountId)}`, {
    cache: 'no-store',
  });
  const data = await readJson(res);
  if (!res.ok) {
    throw new Error(String(data.message || 'Không tải được cấu hình thưởng'));
  }

  return typeof data.amount === 'number' ? data.amount : null;
}

export async function fetchPrizeConfigs(credentials: AdminCredentials): Promise<AccountPrizeConfig[]> {
  const res = await fetch(PRIZE_CONFIG_API, { cache: 'no-store', headers: adminHeaders(credentials) });
  const data = await readJson(res);
  if (res.status === 401) {
    throw new AdminAuthError(String(data.message || 'Tài khoản hoặc mật khẩu admin không đúng.'));
  }
  if (!res.ok) {
    throw new Error(String(data.message || 'Không tải được cấu hình thưởng'));
  }

  return sanitizePrizeConfigs(data.configs);
}

export async function savePrizeConfigs(
  credentials: AdminCredentials,
  configs: AccountPrizeConfig[]
): Promise<AccountPrizeConfig[]> {
  const res = await fetch(PRIZE_CONFIG_API, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...adminHeaders(credentials) },
    body: JSON.stringify({ configs }),
  });
  const data = await readJson(res);
  if (res.status === 401) {
    throw new AdminAuthError(String(data.message || 'Phiên admin không hợp lệ, vui lòng đăng nhập lại.'));
  }
  if (!res.ok) {
    throw new Error(String(data.message || 'Không lưu được cấu hình thưởng'));
  }

  return sanitizePrizeConfigs(data.configs);
}
