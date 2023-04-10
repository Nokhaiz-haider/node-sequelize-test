import { DECIMAL, QueryInterface } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    // Create Movies table
    await queryInterface.createTable('Movies', {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: "varchar",
        allowNull: false,
      },
      duration: {
        type: "integer",
        allowNull: false,
      },
      rating: {
        type: "varchar",
        allowNull: false,
      },
    });
  
    // Create Showrooms table
    await queryInterface.createTable('Showrooms', {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: "varchar",
        allowNull: false,
      },
    });
  
    // Create Shows table
    await queryInterface.createTable('Shows', {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      movie_id: {
        type: "integer",
        allowNull: false,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
      showroom_id: {
        type: "integer",
        allowNull: false,
        references: {
          model: 'Showrooms',
          key: 'id',
        },
      },
      start_time: {
        type: "timestamp",
        allowNull: false,
      },
      end_time: {
        type: "timestamp",
        allowNull: false,
      },
      is_booked_out: {
        type: "boolean",
        defaultValue: false,
        allowNull: false,
      },
    });
  
    // Create Seats table
    await queryInterface.createTable('Seats', {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      showroom_id: {
        type: "integer",
        allowNull: false,
        references: {
          model: 'Showrooms',
          key: 'id',
        },
      },
      seat_number: {
        type: "varchar",
        allowNull: false,
      },
      seat_type: {
        type: "varchar",
        allowNull: false,
      },
      is_booked: {
        type: "boolean",
        defaultValue: false,
        allowNull: false,
      },
    });
  
    // Create Pricing table
    await queryInterface.createTable('Pricing', {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      show_id: {
        type: "integer",
        allowNull: false,
        references: {
          model: 'Shows',
          key: 'id',
        },
      },
      price: {
        type: DECIMAL(10, 2),
        allowNull: false,
      },
      premium_percentage: {
        type: DECIMAL(10, 2),
        allowNull: true,
      },
    });
  },
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
