import mongoose,{Schema,Document} from 'mongoose';


export interface IPayment extends Document {
    amount: Number;
    currency:String;
    paymentIntentId: String;
    status: String;
  }

const PayemntSchema = new Schema({

    amount : { type :Number,required:true},
    currency :{type:String,required:true},
    paymentIntentId:{ type:String,required:true},
    status:{type:String,required:true}

}, {
    timestamps:true
})

export default mongoose.model<IPayment>('Payments',PayemntSchema)