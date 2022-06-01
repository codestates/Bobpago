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
} from 'src/common/dto/http-exception.dto';
import { UploadImageResDto } from './dto/upload-image.res.dto';
import { UpdateImageResDto } from './dto/update-image.res.dto';
import { UploadImageReqDto } from './dto/request-dto/Upload-Image.req.dto';
import { UpdateImageReqDto } from './dto/request-dto/update-image.req.dto';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: '이미지 생성 및 업로드' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiQuery({ name: 'path', required: true })
  @ApiParam({ name: 'id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageReqDto })
  @ApiResponse({ status: 201, type: UploadImageResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post(':id')
  @UseInterceptors()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Param('id') id: number,
    @Query('path') path: string,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<UploadImageResDto> {
    return await this.imageService.upload(files, id, path);
  }

  @ApiOperation({ summary: '이미지 수정 및 업데이트' })
  @ApiQuery({ name: 'tokenType', required: true })
  @ApiQuery({ name: 'path', required: true })
  @ApiParam({ name: 'id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateImageReqDto })
  @ApiResponse({ status: 200, type: UpdateImageResDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('id') id: number,
    @Query('path') path: string,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<UpdateImageResDto> {
    return await this.imageService.update(files, id, path);
  }
}
