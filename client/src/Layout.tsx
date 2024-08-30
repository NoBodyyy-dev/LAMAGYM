import {Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client"
import {useAppDispatch, useAppSelector} from "./hooks/stateHooks";
import {getMe} from "./store/actions/userActions";
import Header from "./lib/header/Header";
import Aside from "./lib/aside/Aside";
import {setOnlineUsers, setSocketConnection} from "./store/slices/userSlice.ts";

const names: any = {
    "/": "Главная",
    "/auth": "Авторизация",
    "/chat": "Чат"
};

function Layout() {
    const dispatch = useAppDispatch();
    const {token, curUser} = useAppSelector((state) => state.user);
    const location = useLocation();

    const [wrapperClasses, setWrapperClasses] = useState<string[]>(["wrapper"]);

    useEffect(() => {
        token && dispatch(getMe())
    }, [token]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname in names) document.title = names[location.pathname];
        if (location.pathname == "/auth") setWrapperClasses([...wrapperClasses, "flex-to-center", "full"]);
        else setWrapperClasses([...wrapperClasses.slice(0, 1), "flex"]);
    }, [location.pathname]);

    useEffect(() => {
        if (curUser?._id) {
            const socket: Socket = io("http://localhost:3000", {
                auth: {
                    token: localStorage.getItem("token"),
                },
            });

            socket.on("onlineUser", (data) => {
                dispatch(setOnlineUsers(data))
            })
            dispatch(setSocketConnection(socket))
            return () => {
                socket.disconnect()
            }
        }
    }, [curUser?._id])


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
