import express from 'express';
import {tollGateRouter} from "./src/routes/tollgate";
import {userRouter} from "./src/routes/user";
import {transactionRouter} from "./src/routes/transaction";
import {userRequestRouter} from "./src/routes/userRequest";
import {stripeRouter} from "./src/routes/stripe";

const router = express.Router();

router.use('/toll-gates', tollGateRouter());
router.use('/transactions', transactionRouter());
// TODO: should be /users, /stripe, /user-requests
router.use('/', stripeRouter());
router.use('/', userRequestRouter());
router.use('/', userRouter());

export default router;
