import { Rubik } from "next/font/google";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

const rub = Rubik({
    variable: "--font-Rubik",
    subsets: ["latin"],
});

export default async function Page({ params }) {

    const { handle } = await params
    const client = await clientPromise;
    const db = client.db("LinkTree");
    const collection = db.collection("links");

    // check if handle already exist
    const items = await collection.findOne({ handle })
    if (!items) {
        return notFound();
    }

    return (
        <>

            <div className="w-full min-h-screen flex flex-col items-center justify-start overflow-y-auto p-4">
            <div className="absolute top-0 z-[-2] h-full w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
                {items && (
                    <div className="flex flex-col items-center gap-4 w-full max-w-md">
                        {/* Profile Image */}
                        <div className="h-24 w-24 rounded-full overflow-hidden">
                            <img src={items.pic} alt="profile picture" className="w-full h-full object-cover" />
                        </div>

                        {/* Handle */}
                        <span className={`text-lg font-semibold ${rub.className} text-white`}>
                            @{handle}
                        </span>

                        {/* Description */}
                        <div className={`text-yellow-500 w-full ${rub.className} flex justify-center items-center font-normal text-[15px] text-center`}>
                            <h1> <span className="text-white font-semibold text-xl">Description : </span> {items.description}</h1>
                        </div>

                        {/* Links */}
                        <div className="w-full flex flex-col gap-3">
                            {items.links.map((item, index) => (
                                <Link key={index} href={item.link} target="_blank">
                                    <div className="bg-purple-100 shadow-lg px-4 py-4 w-full flex justify-center items-center rounded-md text-center">
                                        {item.linktext}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}