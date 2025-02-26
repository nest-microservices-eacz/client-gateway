import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { RequestUser } from './interfaces/request-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('/auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('/login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.client.send('auth.login.user', loginDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('/register')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.client.send('auth.register.user', registerDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/verify')
  verifyUser(@User() user: RequestUser, @Token() token: string) {
    return { user, token };
  }
}
