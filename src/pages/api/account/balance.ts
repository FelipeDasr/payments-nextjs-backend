import { authenticator } from "../../../lib/middlewares/authenticator";

import { checkTheBalance } from "../../../controllers/AccountControllers";
import { router } from "../../../lib/router";

const handler  = router();
handler.get(authenticator, checkTheBalance);

export default handler;