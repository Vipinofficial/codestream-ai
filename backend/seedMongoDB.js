/**
 * Seed script to populate MongoDB with test users and questions
 * Usage: node seedMongoDB.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Import models
import User from './models/User.js';
import MCQQuestion from './models/MCQQuestion.js';
import CodingQuestion from './models/CodingQuestion.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://UKRider:nSZl4PKCSmloG2z6@edusphere-ai.dvrwbo8.mongodb.net/codestream?retryWrites=true&w=majority';

// Test Users
const TEST_USERS = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'Recruiter User',
    email: 'recruiter@test.com',
    password: 'password123',
    role: 'recruiter',
  },
  {
    name: 'Candidate User',
    email: 'candidate@test.com',
    password: 'password123',
    role: 'candidate',
  },
];

// Sample MCQ Questions
const MCQ_QUESTIONS = [
  {
    question: 'What is the output of typeof null in JavaScript?',
    options: [
      { text: 'null', isCorrect: false },
      { text: 'undefined', isCorrect: false },
      { text: 'object', isCorrect: true },
      { text: 'number', isCorrect: false },
    ],
    category: 'javascript',
    difficulty: 'easy',
    explanation: 'This is a known bug in JavaScript that has been preserved for backward compatibility. typeof null returns "object".',
    points: 10,
  },
  {
    question: 'Which method is used to add an element to the end of an array?',
    options: [
      { text: 'unshift()', isCorrect: false },
      { text: 'shift()', isCorrect: false },
      { text: 'push()', isCorrect: true },
      { text: 'pop()', isCorrect: false },
    ],
    category: 'javascript',
    difficulty: 'easy',
    explanation: 'push() adds one or more elements to the end of an array and returns the new length.',
    points: 10,
  },
  {
    question: 'What is the time complexity of binary search?',
    options: [
      { text: 'O(n)', isCorrect: false },
      { text: 'O(log n)', isCorrect: true },
      { text: 'O(n log n)', isCorrect: false },
      { text: 'O(1)', isCorrect: false },
    ],
    category: 'algorithms',
    difficulty: 'medium',
    explanation: 'Binary search divides the search space in half each time, giving O(log n) complexity.',
    points: 15,
  },
  {
    question: 'What is a closure in JavaScript?',
    options: [
      { text: 'A way to close the browser', isCorrect: false },
      { text: 'A function that has access to variables in its outer scope', isCorrect: true },
      { text: 'A method to end a loop', isCorrect: false },
      { text: 'A type of error', isCorrect: false },
    ],
    category: 'javascript',
    difficulty: 'medium',
    explanation: 'A closure is a function that remembers the variables from its lexical scope even when executed outside that scope.',
    points: 15,
  },
  {
    question: 'What does SQL stand for?',
    options: [
      { text: 'Structured Query Language', isCorrect: true },
      { text: 'Simple Question Language', isCorrect: false },
      { text: 'Standard Query Logic', isCorrect: false },
      { text: 'System Quality Language', isCorrect: false },
    ],
    category: 'sql',
    difficulty: 'easy',
    explanation: 'SQL stands for Structured Query Language, used for managing and manipulating relational databases.',
    points: 10,
  },
];

// Sample Coding Questions
const CODING_QUESTIONS = [
  {
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    category: 'data-structures',
    difficulty: 'easy',
    constraints: '2 <= nums.length <= 10^4',
    starterCode: `function twoSum(nums, target) {
  // Your code here
}`,
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]', isHidden: false },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]', isHidden: false },
      { input: '[3,3], 6', expectedOutput: '[0,1]', isHidden: true },
    ],
    timeLimit: 15,
    points: 100,
    tags: ['array', 'hash-table'],
  },
  {
    title: 'Palindrome Number',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same forward and backward.

Example:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.`,
    category: 'algorithms',
    difficulty: 'easy',
    constraints: '-2^31 <= x <= 2^31 - 1',
    starterCode: `function isPalindrome(x) {
  // Your code here
}`,
    testCases: [
      { input: '121', expectedOutput: 'true', isHidden: false },
      { input: '-121', expectedOutput: 'false', isHidden: false },
      { input: '10', expectedOutput: 'false', isHidden: false },
      { input: '0', expectedOutput: 'true', isHidden: true },
    ],
    timeLimit: 15,
    points: 100,
    tags: ['math', 'two-pointers'],
  },
  {
    title: 'Valid Parentheses',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example:
Input: s = "()[]{}"
Output: true`,
    category: 'data-structures',
    difficulty: 'medium',
    constraints: '1 <= s.length <= 10^4',
    starterCode: `function isValid(s) {
  // Your code here
}`,
    testCases: [
      { input: '"()"', expectedOutput: 'true', isHidden: false },
      { input: '"()[]{}"', expectedOutput: 'true', isHidden: false },
      { input: '"(]"', expectedOutput: 'false', isHidden: false },
      { input: '"([)]"', expectedOutput: 'false', isHidden: true },
      { input: '"{[]}"', expectedOutput: 'true', isHidden: true },
    ],
    timeLimit: 20,
    points: 150,
    tags: ['stack', 'string'],
  },
  {
    title: 'FizzBuzz',
    description: `Write a program that outputs the numbers from 1 to n. For multiples of 3, output "Fizz" instead of the number. For multiples of 5, output "Buzz". For multiples of both 3 and 5, output "FizzBuzz".

Example:
n = 5
Output: 1, 2, Fizz, 4, Buzz`,
    category: 'algorithms',
    difficulty: 'easy',
    constraints: '1 <= n <= 100',
    starterCode: `function fizzBuzz(n) {
  // Your code here
}`,
    testCases: [
      { input: '3', expectedOutput: '["1","2","Fizz"]', isHidden: false },
      { input: '5', expectedOutput: '["1","2","Fizz","4","Buzz"]', isHidden: false },
      { input: '15', expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', isHidden: true },
    ],
    timeLimit: 10,
    points: 50,
    tags: ['math', 'string'],
  },
  {
    title: 'Reverse Linked List',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

A linked list can be reversed either iteratively or recursively.

Example:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]`,
    category: 'data-structures',
    difficulty: 'medium',
    constraints: 'The number of nodes in the list is in the range [0, 5000]',
    starterCode: `// Definition for singly-linked list.
// function ListNode(val, next) {
//   this.val = (val===undefined ? 0 : val)
//   this.next = (next===undefined ? null : next)
// }

function reverseList(head) {
  // Your code here
}`,
    testCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isHidden: false },
      { input: '[1,2]', expectedOutput: '[2,1]', isHidden: false },
      { input: '[]', expectedOutput: '[]', isHidden: false },
    ],
    timeLimit: 25,
    points: 200,
    tags: ['linked-list', 'recursion'],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await MCQQuestion.deleteMany({});
    await CodingQuestion.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Users
    console.log('\n👤 Seeding users...');
    for (const userData of TEST_USERS) {
      // Let the User model's pre-save hook handle password hashing
      await User.create(userData);
      console.log(`   ✅ ${userData.email} (${userData.role})`);
    }

    // Seed MCQ Questions
    console.log('\n📝 Seeding MCQ questions...');
    for (const q of MCQ_QUESTIONS) {
      await MCQQuestion.create(q);
      console.log(`   ✅ ${q.category}: ${q.question.substring(0, 50)}...`);
    }

    // Seed Coding Questions
    console.log('\n💻 Seeding coding questions...');
    for (const q of CODING_QUESTIONS) {
      await CodingQuestion.create(q);
      console.log(`   ✅ ${q.difficulty}: ${q.title}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Database seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Users: ${TEST_USERS.length}`);
    console.log(`MCQ Questions: ${MCQ_QUESTIONS.length}`);
    console.log(`Coding Questions: ${CODING_QUESTIONS.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🔑 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Email                  | Password     | Role');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    for (const user of TEST_USERS) {
      console.log(`  ${user.email.padEnd(21)} | ${user.password.padEnd(12)} | ${user.role}`);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();

