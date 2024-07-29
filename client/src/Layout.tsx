import {Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client"
import {useAppDispatch, useAppSelector} from "./hooks/stateHooks";
import {getMe} from "./store/actions/userActions";
import Header from "./lib/header/Header";
import Aside from "./lib/aside/Aside";

const names: any = {
    "/": "Главная",
    "/auth": "Авторизация",
};

function Layout() {
    const dispatch = useAppDispatch();
    const {token, curUser} = useAppSelector((state) => state.user);
    const location = useLocation();

    const [wrapperClasses, setWrapperClasses] = useState<string[]>(["wrapper"]);
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        token && dispatch(getMe())
    }, [token]);

    useEffect(() => {
        if (location.pathname in names) document.title = names[location.pathname];
        if (location.pathname == "/auth") setWrapperClasses([...wrapperClasses, "flex-to-center", "full"]);
        else setWrapperClasses([...wrapperClasses.slice(0, 1), "flex"]);
    }, [location.pathname]);

    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [curUser]);

    useEffect(() => {
        if (!socket) return
        socket.emit("")
    }, [socket]);

    return (
        <>
            {location.pathname === "/auth" ? (
                <div className={wrapperClasses.join(" ")}>
                    <Outlet/>
                </div>
            ) : (
                <>
                    <Header/>
                    <div className={wrapperClasses.join(" ")}>
                        {curUser!._id && <Aside/>}
                        <main className={`main ${curUser!._id && "auth-user"}`}>
                            <Outlet/>
                        </main>
                    </div>
                </>
            )}
        </>
    );
}

export default Layout;
