import express from 'express';
import {tollGateRouter} from "./_src/routes/tollgate";
import {userRouter} from "./_src/routes/user";
import {transactionRouter} from "./_src/routes/transaction";
import {userRequestRouter} from "./_src/routes/userRequest";
import {stripeRouter} from "./_src/routes/stripe";

const router = express.Router();

router.use('/toll-gates', tollGateRouter());
router.use('/transactions', transactionRouter());
// TODO: should be /users, /stripe, /user-requests
router.use('/', stripeRouter());
router.use('/', userRequestRouter());
router.use('/', userRouter());

export default router;
