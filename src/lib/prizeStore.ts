import type { AccountPrizeConfig } from './prizeConfig';
import { sanitizePrizeConfigs } from './prizeConfig';

type KVNamespaceLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

type PrizeEnv = {
  PRIZE_KV?: KVNamespaceLike;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
};

const KV_KEY = 'xx88code_prize_config';
const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'Admin123!';

// Same lookup as getRequestContext() from @cloudflare/next-on-pages, without adding the package.
function cloudflareEnv(): PrizeEnv {
  const context = (globalThis as Record<symbol, { env?: PrizeEnv } | undefined>)[
    Symbol.for('__cloudflare-request-context__')
  ];
  return context?.env ?? {};
}

function prizeKv(): KVNamespaceLike {
  const kv = cloudflareEnv().PRIZE_KV;
  if (!kv) {
    throw new Error('Chưa cấu hình kho lưu trữ PRIZE_KV');
  }
  return kv;
}

export async function readPrizeConfigs(): Promise<AccountPrizeConfig[]> {
  const raw = await prizeKv().get(KV_KEY);
  if (!raw) {
    return [];
  }

  try {
    return sanitizePrizeConfigs(JSON.parse(raw));
  } catch {
    return [];
  }
}

export async function writePrizeConfigs(configs: AccountPrizeConfig[]): Promise<AccountPrizeConfig[]> {
  const clean = sanitizePrizeConfigs(configs);
  await prizeKv().put(KV_KEY, JSON.stringify(clean));
  return clean;
}

function headerValue(request: Request, name: string): string {
  try {
    return decodeURIComponent(request.headers.get(name) || '');
  } catch {
    return '';
  }
}

export function isAdminRequest(request: Request): boolean {
  const env = cloudflareEnv();
  const username = headerValue(request, 'x-admin-username').trim();
  const password = headerValue(request, 'x-admin-password');
  return (
    username === (env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME) &&
    password === (env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD)
  );
}
