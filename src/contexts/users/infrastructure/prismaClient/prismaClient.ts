import { Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class PrismaClientRepository
  extends PrismaClient
  implements OnModuleInit
{
  private logger = new Logger(PrismaClientRepository.name);
  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected with Prisma');
  }
}
