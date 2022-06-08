"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expressBasicAuth = require("express-basic-auth");
const http_excepotion_filter_1 = require("./common/exceptions/http-excepotion.filter");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
async function bootstrap() {
    (0, typeorm_transactional_cls_hooked_1.initializeTransactionalContext)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [`${process.env.CLIENT_URL}`, 'https://www.bobpago.com'],
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_excepotion_filter_1.HttpExceptionFilter());
    app.use(['/dev', '/dev-json'], expressBasicAuth({
        challenge: true,
        users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
    }));
    const devConfig = new swagger_1.DocumentBuilder()
        .setTitle('Bobpago API Test Tool')
        .setDescription('Bobpago API 테스트 도구')
        .setVersion('1.0.1')
        .addBearerAuth({
        description: 'Please enter token in following format: Bearer <JWT>',
        name: 'Authorization',
        bearerFormat: 'JWT',
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
    }, 'AccessToken')
        .build();
    const testTool = swagger_1.SwaggerModule.createDocument(app, devConfig);
    swagger_1.SwaggerModule.setup('dev', app, testTool);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Bobpago API Docs')
        .setDescription('Bobpago API 문서')
        .setVersion('1.0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            supportedSubmitMethods: [],
        },
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map