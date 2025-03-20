/**
 * 一般的なユーティリティ関数
 */

/**
 * 与えられた日付文字列を指定されたフォーマットに変換する
 * @param dateString 日付文字列 (ISO形式推奨)
 * @param format フォーマット指定 ('yyyy-MM-dd', 'yyyy年MM月dd日', 'MM/dd/yyyy' など)
 * @returns フォーマットされた日付文字列
 */
export function formatDate(
  dateString: string,
  format: string = "yyyy-MM-dd"
): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "無効な日付";
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return format
    .replace("yyyy", year.toString())
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

/**
 * 通貨をフォーマットする
 * @param amount 金額
 * @param locale ロケール (例: 'ja-JP')
 * @param currency 通貨コード (例: 'JPY')
 * @returns フォーマットされた通貨文字列
 */
export function formatCurrency(
  amount: number,
  locale: string = "ja-JP",
  currency: string = "JPY"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * 配列をシャッフルする
 * @param array シャッフルする配列
 * @returns シャッフルされた新しい配列
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * ディープコピーを行う
 * @param obj コピー対象のオブジェクト
 * @returns 深くコピーされたオブジェクト
 */
export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy) as unknown as T;
  }

  const result = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepCopy(obj[key]);
    }
  }

  return result;
}

/**
 * 文字列を省略する
 * @param text 元の文字列
 * @param maxLength 最大長
 * @param suffix 省略記号 (デフォルト: '...')
 * @returns 省略された文字列
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * URLパラメータをオブジェクトとして取得する
 * @param url URLまたはクエリ文字列
 * @returns パラメータオブジェクト
 */
export function getUrlParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.includes("?") ? url.split("?")[1] : url;

  if (!queryString) {
    return params;
  }

  const searchParams = new URLSearchParams(queryString);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}
