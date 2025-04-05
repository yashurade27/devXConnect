const ProfilePicture = () => {
  return (
    <div className="w-[100x] h-[60px] rounded-full overflow-hidden shadow-lg">
      <img
        src="/profileBulk.png" // Ensure it's in the public folder
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfilePicture;
