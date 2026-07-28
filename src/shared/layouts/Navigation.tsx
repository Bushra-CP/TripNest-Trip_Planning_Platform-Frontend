import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Plan",
    path: "/",
  },
  {
    name: "Connect",
    path: "/explore",
  },
];

const Navigation = () => {
  return (
    <nav className="hidden lg:flex items-center gap-7">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `text-sm font-semibold transition-colors ${
              isActive ? "text-[#6c63ff]" : "text-gray-600 hover:text-[#6c63ff]"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
