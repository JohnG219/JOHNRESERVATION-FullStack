import express, { application } from "express";
import { createcustomers, getcustomers } from "../controllers/customers.js";



const router=express.Router();

router.put("/create",createcustomers)


router.get("/",getcustomers);

export default router