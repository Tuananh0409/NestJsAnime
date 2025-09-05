import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { View } from './entities/view.entity';
import { Movie } from './entities/movie.entity';
import { MovieCategory } from './entities/movie-category.entity';
import { Follow } from './entities/follows.entity';
import { Episode } from './entities/episode.entity';
import { Category } from './entities/category.entity';
import { Comment } from './entities/comment.entity';
import { UserModule } from './modules/user/user.module';
import { ViewModule } from './modules/view/view.module';
import { EpisodeModule } from './modules/episode/episode.module';
import { MovieModule } from './modules/movie/movie.module';
import { CategoryModule } from './modules/category/category.module';
import { MovieCategoryModule } from './modules/movie-category/movie-category.module';
import { AuthModule } from './modules/auth/auth.module';
import { FollowModule } from './modules/follow/follow.module';
import { CommentModule } from './modules/comment/comment.module';
import { Blog } from './entities/blog.entity';
import { CommentBlog } from './entities/commentblog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'webanime',
      entities: [User, View, Movie, MovieCategory, Comment, Follow, Episode, Category, Blog, CommentBlog],
      synchronize: true, 
    }),
    UserModule,
    ViewModule,
    EpisodeModule,
    MovieModule,
    CategoryModule,
    MovieCategoryModule,
    AuthModule,
    FollowModule,
    CommentModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
