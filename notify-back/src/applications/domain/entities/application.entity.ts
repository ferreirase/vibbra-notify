import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';

export enum NotificationChannel {
  WEB_PUSH = 'WEB_PUSH',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  channels: NotificationChannel[];

  @Column({ nullable: true })
  webPushSiteName: string;

  @Column({ nullable: true })
  webPushSiteUrl: string;

  @Column({ nullable: true })
  webPushIconUrl: string;

  @Column({ nullable: true })
  webPushPermissionText: string;

  @Column({ nullable: true })
  webPushAllowButtonText: string;

  @Column({ nullable: true })
  webPushDenyButtonText: string;

  @Column({ nullable: true })
  webPushWelcomeTitle: string;

  @Column({ nullable: true })
  webPushWelcomeMessage: string;

  @Column({ nullable: true })
  webPushWelcomeUrl: string;

  @Column({ nullable: true })
  emailSmtpHost: string;

  @Column({ nullable: true })
  emailSmtpPort: number;

  @Column({ nullable: true })
  emailSmtpUser: string;

  @Column({ nullable: true })
  emailSmtpPassword: string;

  @Column({ nullable: true })
  emailFromName: string;

  @Column({ nullable: true })
  emailFromAddress: string;

  @Column({ nullable: true })
  smsProvider: string;

  @Column({ nullable: true })
  smsUsername: string;

  @Column({ nullable: true })
  smsPassword: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
