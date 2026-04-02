import Logo from "../../assets/svgs/logo.svg";
import Link from "next/link";

export const Nav: React.FC = () => (
  <nav className="flex justify-between items-center my-4 container">
    <Link href="/">
      <Logo className="w-8" />
    </Link>
    <ul className="flex">
      <li>
        <Link href="/work" className="text-blue-700 mr-2 px-2 py-1 rounded-md">
          Work
        </Link>
      </li>
    </ul>
  </nav>
);
