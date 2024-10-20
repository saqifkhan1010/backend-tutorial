// This is the basic code to setup a model 

// import mongoose, {Schema} from "mongoose";
// const userSchema = new Schema({})
// export const User = mongoose.model("User",userSchema)



import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// This is the example for a user model 
const userSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            index: true,
            required:true,
            trim:true,
            lowercase:true
        },
        email:{
            type:String,
            unique:true,
            required:true,
            trim:true,
            lowercase:true
        },
        fullName:{
            type:String,
            unique:true,
            index: true,
            trim:true,
        },
        avatar:{
            type:String,  //cloudinary url provide karega
            required:true,
        },
        coverImage:{
            type:String,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true, "Password is required"]
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)


// this middleware is used to encrypt password before saving it to database with the hepl of hook called "pre" and 
userSchema.pre("save", async function(next){
    // this if statement will check if the password is changed or modified or not if the password is same it will not use the hash method warna baar baar paasword ko hash karte jayega so password login me same hai ki nahi check karna mushkil ho jayega
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
});

// this is the method to check the password from database with the user password jo wo enter kar raha hai login ke waqt 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_Expiry
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_Expiry
        }
    )
}

export const User = mongoose.model("User",userSchema)