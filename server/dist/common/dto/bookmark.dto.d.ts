import { Bookmark } from 'src/entities/bookmark.entity';
declare const BookmarkDto_base: import("@nestjs/common").Type<Omit<Bookmark, "userId">>;
export declare class BookmarkDto extends BookmarkDto_base {
    constructor();
}
export {};
