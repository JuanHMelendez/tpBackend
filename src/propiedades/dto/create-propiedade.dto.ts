import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropiedadeDto {
    // @IsNumber()
    // @IsNotEmpty()
    // id: number;
  
    @IsString()
    @IsNotEmpty()
    tipo_de_casa: string;
  
    @IsString()
    @IsNotEmpty()
    nombre_propietario: string;
  
    @IsString()
    @IsNotEmpty()
    telefono_propietario: string;
  
    @IsString()
    @IsNotEmpty()
    domicilio_propiedad: string;
  
    @IsBoolean()
    @IsNotEmpty()
    ocupado: boolean;
  
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    ciudad: string;
}
