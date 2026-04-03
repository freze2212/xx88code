/**
 * Logic fake thưởng — giữ file này khi merge UI từ upstream.
 */

const REWARD_K_VALUES: number[] = (() => {
  const list: number[] = [38, 68, 88];
  for (let h = 1; h <= 8; h += 1) {
    list.push(h * 100 + 38, h * 100 + 68, h * 100 + 88);
  }
  return list;
})();

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}

/** Mốc nghìn (38, 68, 138, …) — dùng cho UI dạng "38K TIỀN THƯỞNG". */
export function pickRandomFakeRewardK(): number {
  return (
    REWARD_K_VALUES[Math.floor(Math.random() * REWARD_K_VALUES.length)] ?? 88
  );
}

export function pickRandomFakeRewardAmount(): number {
  return pickRandomFakeRewardK() * 1000;
}

export function getFakeRewardSuccessMessage(): string {
  const k = pickRandomFakeRewardK();
  return `Chúc mừng! Bạn nhận được ${formatVnd(k * 1000)}.`;
}
