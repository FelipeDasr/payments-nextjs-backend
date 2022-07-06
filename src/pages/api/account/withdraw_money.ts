import { newAccountMovementValidator } from "../../../lib/validators/AccountMovementValidator";
import { authenticator } from "../../../lib/middlewares/authenticator";
import validator from "../../../lib/middlewares/validator";

import { withdrawMoney } from "../../../controllers/AccountMovementsController";
import { router } from "../../../lib/router";

const handler = router();
handler.post(validator(newAccountMovementValidator), authenticator, withdrawMoney);

export default handler;