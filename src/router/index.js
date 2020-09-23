import { base, login, landing } from "./routes";
import newRouter from "./router";

const router = newRouter([base, login, landing]);

export default router;
