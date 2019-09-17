"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    setupSwagger(app);
    await app.listen(3000);
}
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('JavaScript Full-Stack Demo')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
}
bootstrap();
//# sourceMappingURL=main.js.map