# Automated Toll Collection
## how to start
- download docker-compose
- exec `docker-compose up` in the terminal

### Todo

#### frontend
- [ ] user-dashboard fix GUI for desktop
- [ ] make user-dashboard use real transaction
- [ ] fix user-dashboard view more
- [ ] admin can't access /account
- [ ] fix navbar for user
- [ ] Add isAdmin option to edit-user
- [ ] add edit-tollgate
- [ ] Rename header to navbar
- [ ] restructure pages directory to have no sub-directories
- [ ] replace all icons with radix icons (if possible)
- [ ] remove documents if approved
- [ ] replace localstorage with URI in AdminDashboard
- [ ] add isLoading circular buffer to documents.jsx submit
- [ ] fix useless stripe call
- [ ] Resolve other TODO in code
- [ ] Add rejected page for transaction (on cancellation)
- [ ] Add footer
- [ ] format date on transactions
#### backend

- [ ] fix upload
- [ ] add edit-tollgate
- [ ] Add restriction isVerified to backend endpoints
- [ ] Refactor routes from index.ts to index.ts -> router.ts -> Controller
- [ ] fix docker-compose
