import { Request, Response } from "express";
import { userModel } from "../models/user";
import { catchError } from "./errors";
import { Paginate } from "./query";

export = {

    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$            show all                 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    showAll: async (req: Request, res: Response) => {
        try {
            // let p = req.query.page, l = req.query.limit
            const page = Number(req.query.page), limit = Number(req.query.limit)
            let proj = { __v: 0, updatedAt: 0 }, obj = {}
            let docs: any = await Paginate(userModel, obj, page, limit, proj)
            if (docs.length == 0)
                return res.status(404).json({ message: "No User Found" });
            res.status(200).json(docs)
        }
        catch (err: any) {
            res.status(403).json(await catchError(err));
        };
    }

};

