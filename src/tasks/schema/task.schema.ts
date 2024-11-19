import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Tasks {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: Boolean, required: true, default: false })
    done: boolean

}

export type TasksDocument = HydratedDocument<Tasks>
export const TasksModel = SchemaFactory.createForClass(Tasks)