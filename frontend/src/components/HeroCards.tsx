import designerImage from "../assets/Designer.jpeg"

export const HeroCards=()=>{
    return (
        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
            <img src={designerImage} alt="Designer"
            className="rounded-xl w-85 h-auto"
            />
        </div>
    );
};