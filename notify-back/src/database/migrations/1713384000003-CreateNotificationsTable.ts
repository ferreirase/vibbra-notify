import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateNotificationsTable1713384000003
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar enums para o PostgreSQL
    await queryRunner.query(`
      CREATE TYPE notification_channel_enum AS ENUM ('WEB_PUSH', 'EMAIL', 'SMS');
      CREATE TYPE notification_status_enum AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED');
      CREATE TYPE notification_origin_enum AS ENUM ('API', 'PLATFORM');
    `);

    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'channel',
            type: 'notification_channel_enum',
          },
          {
            name: 'status',
            type: 'notification_status_enum',
            default: "'PENDING'",
          },
          {
            name: 'origin',
            type: 'notification_origin_enum',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'message',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'targetId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'iconUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'linkUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailSubject',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailTemplateId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'emailData',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'errorMessage',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sentAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deliveredAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'readAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'applicationId',
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
      'notifications',
      new TableForeignKey({
        columnNames: ['applicationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'applications',
        onDelete: 'CASCADE',
      }),
    );

    // Adicionar index para busca rápida
    await queryRunner.query(`
      CREATE INDEX idx_notifications_application_id ON notifications(applicationId);
      CREATE INDEX idx_notifications_channel ON notifications(channel);
      CREATE INDEX idx_notifications_status ON notifications(status);
      CREATE INDEX idx_notifications_created_at ON notifications(createdAt);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
    await queryRunner.query(`
      DROP TYPE IF EXISTS notification_channel_enum;
      DROP TYPE IF EXISTS notification_status_enum;
      DROP TYPE IF EXISTS notification_origin_enum;
    `);
  }
}
