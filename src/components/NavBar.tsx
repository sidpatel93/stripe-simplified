import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import {
  BookOpenIcon,
  CreditCard,
  CreditCardIcon,
  GraduationCap,
  LogOutIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

function NavBar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-background border-b">
      <Link
        href="/"
        className="text-xl font-extrabold text-primary flex items-center gap-2"
      >
        MasterClass <GraduationCap className="size-6" />
      </Link>
      <div className="flex items-center space-x-1 sm:space-x-4">
        <Link
          href={"/courses"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
        >
          <BookOpenIcon className="size-4" />
          <span className="hidden sm:inline">Courses</span>
        </Link>
        <Link
          href={"/pro"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
        >
          <ZapIcon className="size-4" />
          <span className="hidden sm:inline">Pro</span>
        </Link>
        <SignedIn>
          <Link href="/billing">
            <Button variant="outline" className="flex item-center gap-2">
              <CreditCardIcon className="size-4" />
              <span className="hidden sm:inline">Billing</span>
            </Button>
          </Link>
        </SignedIn>

        {/* This is from clerk and only be visible if the user is signed in */}
        <UserButton />
        <SignedIn>
          <SignOutButton>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 text-black"
            >
              <LogOutIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </SignOutButton>
        </SignedIn>

        {/* This is from clerk and it will show the signed in button if the user is signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

export default NavBar;
