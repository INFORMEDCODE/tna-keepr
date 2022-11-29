import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const UnprotectedPage = () => {
    return (
        <div className="h-full">
            <Header />
            <Sidebar />
        </div>
    );
};

export default UnprotectedPage;
