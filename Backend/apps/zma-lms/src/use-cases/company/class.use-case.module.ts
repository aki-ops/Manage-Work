import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DataServicesModule } from '../../services/data-services/data-services.module';

import { ClassFactoryService, ClassStudentFactoryService, ScoreFactoryService, NotificationFactoryService, DocumentFactoryService } from './class-factory.user-case.service';
import { ClassUseCase } from './class.use-case';
import { DocumentUseCase } from './document.use-case';
import { NotificationUseCase } from './noti.use-case';
import { ScoreUseCase } from './score.use-case';
import { ClassStudentUseCase } from './studentadd.use-case';

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
  ],
  providers: [ClassFactoryService, ClassUseCase, ClassStudentFactoryService, ClassStudentUseCase, ScoreFactoryService, ScoreUseCase, NotificationFactoryService, NotificationUseCase, DocumentFactoryService, DocumentUseCase],
  exports: [ClassFactoryService, ClassUseCase, ClassStudentFactoryService, ClassStudentUseCase, ScoreFactoryService, ScoreUseCase, NotificationFactoryService, NotificationUseCase, DocumentFactoryService, DocumentUseCase],
})
export class CompanyUseCaseModule {}
