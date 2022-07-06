import { newAccountMovementValidator } from "../../../lib/validators/AccountMovementValidator";
import validator from "../../../lib/middlewares/validator";

import { depositMoney } from "../../../controllers/AccountMovementsController";
import { authenticator } from "../../../lib/middlewares/authenticator";
import { router } from "../../../lib/router";

const handler = router();
handler.post(authenticator, validator(newAccountMovementValidator), depositMoney);

export default handler;