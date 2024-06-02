import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';
import { OrderStatus } from './enum/order.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {

    return this.ordersClient.send('createOrder', createOrderDto)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {

    return this.ordersClient.send('findAllOrders', orderPaginationDto)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {

    return this.ordersClient.send('findOneOrder', { id })
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {

    return this.ordersClient.send('findAllOrders', {
      status: statusDto.status,
      ...paginationDto
    })
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    // Seria bueno crear un dto para cada peticion y no usar el mismo dto para varias peticiones
    @Body() statusDto: StatusDto
  ) {

    return this.ordersClient.send('changeOrderStatus', {

      id,
      status: statusDto.status

    })
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

  }

}
