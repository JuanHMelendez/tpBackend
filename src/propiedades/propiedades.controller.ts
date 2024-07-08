import { Controller, Get, Post, Body, Patch, Param, Delete, Put , Query , ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { iPropiedad } from './entities/propiedade.entity';


@Controller('propiedades')
export class PropiedadesController {
  constructor(private readonly propiedadesService: PropiedadesService) {}

  @Get('')
  getAll() : iPropiedad[] {
    return this.propiedadesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id' , new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_FOUND})) id: number) : iPropiedad {
    return this.propiedadesService.getOne(+id);
  }

@Post()
  createPropiedad(@Body() createPropiedadeDto: CreatePropiedadeDto) : iPropiedad {
    return this.propiedadesService.createPropiedad(createPropiedadeDto);
  }


@Put(':id')
update(@Param('id' , new ParseIntPipe ({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, @Body() updatePropiedadeDto:UpdatePropiedadeDto): iPropiedad {
  return this.propiedadesService.update(+id , updatePropiedadeDto)
}

  @Patch(':id')
  partialUpdate(@Param('id' , new ParseIntPipe ({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: string, @Body() updatePropiedadeDto: UpdatePropiedadeDto) {   //el patch solo modifica el dato que queres
    return this.propiedadesService.update(+id, updatePropiedadeDto);
  }


  @Delete(':id')
  remove(@Param('id' , new ParseIntPipe ({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: string) {
    return this.propiedadesService.remove(+id);
  }

  @Get('search/byCity')
  searchByCity(@Query('city') city: string) : iPropiedad[] {      //http://localhost:3000/propiedades/search/byCity?city=Tulum  para postman
    return this.propiedadesService.searchByCity(city);
}


}
