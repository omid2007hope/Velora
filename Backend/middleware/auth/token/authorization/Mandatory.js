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

		// Give the seller their own unique "Store" identity
		req.seller = {
			userId: payload.sub, // Link back to the user
			storeId: payload.storeId, // The unique ID for their shop
			storeName: payload.storeName,
			rating: payload.storeRating,
		};

		// If you have a specific Admin, give them their own space
		req.admin = {
			id: payload.adminId, // If the admin is a specific person
			role: payload.adminRole,
		};

		return next();
	} catch (_error) {
		return next(createHttpError(401, 'Invalid or expired token'));
	}
}

module.exports = requireAuth;
