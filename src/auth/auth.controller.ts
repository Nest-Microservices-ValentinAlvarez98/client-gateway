import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateAuthDto } from './dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('/create')
  create(
    @Body() createAuthDto: CreateAuthDto
  ) {

    return this.client.send('auth.create', createAuthDto)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

  }
}
