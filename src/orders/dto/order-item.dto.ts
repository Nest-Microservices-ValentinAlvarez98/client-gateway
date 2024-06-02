import { IsNumber, IsPositive } from "class-validator";


export class OrderItemDto {

      @IsNumber()
      @IsPositive()
      // Son de tipo number porque nuestro microservicio de products es number
      productId: number;

      @IsNumber()
      @IsPositive()
      quantity: number;

      @IsNumber()
      @IsPositive()
      price: number;

}