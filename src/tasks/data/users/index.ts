import { hash } from "bcrypt";

export const test_users = [
    {
      name: 'John',
      surname: 'Doe',
      email: 'admin@example.com',
      password: await hash('password123', 10),
      role: 'admin'
    },
    {
      name: 'Jane',
      surname: 'Smith',
      email: 'user@example.com',
      password: await hash('password111',10)
    },
    {
      name: 'Michael',
      surname: 'Johnson',
      email: 'michael.johnson@example.com',
      password: await hash('password789',10)
    },
    {
      name: 'Emily',
      surname: 'Davis',
      email: 'emily.davis@example.com',
      password: await hash('password101',10)
    },
    {
      name: 'David',
      surname: 'Wilson',
      email: 'david.wilson@example.com',
      password: await hash('password102',10),
      role: 'admin'
    },
    {
      name: 'Sarah',
      surname: 'Miller',
      email: 'sarah.miller@example.com',
      password: await hash('password103',10)
    },
    {
      name: 'James',
      surname: 'Brown',
      email: 'james.brown@example.com',
      password: await hash('password104',10)
    },
    {
      name: 'Jessica',
      surname: 'Taylor',
      email: 'jessica.taylor@example.com',
      password: await hash('password105',10),
      role: 'admin'
    },
    {
      name: 'Daniel',
      surname: 'Anderson',
      email: 'daniel.anderson@example.com',
      password: await hash('password106',10)
    },
    {
      name: 'Laura',
      surname: 'Thomas',
      email: 'laura.thomas@example.com',
      password: await hash('password107',10)
    }
  ]