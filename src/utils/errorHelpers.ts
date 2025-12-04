export function extractApiErrors(err: any) {
  // fetchBaseQuery rejection usually returns { data, status }
  if (!err) return { message: 'Unknown error' };

  // prefer err.data.errors (validation object), then err.data.message, then fallback
  const data = err.data ?? err;
  const errors = (data && data.errors) ? data.errors : null;
  const message = (data && data.message) ? data.message : (err.error || err.message);

  return { errors, message, status: err.status ?? null, raw: err };
}
