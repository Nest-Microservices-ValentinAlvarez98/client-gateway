import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({
      cmd: 'create_product'
    }, createProductDto)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )
  }

  @Get()
  async getAllProducts(@Query() paginationDto: PaginationDto) {

    // Se maneja como un observable, se espera a que se resuelva y se obtiene el valor
    // Send espera la respuesta del microservicio, emit no espera la respuesta
    return this.productsClient.send({
      cmd: 'find_all_products'
    }, {
      page: paginationDto.page,
      limit: paginationDto.limit
    })
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      )

    // Otra forma de hacerlo:
    /* try {
      
      const product = await firstValueFrom(
        this.productsClient.send({
          cmd: 'find_all_products'
        }, {
          page: paginationDto.page,
          limit: paginationDto.limit
        })
      )

      return product;

    } catch (error) {

      throw new RpcException(error)

    } */

  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {

    try {
      const product = await firstValueFrom(
        this.productsClient.send({
          cmd: 'find_product_by_id'
        }, {
          id
        })
      )

      return product;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateProductDto: UpdateProductDto
  ) {
    return this.productsClient.send({
      cmd: 'update_product'
    }, {
      id,
      ...UpdateProductDto
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({
      cmd: 'remove_product'
    }, {
      id
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    )
  }

}
