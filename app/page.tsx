import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <Toaster />
      <p>Landing Page</p>
      <Link href="/signin">
        <button>SignIn</button>
      </Link>
    </main>
  );
}
