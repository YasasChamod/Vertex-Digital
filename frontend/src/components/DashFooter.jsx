import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
	const { username, status } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const { pathname } = location;

	const onGoHomeClicked = () => navigate('/dash');

	let goHomeButton = null;
	if (pathname !== '/dash') {
		goHomeButton = (
			<button className="icon-button" title="Home" onClick={onGoHomeClicked}>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		);
	}

	const content = (
		<footer className="dash-footer">
			{goHomeButton}
			<p className="dash-footer__status">Current User: <strong>{username}</strong> | Status: <strong>{status}</strong></p>
			<p className="dash-footer__copyright">&copy; 2026 Vertex Digital. All Rights Reserved.</p>
		</footer>
	);
	return content;
}
export default DashFooter;

