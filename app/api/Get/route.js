import clientPromise from "@/lib/mongodb";

export default async function Get() {
    const client = await clientPromise;
    const db = client.db("LinkTree");
    const collection = db.collection("links");

    const items = await collection.findOne({ handle });
    console.log(items);
    return items;
}