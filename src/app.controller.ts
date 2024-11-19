import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginUserDto } from './users/dto/login-buyer-dto';

@ApiTags("Auth")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private userService: UsersService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    console.log("createBuyerDto=>", createUserDto);

    return this.userService.signup(createUserDto);
  }

  @Post('/login')
  login(@Body() loginBuyerDto: LoginUserDto, @Request() req: any) {
    // console.log("request=>", req)
    return this.userService.login(loginBuyerDto);
  }
}
