import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
export declare class CreatInitialData implements Seeder {
    run(factory: Factory, connection: Connection): Promise<any>;
}
