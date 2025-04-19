import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

export async function seedInitialData(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository('users');

  const adminUser = {
    email: 'admin@notify.com',
    name: 'Admin',
    password: await bcrypt.hash('admin123', 10),
  };

  const existingAdmin = await userRepository.findOne({
    where: { email: adminUser.email },
  });

  if (!existingAdmin) {
    await userRepository.save(adminUser);
  }
}
