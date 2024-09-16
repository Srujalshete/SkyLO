import mongoose from "mongoose";
import { hashPassword, comparePassword } from '../hooks/passwordHooks.js';

//Base User Schema

const userSchema = new mongoose.Schema({
    name: { type: String },
    role: {
        type:String,
        enum: ["Customer", "Admin", "DeliveryPartner"],
        required: true,
    },
    isActivated:{type:Boolean, default:false},

});

// Customer Schema

const customerSchema = new mongoose.Schema({
    ...userSchema.obj,    // use spread operator to acess the fileds of user schema(it spread all the fileds of user schema)
    phone:{type:Number, required:true, unique:true},
    role:{type:String, enum: ["Customer"], default:"Customer"},
    liveLocation: {       // get the live location of user when user is loged in
        latitude:{ type:Number},
        longitude:{type:Number},
    },
    address: {type:String},
});


// DeliveryPartner Schema

const DeliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,    // use spread operator to acess the fileds of user schema(it spread all the fileds of user schema)
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true },
    phone:{type:Number, required:true },
    role:{type:String, enum: ["DeliveryPartner"], default:"DeliveryPartner"},
    liveLocation: {       // get the live location of user when user is loged in
        latitude:{ type:Number},
        longitude:{type:Number},
    },
    address: {type:String},
    branch:{    // create branch (Brach and delivery partner will be linked(for in same area))
        type:mongoose.Schema.Types.ObjectId,
    ref: "Branch",  
    },
});

DeliveryPartnerSchema.pre('save', hashPassword);
DeliveryPartnerSchema.methods.comparePassword = comparePassword;

// Admin Schema

const adminSchema = new mongoose.Schema({
    ...userSchema.obj,    // use spread operator to acess the fileds of user schema(it spread all the fileds of user schema)
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true },
    phone:{type:Number, required:true },
    role:{type:String, enum: ["Admin"], default:"Admin"},
});


// Export all the Scehma's

export const Customer = mongoose.model("Customer", customerSchema);
export const DeliveryPartner = mongoose.model("DeliverPartner", DeliveryPartnerSchema);
export const Admin = mongoose.model("admin", adminSchema);

