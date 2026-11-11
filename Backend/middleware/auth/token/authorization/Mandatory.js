/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
