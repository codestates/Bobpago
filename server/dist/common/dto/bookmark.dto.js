"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const bookmark_entity_1 = require("../../entities/bookmark.entity");
class BookmarkDto extends (0, swagger_1.OmitType)(bookmark_entity_1.Bookmark, ['userId']) {
    constructor() {
        super();
    }
}
exports.BookmarkDto = BookmarkDto;
//# sourceMappingURL=bookmark.dto.js.map