import { normalizeAccountId, sanitizePrizeConfigs } from '@/lib/prizeConfig';
import { isAdminRequest, readPrizeConfigs, writePrizeConfigs } from '@/lib/prizeStore';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const UNAUTHORIZED_MESSAGE = 'Tài khoản hoặc mật khẩu admin không đúng.';

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Có lỗi xảy ra';
}

export async function GET(request: Request): Promise<Response> {
  const account = new URL(request.url).searchParams.get('account');

  try {
    if (account !== null) {
      const accountId = normalizeAccountId(account);
      const match = (await readPrizeConfigs()).find((item) => item.accountId === accountId);
      return json({ amount: match?.amount ?? null });
    }

    if (!isAdminRequest(request)) {
      return json({ message: UNAUTHORIZED_MESSAGE }, 401);
    }

    return json({ configs: await readPrizeConfigs() });
  } catch (error) {
    return json({ message: errorMessage(error) }, 500);
  }
}

export async function PUT(request: Request): Promise<Response> {
  if (!isAdminRequest(request)) {
    return json({ message: UNAUTHORIZED_MESSAGE }, 401);
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { configs?: unknown };
    const configs = await writePrizeConfigs(sanitizePrizeConfigs(body.configs));
    return json({ configs });
  } catch (error) {
    return json({ message: errorMessage(error) }, 500);
  }
}
