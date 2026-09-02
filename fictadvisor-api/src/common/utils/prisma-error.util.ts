// Prisma reports a unique-constraint violation as P2002. It is a plain error as
// far as the exception filter is concerned, so anything that can race into one
// has to recognise it rather than let it surface as a 500.
const UNIQUE_CONSTRAINT_FAILED = 'P2002';

export function isUniqueViolation (error: unknown): boolean {
  return typeof error === 'object' && error !== null &&
    (error as { code?: string }).code === UNIQUE_CONSTRAINT_FAILED;
}
