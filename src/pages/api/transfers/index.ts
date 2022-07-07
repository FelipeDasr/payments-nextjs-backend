import { transferMoneyValidator } from "../../../lib/validators/TransferMoneyValidator";
import { queryValidator } from "../../../lib/validators/QueryValidator";
import { authenticator } from "../../../lib/middlewares/authenticator";
import validator from "../../../lib/middlewares/validator";

import { getTransfers, transferMoney } from "../../../controllers/TransfersController";
import { router } from "../../../lib/router";

const handler = router();
handler.use(authenticator);

handler.post(validator(transferMoneyValidator), transferMoney);
handler.get(validator(queryValidator), getTransfers);

export default handler;