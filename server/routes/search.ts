import express, { NextFunction, Request, Response, Router } from "express";
import { readFileSync } from "fs";
import path from "path";
import format from "pg-format";
import db from "../db/index";

const router: Router = express.Router();

const search_query = format(
    readFileSync(path.resolve(__dirname, "../sql/search.sql")).toString()
);

const search = router.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const { term } = req.query;
        await db.query(search_query, [term], (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows);
        });
    }
);

const view_query = format(
    readFileSync(path.resolve(__dirname, "../sql/view.sql")).toString()
);

// dynamic route for the respective word id
const view = router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        await db.query(view_query, [id], (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(result.rows);
        });
    }
);

export { search, view };
