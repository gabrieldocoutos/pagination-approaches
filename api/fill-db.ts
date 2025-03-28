import { faker } from "@faker-js/faker";
import sqlite from "sqlite3";
import { join, dirname } from "path";

const sqlite3 = sqlite.verbose();

const DB_PATH = join(dirname("."), "database.db");

const db = new sqlite3.Database(DB_PATH, (err) => {
	if (err) {
		console.error("Error opening database", err.message);
	} else {
		console.log("Connected to the SQLite database.");
	}
});

for (let i = 0; i < 15000; i++) {
	const randomName = faker.person.fullName(); // Rowan Nikolaus
	const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
	const randomAvatarUrl = faker.image.avatar(); // https://i.pravatar.cc/150?img=1
	console.log({ randomEmail, randomName });

	const query = "INSERT INTO users (name, email, avatar_url) VALUES (?, ?, ?)";
	db.run(query, [randomName, randomEmail, randomAvatarUrl], function (err) {
		if (err) {
			console.log({ err });
		}
		console.log({ id: this.lastID, randomName, randomEmail });
	});
}
