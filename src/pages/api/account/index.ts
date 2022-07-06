import { createAccountValidator } from "../../../lib/validators/AccountValidators";
import validator from "../../../lib/middlewares/validator";

import { createAccount } from "../../../controllers/AccountControllers";
import { router } from "../../../lib/router";

const handler = router()
handler.post(validator(createAccountValidator), createAccount);

export default handler;