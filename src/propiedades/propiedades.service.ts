import { Injectable , NotFoundException } from '@nestjs/common';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { iPropiedad } from './entities/propiedade.entity';
import * as fs from 'fs';



@Injectable()
export class PropiedadesService {
  private readonly propiedades:iPropiedad[];

  constructor() {
    // Cargar el JSON de propiedades
    const Data = fs.readFileSync('./data/propiedades.json' , 'utf8'); 
    this.propiedades = JSON.parse(Data);
  }

  // private setId() : number {
  //   let MaxID = 0 ;
  //   if(this.propiedades.length > 0) {
  //     MaxID = Math.max(...this.propiedades.map(propiedad => propiedad.id));
    
  //   }
  //   return MaxID;
  // } 



  private setId(): number {
    const propiedades = this.getAll();
    const ids = propiedades.map(prop => (prop.id)); 
    const maxId = ids.length > 0 ? Math.max(...ids) : 0; // Encontrar el ID más grande en la matriz de IDs
    return (maxId + 1); 
  }


  createPropiedad (CreatePropiedadeDto: CreatePropiedadeDto):iPropiedad {
    const id = this.setId();
    const newPropiedad: iPropiedad = {id, ...CreatePropiedadeDto};
    this.propiedades.push(newPropiedad);
    this.saveToFile();
    return newPropiedad;
  }

  getAll(): iPropiedad[] {
    return this.propiedades;
  }

  getOne(id: number): iPropiedad {
    try{
         const prop = this.propiedades.find(propiedad => propiedad.id === id);
         if(Object.keys(prop).length)
      return prop;
        }catch(e){
          throw new NotFoundException('no se encontro el id' +id); 
    }
  }


  update(id: number, updatePropiedadeDto: UpdatePropiedadeDto) : iPropiedad {
    const index = this.propiedades.findIndex(propiedad => propiedad.id === id);
    if (index === -1){
    return null;
    }
    const updatePropiedad = {...this.propiedades[index], ...updatePropiedadeDto}
    this.propiedades[index] = updatePropiedad;
    this.saveToFile();
    return updatePropiedad;
  }

  partialUpdate(id: number, updatePropiedadeDto: Partial<UpdatePropiedadeDto>): iPropiedad {
    const index = this.propiedades.findIndex(propiedad => propiedad.id === id);
    if (index === -1) {
      return null;
    }
    const updatedPropiedad = { ...this.propiedades[index], ...updatePropiedadeDto };
    this.propiedades[index] = updatedPropiedad;
    this.saveToFile();
    return updatedPropiedad;
  }

  remove(id: number):iPropiedad {
    const index = this.propiedades.findIndex(propiedad => propiedad.id === id);
    if (index === -1){
      return null;

    }
    const removePropiedad = this.propiedades.splice(index, 1)[0];
    this.saveToFile();
    return removePropiedad;
  }


  private saveToFile(): void {
    fs.writeFileSync('./data/propiedades.json', JSON.stringify(this.propiedades, null, 2));
  }

  searchByCity(ciudad :string) : iPropiedad[]{
      return this.propiedades.filter(propiedad => propiedad.ciudad === ciudad);
}

}
