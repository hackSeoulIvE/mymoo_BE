import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';
import { FoodStoreService } from './foodstore.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { FoodStoreCommentService } from './foodstore_comment.service';
import { createFoodstoreCommentDto } from './dto/create-foodstore_comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class FoodStoreCommentController {
  constructor(private readonly commentService: FoodStoreCommentService) {}

  @Post()
  @ApiOperation({ summary: '가게 댓글 생성' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  create(@Req() req: Request,@Body() createCommentDto: createFoodstoreCommentDto) {
    const { user }: any = req;
    return this.commentService.create(user, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: '댓글 모두 찾기 (개발용)' })
  findAll() {
    return this.commentService.findAll();
  }

  @Get('comment:id')
  @ApiOperation({ summary: '댓글 id 조회' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  findById(@Param('id') id: string) {
    return this.commentService.findById(+id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: '댓글 삭제 (개발용)' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
