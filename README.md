# Automated Toll Collection

## how to start

- download docker-compose
- exec `docker-compose up` in the terminal

### Todo

#### frontend

- [ ] user-dashboard fix GUI for desktop
- [ ] Add isAdmin option to edit-user
- [ ] Nav.jsx -> Navbar.jsx, Header() -> Navbar()
- [ ] replace all icons with radix icons (if possible)
- [ ] replace localstorage with URI in AdminDashboard
- [ ] add isLoading circular buffer to documents.jsx submit
- [ ] fix useless stripe call
- [ ] Resolve other TODO in code
- [ ] Add rejected page for transaction (on cancellation)
- [ ] Add footer
- [ ] add vehicle type
- [ ] mute or fix  ESLint: 'onRedirect' is missing in props validation(react/prop-types)
- [ ] use local storage or session to store user rather than context
- [ ] in /account, account balance, remove add payment/make payment and add top up
- [ ] remove console.log everywhere (tip: use eslint)
- [ ] useLastFourTransactions => useTransactions and use {limit} as parameter
- [ ] format date in transactionHistory, and put the formatDate function in utils.js to be used everywhere
- [ ] remove unused components (manually or use a tool)
#### backend

- [x] fix upload
- [ ] add relation between transaction and tollgate (transaction.tollGate: TollGate|null)
- [ ] add edit-tollgate
- [ ] Add restriction isVerified to backend endpoints
- [ ] Refactor routes from index.ts to index.ts -> router.ts -> Controller
- [ ] fix docker-compose
