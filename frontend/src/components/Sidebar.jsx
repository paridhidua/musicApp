import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 15px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
    background: isActive ? "#2c2c2e" : "transparent",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <aside
      style={{
        width: "220px",
        background: "#1c1c1e",
        padding: "20px",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h2>🎵 My Music</h2>

      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          <li style={{ margin: "15px 0" }}>
            <NavLink to="/" style={linkStyle}>
              🏠 Home
            </NavLink>
          </li>

          <li style={{ margin: "15px 0" }}>
            <NavLink to="/albums" style={linkStyle}>
              💿 Albums
            </NavLink>
          </li>

          <li style={{ margin: "15px 0" }}>
            <NavLink to="/playlists" style={linkStyle}>
              📂 Playlists
            </NavLink>
          </li>

          <li style={{ margin: "15px 0" }}>
            <NavLink to="/favorites" style={linkStyle}>
              ❤️ Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;