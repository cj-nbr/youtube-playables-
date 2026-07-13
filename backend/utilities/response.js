// Consistent API response envelopes.

export function ok(res, data = null, meta = undefined) {
  const body = { success: true };
  if (data !== null) body.data = data;
  if (meta) body.meta = meta;
  return res.status(200).json(body);
}

export function created(res, data = null) {
  const body = { success: true, data };
  return res.status(201).json(body);
}

export function fail(res, status, message, errors = undefined) {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(status).json(body);
}

export function paginate(rows, total, page, pageSize) {
  return {
    total,
    page,
    pageSize,
    pages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
