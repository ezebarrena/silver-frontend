import CreateUser from "../Components/CreateUser";
import DeleteUser from "../Components/DeleteUser";
import GetUsers from "../Components/GetUsers";
import UpdateUser from "../Components/UpdateUser";


function Home(){
    return(
        <div>
            <div className="pagina">
                <CreateUser />
                <GetUsers />
                <UpdateUser />
                <DeleteUser />
            </div>
        </div>
    );
}

export default Home