# Automated Toll Collection

### Todo

#### frontend

- [ ] Fix /component/ui, use shadcn properly (using npx instead)
- [x] Add validation to login/register forms
- [ ] Rename header to navbar
- [ ] Remove all module.css files, restructure pages directory to have no sub-directories
- [ ] Resolve other TODO in code
- [ ] replace all icons with radix icons (if possible)
- [ ] put merge /ui folder in /components/ui folder

#### backend

- [ ] Refactor routes from index.ts to index.ts -> router.ts -> Controller
- [ ] Add validation to login/register endpoints
- [ ] Replace 'stripe_public_key' with your actual Stripe public key.
- [ ] Replace the fetch('/create-payment-intent', {...}) call with the actual server's endpoint that creates a PaymentIntent.
- [ ] Replace payment_method: '{PAYMENT_METHOD_ID}' with the actual payment method collected from the user.
