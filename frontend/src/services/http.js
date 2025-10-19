import { API_BASE_URL } from '../config/env';

export async function http(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = { ...(options.headers || {}) };

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body?.message || JSON.stringify(body);
    } catch {
      try {
        message = await res.text();
      } catch { /* ignore */ }
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}
