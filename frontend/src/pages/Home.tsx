import SignupButton from "../components/buttons/Signup";
import ProfileCard from "../components/CardComponent/Card";
import HeadingComponent from "../components/Heading";
import HomeDescription from "../components/HomeDescription";
import Navbarlogin from "../components/Navbarlogin";
import PillComponent from "../components/PillComponent";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-[#030014] px-4 sm:px-8 md:px-16 lg:px-32">
            <Navbarlogin />
            <div className="flex flex-col items-center">
            <PillComponent />
            </div>
            <div className="flex flex-col items-center text-center mt-5">
                <HeadingComponent />
                <div className="mt-6 mb-6">
                    <SignupButton />
                </div>
                <HomeDescription />
            </div>
            <div className="flex flex-col items-center mt-20">
                <ProfileCard/>
            </div>
        </div>
    );
}
