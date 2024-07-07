import { Module } from '@nestjs/common';
import { PropiedadesModule } from './propiedades/propiedades.module';

@Module({
  imports: [PropiedadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
