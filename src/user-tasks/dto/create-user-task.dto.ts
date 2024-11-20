import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateUserTaskDto {

    @IsNotEmpty()
    @ApiProperty({ required: true })
    name: string

    @IsNotEmpty()
    @ApiProperty({ required: true, default: false })
    done: boolean

}
