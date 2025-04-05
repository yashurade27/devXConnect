
import GuestLogin from "./buttons/GuestLogin";

import Logo from "./Logo";
import SigninButton from './buttons/Signin';

export function Navbarlogin() {
  return (
    <div className="box-border flex justify-between items-center px-8 py-4 bg-[#030014] shadow-md rounded-lg w-full h-[60px] fixed top-0 left-0 border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-6">
        <GuestLogin />
        <SigninButton/>
      </div>
    </div>
  );
}

export default Navbarlogin;