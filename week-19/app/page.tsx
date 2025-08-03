import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="text-lg w-screen h-screen flex items-center justify-center">
			<div>
				Todo application
				<br />
				<Link
					href="/signin"
					className="border bg-sky-700 text-md m-4 p-4 rounded-xl"
				>
					Sign in
				</Link>
				<br />
				<Link
					href="/signup"
					className="border bg-sky-700 text-md m-4 p-4 rounded-xl"
				>
					Sign up
				</Link>
			</div>
		</div>
	);
}
