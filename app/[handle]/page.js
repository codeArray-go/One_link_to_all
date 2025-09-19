import { Rubik } from "next/font/google";
import { notFound } from "next/navigation"; 
import Image from "next/image";

const rub = Rubik({
    variable: "--font-Rubik",
    subsets: ["latin"],
});

// Next.js function to generate dynamic metada for page head
export async function generateMetadata({ params }) {
    const { handle } = await params;

    return {
        title: `@${handle}'s profile`,
        description: `View the Profile of ${handle}`, 
    };
}

// Helper function to fetch data from backend
async function getProfileData(handle) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getData/${handle}`, {
            cache: 'no-cache'  // This will provide fresh data on every refresh
        });

        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data.user;
    } catch (err) {
        console.error("Failed to fetch profile data:", err);
        return null;
    }
}

export default async function Page({ params }) {

    const { handle } = await params;
    const user = await getProfileData(handle)

    if (!user) {
        notFound();
    }

    return (

        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-start overflow-y-auto pt-24">
                <div className="flex flex-col items-center gap-3 w-full max-w-md">

                    {/* Profile Image */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                        <Image
                            src={user.picture || '/default-avatar.png'} // Use a default image if none is provided
                            alt={`${user.username}'s profile picture`}
                            fill
                            style={{objectFit: "cover"}}
                            priority // Prioritize loading the profile picture
                        />
                    </div>

                    {/* Handle */}
                    <span className={`text-2xl NunitoEB font-semibold ${rub.className}`}>
                        @{user.handle}
                    </span>

                    {/* Description */}
                    <div className={`text-gray-600 text-lg w-full ${rub.className} flex justify-center items-center font-normal text-center`}>
                        <h1>{user.description}</h1>
                    </div>

                    {/* Links */}
                    <div className="w-full flex flex-col gap-3">
                        {user.links && user.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank" // Open link in a new tab
                                rel="noopener noreferrer" // Security best practice for external links
                                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 shadow-lg px-5 py-3 w-full flex justify-center items-center rounded-lg text-center text-white font-medium"
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}
