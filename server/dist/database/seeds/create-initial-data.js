"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatInitialData = void 0;
const user_entity_1 = require("../../entities/user.entity");
class CreatInitialData {
    async run(factory, connection) {
        await connection
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.User)
            .values([{ id: 1, nickname: '방배동자취남', password: '123' }])
            .execute();
    }
}
exports.CreatInitialData = CreatInitialData;
//# sourceMappingURL=create-initial-data.js.map