import { Express } from "express";
import auth from "../controllers/auth";

export default function(app : Express) {
    app.route('/login')
        .get(auth.login);

    app.route('/signin')
        .get(auth.signin);
}