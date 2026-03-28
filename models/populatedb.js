const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    TRUNCATE TABLE games_genres, games_developers, games, developers, genres RESTART IDENTITY CASCADE;

    INSERT INTO games (title, release_date, rating)
    VALUES
        ('The Witcher 3', '2015-05-19', 95),
        ('Red Dead Redemption 2', '2018-10-26', 98),
        ('Claire Obscure: Expedition 33', '2025-04-24', 96),
        ('Battlefield 6', '2025-10-10', 83),
        ('ARC Raiders', '2025-10-25', 86);

    INSERT INTO developers (company_name, country, year_founded)
    VALUES
        ('CD PROJECT RED', 'Poland', 2002),
        ('Rockstar Games', 'USA', 1998),
        ('Sandfall Interactive', 'France', 2020),
        ('DICE', 'Sweden', 1992),
        ('Embark Studios', 'Sweden', 2018);

    INSERT INTO genres (genre_name)
    VALUES
        ('RPG'),
        ('Action adventure'),
        ('JRPG'),
        ('Shooter'),
        ('Extraction shooter');

    INSERT INTO games_genres (game_id, genre_id)
    VALUES
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5);

    INSERT INTO games_developers (game_id, developer_id)
    VALUES
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false,
  });
  await client.connect();

  await client.query(
    `TRUNCATE TABLE games, games_developers, games_genres, developers, genres RESTART IDENTITY CASCADE;`,
  );
  await client.query(`INSERT INTO games (title, release_date, rating)
                        VALUES
                            ('The Witcher 3', '2015-05-19', 95),
                            ('Red Dead Redemption 2', '2018-10-26', 98),
                            ('Claire Obscure: Expedition 33', '2025-04-24', 96),
                            ('Battlefield 6', '2025-10-10', 83),
                            ('ARC Raiders', '2025-10-25', 86);`);
  await client.query(`INSERT INTO developers (company_name, country, year_founded)
                        VALUES
                            ('CD PROJECT RED', 'Poland', 2002),
                            ('Rockstar Games', 'USA', 1998),
                            ('Sandfall Interactive', 'France', 2020),
                            ('DICE', 'Sweden', 1992),
                            ('Embark Studios', 'Sweden', 2018);`);
  await client.query(`INSERT INTO genres (genre_name)
                        VALUES
                            ('RPG'),
                            ('Action adventure'),
                            ('JRPG'),
                            ('Shooter'),
                            ('Extraction shooter');`);
  await client.query(`INSERT INTO games_genres (game_id, genre_id)
                        VALUES
                            (1, 1),
                            (2, 2),
                            (3, 3),
                            (4, 4),
                            (5, 5);`);
  await client.query(`INSERT INTO games_developers (game_id, developer_id)
    VALUES
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5);`);

  await client.end();
  console.log("done");
}

main();
