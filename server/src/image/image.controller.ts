import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Post,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestErrorRes,
  InternalServerErrorRes,
  UnauthorizedErrorRes,
} from 'src/common/http-exception.dto';
import { UploadImagesDto } from './dto/update-image.dto';
import { UpdateImagesDto } from './dto/upload-image.dto';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: '이미지 생성 및 업로드' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiQuery({
    name: 'path',
    description: '저장 경로',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: '유저, 레시피, 댓글 카드 id',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '이미지 생성 및 업로드 성공',
    type: UploadImagesDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 에러',
    type: InternalServerErrorRes,
  })
  @Post(':id')
  @UseInterceptors()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Param('id') id,
    @Query('path') path,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<UploadImagesDto> {
    return await this.imageService.upload(files, id, path);
  }

  @ApiOperation({ summary: '이미지 수정 및 업데이트' })
  @ApiQuery({
    name: 'tokenType',
    description: '엑세스 토큰의 타입',
    required: true,
  })
  @ApiQuery({
    name: 'path',
    description: '저장 경로',
    required: true,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer + 엑세스 토큰',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: '유저, 레시피, 댓글 카드 id',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '이미지 생성 및 업로드 성공',
    type: UpdateImagesDto,
  })
  @ApiUnauthorizedResponse({
    description: '권한 없음',
    type: UnauthorizedErrorRes,
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BadRequestErrorRes,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 에러',
    type: InternalServerErrorRes,
  })
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('id') id,
    @Query('path') path,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<UpdateImagesDto> {
    return await this.imageService.update(files, id, path);
  }
}
