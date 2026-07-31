import Image from "next/image";
import Link from "next/link";
import logo from "../../public/unitedlogo.png";

export function Logo() {
  return (
    <Link href="/" aria-label="United Tires and Wheels — home" className="inline-flex items-center">
      <Image
        src={logo}
        alt=""
        priority
        sizes="(min-width: 768px) 72px, 48px"
        className="h-12 w-auto md:h-[72px]"
      />
    </Link>
  );
}
