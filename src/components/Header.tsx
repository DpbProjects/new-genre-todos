import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import AppLogo from "./icons/AppLogo";

const AppHeader = () => {
  return (
    <header className="h-48 bg-base-gray-700">
      <div className="ml-auto max-w-max p-4 min-h-[4.563rem]">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="flex justify-center items-center  w-full">
        <AppLogo />
      </div>
    </header>
  );
};

export default AppHeader;
