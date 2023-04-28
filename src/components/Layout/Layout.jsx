import { NavLink, Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <header className="header">
        <nav className="headerNav">
          <NavLink
            className={({ isActive }) =>
              isActive ? "tweetsLink animate-pulse" : "tweetsLink"
            }
            to="/tweets"
            state={{ from: location }}>
            Tweets
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <section className="mainSection">
          <Outlet />
        </section>
      </main>
    </>
  );
};
