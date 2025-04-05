import Logo from "./Logo";
export function NavbarProfileView() {
  return (
    <div className="box-border flex justify-between items-center px-8 py-4 bg-[#030014] shadow-md rounded-lg w-full h-[60px] fixed top-0 left-0 border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>
    </div>
  );
}

export default NavbarProfileView;