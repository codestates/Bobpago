import {
  Controller,
  UploadedFiles,
  UseInterceptors,
  Post,
  Param,
  Query,
  Patch,
  UseFilters,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOperation,
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
import { CheckTokenTypeReqDto } from 'src/common/dto/check-token-type.dto';
import { CheckImageIdReqDto } from './dto/request-dto/check-image-id.req.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-excepotion.filter';
import { GenerateResponseDto } from 'src/common/dto/response.dto';
import { CheckImagePathReqDto } from './dto/request-dto/check-image-path.req.dto';
import { UploadImageReqDto } from './dto/request-dto/Upload-Image.req.dto';
import { UploadImageResDto } from './dto/response-dto/upload-image.res.dto';
import { UpdateImageReqDto } from './dto/request-dto/update-image.req.dto';
import { UpdateImageResDto } from './dto/response-dto/update-image.res.dto';

@ApiTags('Image')
@ApiBearerAuth('AccessToken')
@Controller('image')
@UseFilters(HttpExceptionFilter)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: '이미지 생성 및 업로드' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageReqDto })
  @ApiResponse({ status: 201, type: UploadImageReqDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Post(':id')
  @UseInterceptors()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Param() param: CheckImageIdReqDto,
    @Query() query: CheckImagePathReqDto,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<UploadImageResDto> {
    return await this.imageService.upload(files, param.id, query.path);
  }

  @ApiOperation({ summary: '이미지 수정 및 업데이트' })
  @ApiQuery({ type: CheckTokenTypeReqDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateImageReqDto })
  @ApiResponse({ status: 200, type: UpdateImageReqDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorRes })
  @ApiBadRequestResponse({ type: BadRequestErrorRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorRes })
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param() param: CheckImageIdReqDto,
    @Query() query: CheckImagePathReqDto,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<UpdateImageResDto> {
    return await this.imageService.update(files, param.id, query.path);
  }
}
