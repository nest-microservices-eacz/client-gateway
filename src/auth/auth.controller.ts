import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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

  @Get('/verify')
  verifyUser() {
    return this.client.send('auth.verify.user', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
