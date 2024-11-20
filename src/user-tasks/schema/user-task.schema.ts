import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Users } from "src/users/schema/user.schema";

@Schema({ timestamps: true })
export class UserTasks {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: Boolean, required: true, default: false })
    done: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true })
    user: Users

}

export type UserTasksDocument = HydratedDocument<UserTasks>
export const UserTasksModel = SchemaFactory.createForClass(UserTasks)