import { test as base } from "@playwright/test";
import * as crypto from "crypto";
import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://localhost:27017";
const DB_NAME = "portfolio";
const TEST_EMAIL = "test@e2e.local";
const TEST_PASSWORD = "testpassword";

function hashPassword(password: string): string {
    const hmac = crypto.createHmac("sha256", "portfolio");
    hmac.update(password);
    return hmac.digest("hex");
}

export const test = base.extend<{ adminUser: { email: string; password: string } }>({
    adminUser: async ({}, use) => {
        const client = new MongoClient(MONGO_URL);
        await client.connect();
        const db = client.db(DB_NAME);
        const users = db.collection("users");

        const hash = hashPassword(TEST_PASSWORD);
        await users.deleteMany({ email: TEST_EMAIL });
        await users.insertOne({ email: TEST_EMAIL, password: hash });

        await use({ email: TEST_EMAIL, password: TEST_PASSWORD });

        await users.deleteMany({ email: TEST_EMAIL });
        await client.close();
    },
});

export { expect } from "@playwright/test";
