# Automated Toll Collection

## how to start

- download docker-compose
- exec `docker-compose up` in the terminal

### Todo

#### frontend

- [ ] user-dashboard fix GUI for desktop
- [x] Add isAdmin option to edit-user
- [x] Nav.jsx -> Navbar.jsx, Header() -> Navbar()
- [x] replace all icons with radix icons (if possible)
- [ ] replace localstorage with URI in AdminDashboard
- [ ] add isLoading circular buffer to documents.jsx submit
- [ ] fix useless stripe call
- [ ] Resolve other TODO in code
- [ ] Add rejected page for transaction (on cancellation)
- [ ] Add footer
- [ ] add vehicle type
- [x] mute or fix ESLint: 'onRedirect' is missing in props validation(react/prop-types)
- [ ] use local storage or session to store user rather than context
- [x] in /account, account balance, remove add payment/make payment and add top up
- [ ] remove console.log everywhere (tip: use eslint)
- [ ] useLastFourTransactions => useTransactions and use {limit} as parameter
- [ ] format date in transactionHistory, and put the formatDate function in utils.js to be used everywhere
- [ ] remove unused components (manually or use a tool)
- [ ] add unit tests
- [ ] show the gate in transaction history
- [ ] create alert modal, use it everywhere instead of alert()
- [ ] fix isAdmin always checked in usersContent

#### backend

- [x] add relation between transaction and tollgate (transaction.tollGate: TollGate|null)
- [x] add edit-tollgate
- [x] Add restriction isVerified to backend endpoints
- [x] Refactor routes from index.ts to index.ts -> router.ts -> Controller
- [ ] switch to restapi
- [ ] fix docker-compose
- [ ] add unit tests
- [ ] add integration tests
