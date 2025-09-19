# TODO: Update Light Vehicle Schema and Code

## Tasks
- [x] Update SQL schema in `server/migrations/create_listings_tables.sql` to add new columns (year, city, kilometers, transmission, brand, fuel_type, car_type, photos, price) to lightvahical_pending, lightvahical_approved, and lightvahical_rejected tables.
- [x] Update `server/index.js` to handle new fields in POST /listings, approve/reject endpoints, and GET /listings/approved.
- [x] Update `src/components/AddListingPage.jsx` to send all collected fields in form submission.
- [x] Update `src/components/Listings.jsx` to display new fields (already partially done).
- [x] Run database migrations to apply schema changes.
- [ ] Test the full flow: add listing, approve/reject, display approved listings.

## Change Currency Symbol in Listings
- [x] Change dollar sign ($) to Pakistani Rupee (₨) in src/components/Listings.jsx for price display under Results heading.
