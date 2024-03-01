import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  IsNotEmpty,
  IsNumber,
  Min,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

// Custom validator que verifica si un valor es un número decimal.
@ValidatorConstraint({ name: 'isDecimal', async: false })
export class IsDecimalConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'number' && value % 1 !== 0;
  }

  defaultMessage(args: ValidationArguments) {
    return 'El valor debe ser un número decimal';
  }
}

// Decorador de validación personalizado que puedes usar en tu DTO.
export function IsDecimal(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDecimal',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDecimalConstraint,
    });
  };
}

// Tu DTO con el validador personalizado
export class CreateProductDto {
  // ...otros campos...

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @IsDecimal({ message: 'El precio debe ser un valor decimal positivo.' })
  price: number;

  // ...otros campos...
}