import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('/register')
  registerUser(
    @Body() registerUserDto: RegisterUserDto
  ) {

    return this.client.send('auth.register.user', registerUserDto)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

  }

  @Post('/login')
  loginUser(
    @Body() loginUserDto: LoginUserDto
  ) {

    return this.client.send('auth.login.user', loginUserDto
    ).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @UseGuards(AuthGuard)
  @Get('/verify')
  verifyToken(
    @User() user: CurrentUser,
    @Token() token: string
  ) {

    return {
      user,
      token
    }

  }

}
