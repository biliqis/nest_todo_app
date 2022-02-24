import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfiguration } from './utils/config/envConfiguration';
import { envValidationSchema } from './utils/config/env.validationSchema';
import { TodoModule } from './todo/todo.module';
import { TodoSchema } from './todo/Schema/todo.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
       // uri: configService.get<string>(envConfiguration.CONNECTION_STRING),
           uri: configService.get<string>(envConfiguration.MONGO_URI),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      validationSchema: envValidationSchema,
      envFilePath: ['.env'],
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
