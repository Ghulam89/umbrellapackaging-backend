import express from "express";

import {create,getAllContact,deleteContactById} from '../controller/ContactusController.js'
import { uploadContactUsImages } from '../upload/UploadFile.js';



const ContactusRouter = express.Router();

ContactusRouter.route("/create").post(uploadContactUsImages, create);
ContactusRouter.route("/getAll").get(getAllContact);
ContactusRouter.route("/delete/:id").delete(deleteContactById);


export default ContactusRouter