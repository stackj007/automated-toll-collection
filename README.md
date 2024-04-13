# Automated Toll Collection

### Todo

#### frontend

- [ ] Add validation to login/register forms (ex: min 8 chars, same password/confirm-password, etc)
- [ ] Rename header to navbar
- [ ] Remove all module.css files, restructure pages directory to have no sub-directories
- [ ] replace all icons with radix icons (if possible)
- [ ] Replace search in tables with builtin filterting https://ui.shadcn.com/docs/components/data-table#filtering
- [ ] fix addtollGateModal, should add toll gate once the request is 200 without refreshing
- [ ] / shouldn't redirect to login, should be/login
- [ ] fix links for admins (shouldn't see account, home, contact-us)
- [ ] remove contacts us
- [ ] remove notification
- [ ] remove documents if approved
- [ ] guest should see the landing page with no thing else other than login/signup
- [ ] admin can only see the dashboard
- [ ] remove tolls/contact-us from navbar
- [ ] dashboard should be accessible by a link (in navbar or somewhere else)
- [ ] Add success page for transaction 
- [ ] Add rejected page for transaction (on cancellation)
- [ ] Resolve other TODO in code

#### backend

- [ ] Refactor routes from index.ts to index.ts -> router.ts -> Controller
- [ ] Add validation to login/register endpoints
- [ ] Replace payment_method: '{PAYMENT_METHOD_ID}' with the actual payment method collected from the user.
