// /app/api/visitors/route.js

import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // 로컬 MongoDB 주소
const client = new MongoClient(uri);
const dbName = "develop-blog";

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("visitors");

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const result = await collection.findOne({ date: today });

    return new Response(JSON.stringify(result || { date: today, count: 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("visitors");

    const today = new Date().toISOString().split("T")[0];

    const result = await collection.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    return new Response(JSON.stringify(result.value), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
