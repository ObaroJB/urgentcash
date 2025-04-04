import Image from "next/image"
import Link from "next/link"
export default function Profile() {
      return(
        <main className="min-h-screen flex justify-center py-4 md:py-6 md:px-12 lg:py-8 lg:px-16 bg-gray-100">
          <div className="w-full md:w-[380px] flex flex-col gap-4 border border-gray-200 rounded-md bg-gray-50 p-2 md:p-6">
          <div className="flex justify-center">
          <Image
          src="/image.webp"
          height={80}
          width={80}
          alt="profile image"
          className="w-[80px] h-[80px] rounded-full"/>
          </div>
            <p className="text-center py-3 border-b border-gray-200">Winston Obaro Omadhebor</p>
            <p className="text-center py-3 border-b border-gray-200">sobaroda91@gmail.com</p>
            <p className="text-center py-3 border-b border-gray-200">UC-4216</p>
            <Link href="#" className="bg-gray-300 rounded-md text-lg text center p-2">Update Profile</Link>
          </div>

        </main>
      )

}