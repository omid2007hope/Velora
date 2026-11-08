const extractToken = require('../Extraction');
const verifyAccessToken = require('../verification/Access');
const { createHttpError } = require('../../../../utils/httpError');

function requireAuth(req, _res, next) {
	const token = extractToken(req);

	if (!token) {
		return next(createHttpError(401, 'Authorization token required'));
	}

	try {
		const payload = verifyAccessToken(token);

		req.user = {
			id: payload.sub,
			email: payload.email,
			role: payload.role,
		};

		if (payload.role === 'seller') {
			req.seller = {
				userId: payload.sub,
				storeId: payload.storeId || null,
				storeName: payload.storeName || null,
			};
		}

		return next();
	} catch (_error) {
		return next(createHttpError(401, 'Invalid or expired token'));
	}
}

module.exports = requireAuth;
