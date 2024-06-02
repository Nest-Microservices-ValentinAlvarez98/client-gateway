import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    /* ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers
        }
      },

    ]) */
    NatsModule
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {


}
