import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DataServicesModule } from '../../services/data-services/data-services.module';

import { UserFactoryService } from './user-factory.user-case.service';
import { UserUseCase } from './user.use-case';


@Module({
  imports: [
    DataServicesModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'TEST_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('URL'),
            port: 3001,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule
  ],
  providers: [UserFactoryService, UserUseCase],
  exports: [UserFactoryService, UserUseCase],
})
export class UserUseCaseModule {}
