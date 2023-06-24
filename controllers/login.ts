import { Request, Response } from "express";
const bcrypt = require("bcrypt");
import validator from "validator";
import { loginModel } from "../models/login";
import { userModel } from "../models/user";
import { catchError } from "./errors";

export = {

    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   Login    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    login: async (req: Request, res: Response) => {
        try {
            const { email, password, userName, address, contact } = req.body
            if (!email || !password)
                return res.status(400).json({ message: "Credentials Missing" });
            if (!validator.isStrongPassword(password))
                return res.status(400).json({ message: "Weak Password" });

            const hash = await bcrypt.hash(password, 10);
            const logId = await loginModel.create({
                email,
                password: hash
            });
            const docs = await userModel.create({
                loginId: logId._id,
                userName,
                address,
                contact
            })
            res.status(200).json({ message: "Login Successfully", docs });
        }
        catch (err: any) {
            res.status(403).json(await catchError(err));
        }
    },

};

