
import { IsEnum, ValidateNested } from "class-validator"
import { CreatePaymentProfileDto, CreatePaymentAddressDto } from "."
import { PaymentCountry, PaymentCurrency } from "src/orders/enum/payment"
import { Type } from "class-transformer"

export class CreatePaymentDto {

      @IsEnum(PaymentCurrency)
      currency: PaymentCurrency = PaymentCurrency.UYU

      @IsEnum(PaymentCountry)
      country: PaymentCountry = PaymentCountry.UY

      @ValidateNested()
      @Type(() => CreatePaymentProfileDto)
      payerProfile: CreatePaymentProfileDto

      @ValidateNested()
      @Type(() => CreatePaymentAddressDto)
      payerAddress: CreatePaymentAddressDto

}