'use client';

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import type { AccountPrizeConfig, AdminCredentials } from '@/lib/prizeConfig';
import {
  AdminAuthError,
  fetchPrizeConfigs,
  normalizeAccountId,
  savePrizeConfigs,
} from '@/lib/prizeConfig';

export default function AdminPage() {
  const [credentials, setCredentials] = useState<AdminCredentials | null>(null);
  const [configs, setConfigs] = useState<AccountPrizeConfig[]>([]);
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const sortedConfigs = useMemo(() => {
    return [...configs].sort((left, right) => left.accountId.localeCompare(right.accountId));
  }, [configs]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextCredentials = { username: loginUsername.trim(), password: loginPassword };
    try {
      setBusy(true);
      setConfigs(await fetchPrizeConfigs(nextCredentials));
      setCredentials(nextCredentials);
      setLoginUsername('');
      setLoginPassword('');
      setMessage('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không đăng nhập được.');
    } finally {
      setBusy(false);
    }
  };

  const persistConfigs = async (nextConfigs: AccountPrizeConfig[], successMessage: string) => {
    if (!credentials) {
      return false;
    }

    try {
      setBusy(true);
      setConfigs(await savePrizeConfigs(credentials, nextConfigs));
      setMessage(successMessage);
      return true;
    } catch (error) {
      if (error instanceof AdminAuthError) {
        setCredentials(null);
      }
      setMessage(error instanceof Error ? error.message : 'Không lưu được cấu hình thưởng.');
      return false;
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedAccountId = normalizeAccountId(accountId);
    const parsedAmount = Number(amount);

    if (!normalizedAccountId) {
      setMessage('Vui lòng nhập tài khoản.');
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setMessage('Vui lòng nhập số tiền hợp lệ.');
      return;
    }

    const nextConfigs = [...configs];
    const existingIndex = nextConfigs.findIndex((item) => item.accountId === normalizedAccountId);
    const nextItem = { accountId: normalizedAccountId, amount: Math.floor(parsedAmount) };

    if (existingIndex >= 0) {
      nextConfigs[existingIndex] = nextItem;
    } else {
      nextConfigs.push(nextItem);
    }

    const saved = await persistConfigs(nextConfigs, `Đã lưu cấu hình cho tài khoản ${normalizedAccountId}.`);
    if (saved) {
      setAccountId('');
      setAmount('');
    }
  };

  const handleDelete = async (targetAccountId: string) => {
    const nextConfigs = configs.filter((item) => item.accountId !== targetAccountId);
    await persistConfigs(nextConfigs, `Đã xóa cấu hình của tài khoản ${targetAccountId}.`);
  };

  if (!credentials) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#0a192f_0%,#0f2b48_50%,#020d1a_100%)] px-4 py-8 text-white flex items-center justify-center">
        <div className="mx-auto w-full max-w-md rounded-[24px] bg-[#0d2137]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.5)] border border-[#1e4976]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00AEEE]">
            XX88 Admin Login
          </p>
          <h1 className="mt-2 text-2xl font-black text-white">Đăng nhập Admin</h1>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-300">Tài khoản</span>
              <input
                type="text"
                value={loginUsername}
                onChange={(event) => setLoginUsername(event.target.value)}
                className="w-full rounded-xl border border-[#1e4976] bg-[#071322] px-4 py-3 text-white outline-none transition focus:border-[#00AEEE]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-300">Mật khẩu</span>
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                className="w-full rounded-xl border border-[#1e4976] bg-[#071322] px-4 py-3 text-white outline-none transition focus:border-[#00AEEE]"
              />
            </label>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#00AEEE] px-5 text-sm font-bold text-white transition hover:bg-[#0092c8] cursor-pointer disabled:opacity-60"
            >
              {busy ? 'Đang kiểm tra...' : 'Vào trang quản trị'}
            </button>
          </form>

          {message ? <p className="mt-4 text-sm text-red-400">{message}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0a192f_0%,#0f2b48_50%,#020d1a_100%)] px-4 py-8 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-3 rounded-[24px] bg-[#0d2137]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.5)] border border-[#1e4976] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00AEEE]">
              XX88 Prize Config
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-black text-white">
              Cấu hình thưởng nhận code theo tài khoản
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#00AEEE] px-5 text-sm font-bold text-white transition hover:bg-[#0092c8]"
          >
            Về trang nhận code
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-[360px_minmax(0,1fr)]">
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-[24px] bg-[#0d2137]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.5)] border border-[#1e4976]"
            >
              <h2 className="text-lg font-bold text-white">Thêm hoặc cập nhật</h2>
              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-300">Tên tài khoản</span>
                  <input
                    type="text"
                    value={accountId}
                    onChange={(event) => setAccountId(event.target.value)}
                    placeholder="Ví dụ: player88"
                    className="w-full rounded-xl border border-[#1e4976] bg-[#071322] px-4 py-3 text-white outline-none transition focus:border-[#00AEEE]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-300">
                    Số điểm / K nhận (Ví dụ: 888)
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Ví dụ: 888"
                    className="w-full rounded-xl border border-[#1e4976] bg-[#071322] px-4 py-3 text-white outline-none transition focus:border-[#00AEEE]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#00AEEE] px-5 text-sm font-bold text-white transition hover:bg-[#0092c8] cursor-pointer disabled:opacity-60"
                >
                  {busy ? 'Đang lưu...' : 'Lưu cấu hình'}
                </button>

                {message ? <p className="text-sm text-[#00AEEE]">{message}</p> : null}
              </div>
            </form>
          </div>

          <div className="rounded-[24px] bg-[#0d2137]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.5)] border border-[#1e4976]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white">Danh sách tài khoản đã gán thưởng</h2>
              <span className="rounded-full bg-[#00AEEE]/20 px-3 py-1 text-xs font-semibold text-[#00AEEE]">
                {sortedConfigs.length} tài khoản
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {sortedConfigs.length ? (
                sortedConfigs.map((item) => (
                  <div
                    key={item.accountId}
                    className="flex flex-col gap-3 rounded-xl border border-[#1e4976] bg-[#071322] p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-xs text-gray-400">Tài khoản</p>
                      <p className="text-base font-bold text-white">{item.accountId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Điểm nhận</p>
                      <p className="text-base font-bold text-[#FFE875]">{item.amount.toLocaleString('vi-VN')} điểm ({item.amount}K)</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.accountId)}
                      disabled={busy}
                      className="inline-flex h-9 items-center justify-center rounded-xl bg-red-900/40 border border-red-500/50 px-4 text-xs font-semibold text-red-300 transition hover:bg-red-800/60 cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-[#1e4976] bg-[#071322]/50 p-6 text-sm text-gray-400">
                  Chưa có cấu hình nào. Tài khoản không có trong danh sách sẽ random thưởng mặc định (88K - 888K).
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
