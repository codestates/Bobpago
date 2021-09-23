import { User } from 'src/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

// 실행 명령어 npm run seed:run
export class CreatInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ id: 1, nickname: '방배동자취남', password: '123' }])
      .execute();
  }
}
