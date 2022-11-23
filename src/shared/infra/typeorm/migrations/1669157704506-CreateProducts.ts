import { MigrationInterface, QueryRunner, Table } from "typeorm"

const MAIN_TABLE = 'products'

export class CreateProducts1669157704506 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: MAIN_TABLE,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            // default: "uuid_generate_v4()" FUNCAO ANTIGA, NAO HA MAIS MANUTENCAO
            default: "gen_random_uuid()"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(MAIN_TABLE)
  }
}
