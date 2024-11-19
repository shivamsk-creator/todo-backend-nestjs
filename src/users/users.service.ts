import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-buyer-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private jwtService: JwtService,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signup(createUserDto: CreateUserDto) {
    const { email } = createUserDto

    let existMail = await this.userModel.findOne({ email: email, })
    if (existMail) {
      throw new HttpException({ error_description: "This email is already exist! Please use another email address", error_code: 'EMAIL_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const buyerData = {
      ...createUserDto, password: hash
    }
    const buyer = await this.userModel.create(buyerData)

    const payload = {
      _id: buyer._id, email: buyer.email, name: buyer.name
    }

    let access_token = await this.jwtService.signAsync(payload)

    const data = {
      _id: buyer._id,
      email: buyer.email,
      name: buyer.name,
    }

    return { access_token, data }
  }

  async login(loginUserDto: LoginUserDto) {
    console.log("loginBuyerDto=>", loginUserDto);

    let user = await this.userModel.findOne({ email: loginUserDto.email })

    if (!user) {
      throw new HttpException({ error_description: 'Invalid email', error_code: 'INVALID_EMAIL' }, HttpStatus.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw new HttpException({ error_description: 'Invalid password', error_code: 'INVALID_PASSWORD' }, HttpStatus.BAD_REQUEST);
    }

    const payload = {
      _id: user._id, email: user.email, name: user.name
    }

    let access_token = await this.jwtService.signAsync(payload)

    const data = {
      _id: user._id,
      email: user.email,
      name: user.name,
    }

    return { access_token, data }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
