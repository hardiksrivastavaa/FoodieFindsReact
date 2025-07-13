
import { useContext, useState } from "react";
import UserContext from "../../../utils/UserContext";

const User = () => {

    const { loggedInUser, setUserName } = useContext(UserContext);
    const [newUser, setNewUser] = useState(loggedInUser);

    return (

<div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="p-4 shadow-sm rounded">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter User Name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button
          className="btn btn-success w-1/2 d-block mx-auto"
          onClick={() => setUserName(newUser)}
        >
          Update
        </button>
      </div>
    </div>
  </div>
</div>

    );
};

export default User;
