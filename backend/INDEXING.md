# MongoDB Indexing Notes

## Overview
The backend now defines explicit indexes on the busiest collections so read-heavy APIs (catalog, checkout, lead capture, etc.) can rely on indexed scans. Indexes live alongside each Mongoose schema, so they will be created automatically the next time the models initialize (unless utoIndex is disabled).

## Collections Updated
- Products: compound brand/category filters, slug uniqueness, status/date listings, name lookups.
- MidCategory & SubCategory: slug/title/search support plus brand/category filters.
- Brands: slug uniqueness along with name/status sort helpers.
- Blogs: slug uniqueness and publish-status ordering.
- Users & Wishlist: email uniqueness and compound user/product guarding duplicates.
- Lead/quote flows (Checkout, InstantQuote, RequestQuote, ContactUs, Subscribe): email/phone/date indexes optimized for CRM exports and dashboards.

## Deployment Tips
1. Ensure the MongoDB user has createIndex privileges before restarting the backend.
2. On large collections, build indexes during a low-traffic window or trigger them manually with db.collection.createIndex() to avoid runtime contention.
3. If utoIndex is disabled in production, run a one-off script (e.g., 
ode scripts/buildIndexes.js that imports the models and calls Model.syncIndexes()) after deploy so the definitions and database stay in sync.
4. Watch db.currentOp() or Atlas Performance Advisor after rollout to confirm the new indexes serve the expected queries and adjust compound keys if query patterns evolve.
