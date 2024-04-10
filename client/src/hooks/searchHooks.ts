import { useMemo } from "react";
import { USER_DATA } from "../store/users/USER_TYPES";

export const useSearchUsers = (allUsers: USER_DATA[], search: { query: string }) => {
    const searchUsers = useMemo(() => {
        return [...allUsers].filter((user: any) => {
            return user.username
                .toLowerCase()
                .slice(0, search.query.length)
                .includes(search.query.toLowerCase());
        });
    }, [search.query, allUsers]);

    return searchUsers
}