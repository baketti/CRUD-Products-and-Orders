import { Product } from "../../db/models/Product";
import { User } from "../../db/models/User";
import { initStruct } from "../../db/init-struct";
import { hash } from "bcrypt";

(async() => {
    await initStruct();
    await Product.bulkCreate([
        {
            name: 'Tour of Paris',
            price: 1299.99,
            description: '7-day guided tour of Paris, including visits to the Eiffel Tower, Louvre Museum, and more.',
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-06-07')
        },
        {
            name: 'Caribbean Cruise',
            price: 1999.99,
            description: '10-day luxury Caribbean cruise with stops at multiple islands, including Barbados and St. Lucia.',
            startDate: new Date('2024-07-10'),
            endDate: new Date('2024-07-20')
        },
        {
            name: 'Safari in Kenya',
            price: 3499.99,
            description: '8-day safari adventure in Kenya, with game drives and accommodations in luxury lodges.',
            startDate: new Date('2024-08-05'),
            endDate: new Date('2024-08-13')
        },
        {
            name: 'Tokyo and Kyoto Tour',
            price: 2599.99,
            description: '10-day tour of Japan, including Tokyo, Kyoto, and Mount Fuji.',
            startDate: new Date('2024-09-15'),
            endDate: new Date('2024-09-25')
        },
        {
            name: 'Alaskan Wilderness Cruise',
            price: 2899.99,
            description: '7-day cruise through the Alaskan wilderness, including glacier tours and wildlife sightings.',
            startDate: new Date('2024-06-20'),
            endDate: new Date('2024-06-27')
        },
        {
            name: 'Italian Riviera Escape',
            price: 1799.99,
            description: '5-day escape to the Italian Riviera, featuring stays in Cinque Terre and Portofino.',
            startDate: new Date('2024-05-10'),
            endDate: new Date('2024-05-15')
        },
        {
            name: 'Australian Outback Adventure',
            price: 3299.99,
            description: '12-day adventure in the Australian Outback, including visits to Uluru and the Great Barrier Reef.',
            startDate: new Date('2024-11-01'),
            endDate: new Date('2024-11-12')
        },
        {
            name: 'Greek Island Hopping',
            price: 2399.99,
            description: '9-day island hopping tour in Greece, with visits to Mykonos, Santorini, and Crete.',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-07-10')
        },
        {
            name: 'Explore Iceland',
            price: 2799.99,
            description: '7-day tour of Iceland, including the Golden Circle, Blue Lagoon, and northern lights.',
            startDate: new Date('2024-10-05'),
            endDate: new Date('2024-10-12')
        },
        {
            name: 'Historic Egypt Tour',
            price: 2499.99,
            description: '8-day tour of Egypt, including the Pyramids of Giza, Nile cruise, and temples of Luxor.',
            startDate: new Date('2024-09-01'),
            endDate: new Date('2024-09-09')
        }
    ])
    await User.bulkCreate([
        {
          name: 'John',
          surname: 'Doe',
          email: 'john.doe@example.com',
          password: await hash('password123', 10),
          role: 'admin'
        },
        {
          name: 'Jane',
          surname: 'Smith',
          email: 'jane.smith@example.com',
          password: await hash('password456',10)
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
      ]);
   }
)();