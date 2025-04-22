import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Application,
  NotificationChannel,
} from '../../../applications/domain/entities/application.entity';

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

export enum NotificationOrigin {
  API = 'API',
  PLATFORM = 'PLATFORM',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: NotificationChannel,
  })
  channel: NotificationChannel;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({
    type: 'enum',
    enum: NotificationOrigin,
  })
  origin: NotificationOrigin;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  targetId: string;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({ nullable: true })
  linkUrl: string;

  @Column({ nullable: true })
  emailSubject: string;

  @Column({ nullable: true })
  emailTemplateId: string;

  @Column('json', { nullable: true })
  emailData: Record<string, any>;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  errorMessage: string;

  @Column({ nullable: true })
  sentAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @Column({ nullable: true })
  readAt: Date;

  @Column()
  applicationId: string;

  @ManyToOne(() => Application, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
