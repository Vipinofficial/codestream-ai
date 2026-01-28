/**
 * Seed script to create test users in the JSON database
 * Usage: node seedTestUsers.js
 * 
 * Creates:
 * - admin@test.com / password123 (admin role)
 * - recruiter@test.com / password123 (recruiter role)  
 * - candidate@test.com / password123 (candidate role)
 */

import db from './src/db.js';
import bcrypt from 'bcryptjs';

const TEST_USERS = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin'
  },
  {
    name: 'Recruiter User',
    email: 'recruiter@test.com',
    password: 'password123',
    role: 'recruiter'
  },
  {
    name: 'Candidate User',
    email: 'candidate@test.com',
    password: 'password123',
    role: 'candidate'
  }
];

async function seedTestUsers() {
  try {
    await db.read();
    console.log('📂 Database loaded');

    let created = 0;
    let updated = 0;

    for (const testUser of TEST_USERS) {
      const existingIndex = db.data.users.findIndex(u => u.email === testUser.email);
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testUser.password, salt);
      
      const userData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: testUser.name,
        email: testUser.email,
        password: hashedPassword,
        role: testUser.role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        // Update existing user
        db.data.users[existingIndex] = userData;
        updated++;
        console.log(`🔄 Updated: ${testUser.email} (${testUser.role})`);
      } else {
        // Create new user
        db.data.users.push(userData);
        created++;
        console.log(`✅ Created: ${testUser.email} (${testUser.role})`);
      }
    }

    await db.write();
    console.log('💾 Database saved');

    console.log('\n📋 Test Users Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Email                  | Password     | Role');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const user of TEST_USERS) {
      console.log(`  ${user.email.padEnd(21)} | ${user.password.padEnd(12)} | ${user.role}`);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total: ${created} created, ${updated} updated`);
    console.log('\n🎉 Test users seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding test users:', error.message);
    process.exit(1);
  }
}

seedTestUsers();

