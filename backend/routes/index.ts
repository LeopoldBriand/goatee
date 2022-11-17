import { Express } from "express";
import auth from './auth';

export default function(app: Express) {
    auth(app);
}