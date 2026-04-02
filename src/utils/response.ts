export const json = <T>(data: T, status = 200): Response => {
  return Response.json(data, { status });
};

export const badRequest = (message: string): Response => {
  return json({ error: message }, 400);
};

export const notFound = (message = "Not Found"): Response => {
  return json({ error: message }, 404);
};

export const internalServerError = (
  message = "Internal Server Error",
): Response => {
  return json({ error: message }, 500);
};
