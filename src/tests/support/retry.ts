export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(`🔁 Retry ${i + 1} failed: ${err}`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw lastError;
}
