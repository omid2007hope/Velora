function extractToken(req) {
  const header = (req.headers?.authorization || "").trim();

  if (header) {
    const bearerMatch = header.match(/^Bearer\s+(.+)$/i);

    if (bearerMatch?.[1]) {
      return bearerMatch[1].trim();
    }
  }

  return null;
}

module.exports = extractToken;
