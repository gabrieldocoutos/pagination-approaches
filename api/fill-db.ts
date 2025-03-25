import { faker } from '@faker-js/faker';
import sqlite from 'sqlite3'
import { join, dirname } from 'path'

const sqlite3 = sqlite.verbose();

const DB_PATH = join(dirname("."), "database.db");


const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error("Error opening database", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });

for (let i = 0; i< 5000; i++) {

    const randomName = faker.person.fullName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    console.log({ randomEmail, randomName })

    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.run(query, [randomName, randomEmail], function (err) {
        if (err) {
            console.log({ err })
        }
        console.log({ id: this.lastID, randomName, randomEmail });
    });
    
}


