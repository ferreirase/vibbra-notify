import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateApplicationsTable1713384000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'applications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'channels',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'webPushSiteName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushSiteUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushIconUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushPermissionText',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushAllowButtonText',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushDenyButtonText',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushWelcomeTitle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushWelcomeMessage',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webPushWelcomeUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailSmtpHost',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailSmtpPort',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'emailSmtpUser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailSmtpPassword',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailFromName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailFromAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'smsProvider',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'smsUsername',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'smsPassword',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'applications',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('applications');
  }
}
