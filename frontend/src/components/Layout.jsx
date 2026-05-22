import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/Vertex Digital Tech Repair Logo.png";

const navItems = [
	{ to: "/", label: "Home" },
	{ to: "/login", label: "Login" },
	{ to: "/dash", label: "Dashboard" },
];

const Layout = () => {
	const location = useLocation();

	return (
		<div className="app-shell">
			<header className="site-header">
				<Link className="brand" to="/" aria-label="Vertex Digital home">
					<img src={logo} alt="Vertex Digital Logo" className="brand-mark-img" width="44" height="44" style={{ borderRadius: '14px', objectFit: 'cover' }} />
					<span>
						Vertex <strong>Digital</strong>
					</span>
				</Link>

				<nav className="site-nav" aria-label="Primary">
					{navItems.map((item) => (
						<Link
							key={item.to}
							className={location.pathname === item.to ? "site-nav__link is-active" : "site-nav__link"}
							to={item.to}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</header>

			<main className="page-frame">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
