import { authenticationValidator } from "../../../lib/validators/AccountValidators";
import validator from "../../../lib/middlewares/validator";

import { authenticate } from "../../../controllers/AccountControllers";
import { router } from "../../../lib/router";

const handler = router();
handler.post(validator(authenticationValidator), authenticate);

export default handler;