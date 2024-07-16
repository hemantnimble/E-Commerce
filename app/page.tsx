import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p>Landing Page</p>
      <Link href="/signin">
        <button>SignIn</button>
      </Link>
    </main>
  );
}
