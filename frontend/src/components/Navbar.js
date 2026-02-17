import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h3>Inventory App</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
