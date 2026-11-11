// Errors raised by Express middleware before Nest routing -- body-parser's
// PayloadTooLargeError (413), a malformed JSON body (400, SyntaxError) or an
// unsupported charset (415) -- are `http-errors` objects, not Nest
// `HttpException`s. They still carry the right status, so read it instead of
// calling the client's mistake a server error.
export function clientErrorStatus (error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;

  const { status, statusCode } = error as {
    status?: unknown;
    statusCode?: unknown;
  };
  const code = typeof status === 'number' ? status : statusCode;

  return Number.isInteger(code) &&
    (code as number) >= 400 &&
    (code as number) < 500
    ? (code as number)
    : undefined;
}
