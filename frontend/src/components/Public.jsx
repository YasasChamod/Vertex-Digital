import { Link } from "react-router-dom";
const highlights = [
    {
        title: "Fast turnarounds",
        text: "Most repairs are diagnosed quickly so you can get back to work with less downtime.",
    },
    {
        title: "Clear communication",
        text: "You get straightforward updates, simple pricing, and no confusing tech jargon.",
    },
    {
        title: "Trusted local care",
        text: "Friendly service from a neighborhood repair shop that treats every device carefully.",
    },
];

const Public = () => {
    return (
        <main className="public-page">
            <section className="public-shell">
                <div className="public-hero">
                    <div className="public-copy fade-in" style={{ animationDelay: '0.1s' }}>
                        <p className="public-eyebrow">Local device repair made simple</p>
                        <h1>
                            Welcome to <span className="nowrap">Vertex Digital!</span>
                        </h1>
                        <p className="public-lead">
                            Based in Foo City, we help keep phones, laptops, and everyday tech running
                            smoothly with honest service and quick support.
                        </p>

                        <div className="public-actions">
                            <Link className="public-button public-button--primary" to="/login">
                                Login
                            </Link>
                            <a className="public-button public-button--ghost" href="tel:+15555555555">
                                Call (555) 555-5555
                            </a>
                        </div>

                        <ul className="public-badges" aria-label="Business highlights">
                            <li>Same-day diagnosis</li>
                            <li>Friendly support</li>
                            <li>Upfront pricing</li>
                        </ul>
                    </div>

                    <aside className="public-card public-contact-card fade-in" style={{ animationDelay: '0.2s' }}>
                        <p className="public-card-label">Visit the shop</p>
                        <h2>Vertex Digital</h2>
                        <address>
                            555 Foo Drive
                            <br />
                            Foo City, CA 12345
                            <br />
                            <a href="tel:+15555555555">(555) 555-5555</a>
                        </address>

                        <div className="public-divider" />

                        <div className="public-hours">
                            <p>Hours</p>
                            <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
                            <span>Saturday: 9:00 AM - 2:00 PM</span>
                            <span>Sunday: Closed</span>
                        </div>
                    </aside>
                </div>

                <section className="public-grid" aria-label="Service highlights">
                    {highlights.map((item, index) => (
                        <article className="public-card public-feature-card slide-up hover-scale" style={{ animationDelay: `${0.3 + (index * 0.1)}s` }} key={item.title}>
                            <p className="public-card-label">Why people choose us</p>
                            <h2>{item.title}</h2>
                            <p>{item.text}</p>
                        </article>
                    ))}
                </section>

                <section className="public-footer-panel">
                    <div>
                        <p className="public-card-label">Owner</p>
                            <h2>Yasas Chamod</h2>
                    </div>
                    <p>
                        If you need help right away, call the shop and we will point you toward the
                        fastest next step.
                    </p>
                </section>
            </section>
        </main>
    );
};

export default Public;