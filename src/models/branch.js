import mongoose from "mongoose";
import { hashPassword, comparePassword } from '../hooks/passwordHooks.js';

//Branch Schema

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true},
    liveLocation: {       // get the live location of user when user is loged in
        latitude:{ type:Number},
        longitude:{type:Number},
    },
    address: {type:String},
    deliveryPartners:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"DeliveryPartner",
        },
    ],

});

// Export Schema

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;