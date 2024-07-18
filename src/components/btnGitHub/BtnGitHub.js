import "./stule.css";
import gitHubIcon from "./gitHub-black.svg";

const BtnGitHub = ({ link, label = "GitHub repo" }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <img src={gitHubIcon} alt="" />
            {label}
        </a>
    );
};

export default BtnGitHub;
