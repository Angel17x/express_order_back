import { File } from 'buffer';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsFileConstraint implements ValidatorConstraintInterface {
    validate(file: any, args: ValidationArguments): boolean {
        return file instanceof File;  // Corregido para usar el espacio de nombres correctamente
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Avatar must be a file upload';
    }
}

export function IsFile(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFileConstraint,
        });
    };
}