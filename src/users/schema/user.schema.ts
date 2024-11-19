import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Users {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    email: string

    @Prop({ type: String, default: "" })
    password: string

}

export type UsersDocument = HydratedDocument<Users>
export const UsersModel = SchemaFactory.createForClass(Users)