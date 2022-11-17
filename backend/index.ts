import Express from "express";
import cors from "cors";
import routes from "./routes";
import { config } from "dotenv";
import { initDB } from "./utils/surrealdb";

// Initialization
config();
initDB();
const app = Express();
app.use(cors());
app.use(Express.json());

// Routing
routes(app);

// Runnig the app
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});