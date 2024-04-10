import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./lib/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/stateHooks";
import { getCurrentUserInfoFunc } from "./store/users/userActions";
import Aside from "./lib/Aside/Aside";

const names: any = {
  "/": "Главная",
  "/auth": "Авторизация",
};

function Layout() {
  const dispatch = useAppDispatch();
  let { token, curUser } = useAppSelector((state) => state.user);
  const location = useLocation();

  const [wrapperClasses, setWrapperClasses] = useState<string[]>(["wrapper"]);

  useEffect(() => {
    const authPeriod = setInterval(() => {
      if (token) dispatch(getCurrentUserInfoFunc(token));
    }, 10 * 60000);

    return () => clearInterval(authPeriod);
  }, []);

  useEffect(() => {
    if (token) dispatch(getCurrentUserInfoFunc(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (location.pathname in names) {
      document.title = names[location.pathname];
    }

    if (location.pathname == "/auth") {
      setWrapperClasses([...wrapperClasses, "flex-to-center", "full"]);
    } else {
      setWrapperClasses([...wrapperClasses.slice(0, 1), "flex"]);
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname === "/auth" ? (
        <div className={wrapperClasses.join(" ")}>
          <Outlet />
        </div>
      ) : (
        <>
          <Header />
          <div className={wrapperClasses.join(" ")}>
            {curUser!.id && <Aside />}
            <main className={`main ${curUser!.id && "auth-user"}`}>
              <Outlet />
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default Layout;
