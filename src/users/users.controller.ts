import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, FileFilterCallback } from 'multer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 조회(개발용으로 사용)' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/photo')
  @UseInterceptors(FileInterceptor('image',{
    fileFilter: (req: Request, file, cb: FileFilterCallback) => {
      if(!file.mimetype.match(/image\/(jpg|jpeg|png)/)){
        return cb(new UnsupportedMediaTypeException(
          'jpg, jpeg, png형식의 파일만 업로드 가능합니다.'
        ),);
      }
      cb(null, true);
  },
  storage: diskStorage({
    destination: './profile/images',
    filename: (req, file, cb) => {
      const extArray = file.mimetype.split('/');

      const date_now = `${Date.now()}`;
      cb(null, date_now + '.' + extArray[extArray.length - 1]);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  }))
  @ApiOperation({ summary: '이미지 업로드//개발중' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  uploadImage(@Req() req: Request, @UploadedFile() image: Express.Multer.File){
    if(image === undefined){
      throw new InternalServerErrorException('이미지를 업로드해주세요.');
    }
    return image.filename;
  }

  @Get('/mademeeting')
  @ApiOperation({ summary: '내가 만든 모임 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findMadeMeetings(@Req() req: Request) {
    const { user }:any = req;
    return this.usersService.findMadeMeetings(user);
  }


  @Get('/postedmeeting')
  @ApiOperation({ summary: '내가 가입한 모임 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findPostedMeetings(@Req() req: Request) {
    const { user }:any = req;
    return this.usersService.findPostedMeetings(user);
  }

  @Get('/likedmeeting')
  @ApiOperation({ summary: '내가 찜한 모임 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findLikedMeetings(@Req() req: Request) {
    const { user }:any = req;
    return this.usersService.findLikedMeetings(user);
  }

  @Get('/mademeeting/all')
  @ApiOperation({ summary: '내가 만든 모든 모임 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findAllMadeyMeetings(@Req() req: Request) {
    const { user }:any = req;
    return this.usersService.findAllMadeMeetings(user);
  }

  @Get('/postedmeeting/all')
  @ApiOperation({ summary: '내가 가입한 모든 모임 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findAllPostedMeetings(@Req() req: Request) {
    const { user }:any = req;
    return this.usersService.findAllPostedMeetings(user);
  }

  @Get('/mycomments')
  @ApiOperation({ summary: '내가 작성한 모든 댓글 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findAllMyComments(@Req() req: Request) {
    const { user }:any = req;
    return this.usersService.findAllMyComments(user);
  }

  @Delete('/delete')
  @ApiOperation({ summary: '유저 탈퇴' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  remove(@Req() req: Request) {
    const { user }:any = req;
    return this.usersService.remove(user);
  }
}
