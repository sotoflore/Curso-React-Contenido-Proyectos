import { NavLink } from "react-router";

// Define cada ítem del menú
type NavItem = {
    to: string;
    label: string;
    end?: boolean;
};

const navItems: NavItem[] = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/profile", label: "Profile" },
    { to: "/admin/products/product1/123", label: "Product 1" },
];

// Funciones utilitarias para clases y estilos
const getNavClass = (isActive: boolean) =>
    `nav-link p-2 ${isActive ? "active bg-secondary" : "text-secondary"}`;

const getNavStyle = (isActive: boolean) => ({
    color: isActive ? "salmon" : "black",
});

const AdminNavbar = () => {
    return (
        <nav>
            <ul className="nav nav-underline">
                {navItems.map(({ to, label, end }, index) => (
                    <li
                        className="nav-item"
                        key={index}
                    >
                        <NavLink
                            to={to}
                            end={end}
                            className={({ isActive }) => getNavClass(isActive)}
                            style={({ isActive }) => getNavStyle(isActive)}
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AdminNavbar;


/* import { NavLink } from "react-router"


const AdminNavbar = () => {
  return (
      <nav className="admin-navbar">
          <ul className="nav nav-pills">
              <li className="nav-item">
                  <NavLink
                      to='/admin'
                      //className="nav-link"
                      end
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >Dashboard</NavLink>
              </li>
              <li>
                  <NavLink
                      to='/admin/profile'
                      //className="nav-link"
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >Profile</NavLink>
              </li>
          </ul>
    </nav>
  )
}

export default AdminNavbar */