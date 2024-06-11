import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateBillAddressDto, CreateLogin_infoDto, CreateShpAddressDto, CreateUserDto, UpdateBillAddressDto, UpdateProfileDto, UpdateShpAddressDto } from './dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';


@Controller('users')
export class UsersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {

    return this.client.send('users.register', createUserDto).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Post('/login')
  login(@Body() createLogin_infoDto: CreateLogin_infoDto) {

    return this.client.send('users.login', createLogin_infoDto).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Get('/find/all')
  findAll(@Query() paginationDto: PaginationDto) {

    return this.client.send('users.find.all', {
      page: paginationDto.page,
      limit: paginationDto.limit
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Get('/find/:id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {

    return this.client.send('users.findById', {
      id: id
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Get('/profile/find/:id')
  findProfile(@Param('id', ParseUUIDPipe) id: string) {

    return this.client.send('users.profile.findById', {
      id: id
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Patch('/profile/update/:id')
  updateProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto) {

    return this.client.send('users.profile.update', {
      id: id,
      profile: updateProfileDto
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Post('/shipping/create/:id')
  createShpAddress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createShpAddressDto: CreateShpAddressDto) {

    return this.client.send('users.shipping.address.create', {
      id: id,
      shp_address: createShpAddressDto
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Get('/shipping/find/shpId/:shp_id')
  findShpAddress(@Param('shp_id', ParseUUIDPipe) shp_id: string) {

    return this.client.send('users.shipping.address.findByShpId', {
      shp_id: shp_id
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Patch('/shipping/update/shpId/:shp_id')
  updateShpAddress(
    @Param('shp_id', ParseUUIDPipe) shp_id: string,
    @Body() updateShpAddressDto: UpdateShpAddressDto) {

    return this.client.send('users.shipping.address.updateByShpId', {
      shp_id: shp_id,
      shp_address: updateShpAddressDto
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Post('/billing/create/:id')
  createBillAddress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createBillAddressDto: CreateBillAddressDto) {

    return this.client.send('users.billing.address.create', {
      id: id,
      bill_address: createBillAddressDto
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Get('/billing/find/:id')
  findBillAddress(@Param('id', ParseUUIDPipe) id: string) {

    return this.client.send('users.billing.address.findById', {
      id: id
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

  @Patch('/billing/update/:id')
  updateBillAddress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBillAddressDto: UpdateBillAddressDto) {

    return this.client.send('users.billing.address.update', {
      id: id,
      bill_address: updateBillAddressDto
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )

  }

}
