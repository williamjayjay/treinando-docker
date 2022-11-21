import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

const MAIN_TABLE = 'permission_role'
const PERMISSION_ID = 'permission_id'
const ROLE_ID = 'role_id'
const PERMISSION_TABLE = 'permission'
const ROLE_TABLE = 'role'
const FK_PERMISSION_TO_ROLE = 'fk_permission_to_role'
const FK_ROLE_TO_PERMISSION = "fk_role_to_permission"

export class CreatePermissionRole1668978114659 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: MAIN_TABLE,
        columns: [
          { name: ROLE_ID, type: "uuid" },
          { name: PERMISSION_ID, type: "uuid" }
        ]
      })
    )

    await queryRunner.createForeignKey(
      MAIN_TABLE, // 1º parametro que é o nome da TABELA INTERMEDIARIA
      new TableForeignKey({ // aqui no 2º parametro é a nossa FK com as opcoes que queremos
        columnNames: [PERMISSION_ID], // NOME DA COLUNA DA NOSSA TABELA INTERMEDIARIA
        referencedColumnNames: ["id"], // AQUI A QUAL ATRIBUTO(ID NO CASO) DA TABELA PERMISSION(REFERENCIADA), A NOSSA COLUNA 'PERMISSION_ID'(DA TABELA INTERMEDIARIA ) VAI LINKAR
        referencedTableName: PERMISSION_TABLE, // AQUI NOME DA TABELA  PERMISSION(REFERENCIADA)
        name: FK_PERMISSION_TO_ROLE, // NOME PARA A NOSSA FK
        onDelete: "CASCADE",
        onUpdate: "SET NULL"
      })
    )

    await queryRunner.createForeignKey(
      MAIN_TABLE, // 1º parametro que é o nome da TABELA INTERMEDIARIA
      new TableForeignKey({ // aqui no 2º parametro é a nossa FK com as opcoes que queremos
        columnNames: [ROLE_ID], // NOME DA COLUNA DA NOSSA TABELA INTERMEDIARIA
        referencedColumnNames: ["id"], // AQUI A QUAL ATRIBUTO(ID NO CASO) DA TABELA ROLE(REFERENCIADA), A NOSSA COLUNA 'PERMISSION_ID'(DA TABELA INTERMEDIARIA ) VAI LINKAR
        referencedTableName: ROLE_TABLE, // AQUI NOME DA TABELA  ROLE(REFERENCIADA)
        name: FK_ROLE_TO_PERMISSION, // NOME PARA A NOSSA FK
        onDelete: "CASCADE",
        onUpdate: "SET NULL"
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      MAIN_TABLE,
      FK_PERMISSION_TO_ROLE
    )
    await queryRunner.dropForeignKey(
      MAIN_TABLE,
      FK_ROLE_TO_PERMISSION
    )

    await queryRunner.dropTable(MAIN_TABLE)
  }
}
