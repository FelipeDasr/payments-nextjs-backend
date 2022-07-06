import { queryValidator } from "../../../lib/validators/QueryValidator";
import { authenticator } from "../../../lib/middlewares/authenticator";
import validator from "../../../lib/middlewares/validator";

import { getAccountMovements } from "../../../controllers/AccountMovementsController";
import { router } from "../../../lib/router";

const handler = router();
handler.get(validator(queryValidator), authenticator, getAccountMovements);

export default handler;