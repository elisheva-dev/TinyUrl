import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    originalUrl: String,
    clicks: [
        {
            insertedAt: Date,
            ipAddress: String,
            targetParamValue:String
        }],
        targetParamName: { type: String, default: "target" },
        targetValues: [
            {
                name:String,
                value: String
            }
        ]

});

const LinkModel = mongoose.model("Links", LinkSchema);

export { LinkSchema };
export default LinkModel;