/**
 * APIリクエスト用のユーティリティ関数
 */
import { ApiResponse } from "../types/api-response.type";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * 汎用的なFetch関数
 * @param url エンドポイントURL
 * @param options フェッチオプション
 * @returns レスポンスデータ
 */
export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { timeout = 8000, ...fetchOptions } = options;

  // デフォルトのヘッダーを設定
  const headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  // タイムアウト設定
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

    const response = await fetch(fullUrl, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: response.status.toString(),
          message: data.message || "エラーが発生しました",
        },
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      return {
        success: false,
        error: {
          code: "FETCH_ERROR",
          message: error.message || "リクエスト処理中にエラーが発生しました",
        },
      };
    }

    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: "不明なエラーが発生しました",
      },
    };
  }
}

/**
 * GET リクエスト
 */
export const get = <T>(url: string, options: FetchOptions = {}) => {
  return fetcher<T>(url, { ...options, method: "GET" });
};

/**
 * POST リクエスト
 */
export const post = <T>(url: string, data: any, options: FetchOptions = {}) => {
  return fetcher<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * PUT リクエスト
 */
export const put = <T>(url: string, data: any, options: FetchOptions = {}) => {
  return fetcher<T>(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * DELETE リクエスト
 */
export const del = <T>(url: string, options: FetchOptions = {}) => {
  return fetcher<T>(url, { ...options, method: "DELETE" });
};
