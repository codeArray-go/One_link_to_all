import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json()

  const client = await clientPromise;
  const db = client.db("LinkTree");
  const collection = db.collection("links");  

  // check if handle already exist
  const doc = await collection.findOne({handle: body.handle})
  if(doc){
    return Response.json({success: false, message: "This LinkTree already exist", result: null, error: true}) 
  }

  const result = await collection.insertOne(body);

  return Response.json({success: true, message: "Your LinkTree has been generated, Enjoy!", result: result, error: false})
}