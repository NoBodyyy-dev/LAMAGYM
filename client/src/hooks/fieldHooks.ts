import {ChangeEvent, Dispatch, SetStateAction, useMemo} from "react";
import {UserData} from "../store/types/userTypes";

export const useSearchUsers = (allUsers: UserData[], search: { query: string }) => {
    return useMemo(() => {
        return [...allUsers].filter((user: any) => {
            return user.username
                .toLowerCase()
                .slice(0, search.query.length)
                .includes(search.query.toLowerCase());
        });
    }, [search.query, allUsers])
}

export const useInput = (
    e: ChangeEvent<HTMLInputElement>,
    data: any,
    setData: Dispatch<SetStateAction<any>>,
    field: string
) => setData({
    ...data,
    [field]: e.target.value
});
