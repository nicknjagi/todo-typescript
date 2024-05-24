// 'use client'
import ActiveTask from "@/components/ActiveTask"
import TodosModal from "@/components/modals/TodosModal";
import Link from "next/link";
import { auth } from "@/auth";
import CalendarModal from "@/components/modals/CalendarModal";


export default async function Home() {
  const session = await auth()
  
	return (
		<section className="py-8 md:py-10 max-w-screen-2xl mx-auto">
      <div>{session?.user ? (
            <Link href={"/api/auth/signout?callbackUrl=/"}>Logout</Link>
          ) : (
            <Link href={"/api/auth/signin"}>Login</Link>
          )}</div>
			<div className="flex gap-3">
        <TodosModal />
        <CalendarModal />
      </div>

      <ActiveTask />
		</section>
	);
}
