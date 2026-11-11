// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
