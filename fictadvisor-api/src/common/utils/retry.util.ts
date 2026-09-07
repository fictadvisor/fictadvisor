export interface RetryOptions {
  // Total tries, not retries: `attempts: 1` runs the work once and never repeats it.
  attempts: number;
  delayMs: (attempt: number) => number;
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
}

// Runs `work` until it stops throwing or the attempts run out, rethrowing the last
// failure. Deliberately dumb: no jitter, no error classification -- the caller decides
// what is worth retrying by only wrapping the things that are.
export async function retry<T> (
  work: () => Promise<T>,
  { attempts, delayMs, onRetry }: RetryOptions,
): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await work();
    } catch (error) {
      if (attempt >= attempts) throw error;

      const delay = delayMs(attempt);
      onRetry?.(error, attempt, delay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
