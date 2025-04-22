import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDescriptionToApplications1713384000004
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'applications',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('applications', 'description');
  }
}
