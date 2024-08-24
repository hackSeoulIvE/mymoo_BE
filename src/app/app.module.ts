import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserOrder } from 'src/order/entities/order.entity';
import { Foodstore } from 'src/foodstore/entities/foodstore.entity';
import { FoodstoreComment } from 'src/foodstore/entities/foodstore_comment.entity';
import { FoodstoreFood } from 'src/foodstore/entities/foodstore_food.entity';
import { UserController } from 'src/user/user.controller';
import { FoodStoreController } from 'src/foodstore/foodstore.controller';
import { UserModule } from 'src/user/user.module';
import { FoodStoreModule } from 'src/foodstore/foodstore.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      extra: {
        socketPath: process.env.DB_SOCKETPATH
      },
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, UserOrder, Foodstore, FoodstoreComment, FoodstoreFood],
      migrations: [__dirname + '/src/migrations/*.ts'],
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
      keepConnectionAlive: true,
      timezone: '+09:00',
    }),
    UserModule,
    FoodStoreModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
