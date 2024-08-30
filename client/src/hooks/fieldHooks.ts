import {ChangeEvent, Dispatch, SetStateAction, useMemo} from "react";
import {UserData} from "../store/types/userTypes";

export const useSearchUsers = (allUsers: UserData[], search: { query: string }) => useMemo(() => {
    return [...allUsers].filter((user: UserData) => {
        return user.username!
            .toLowerCase()
            .slice(0, search.query.length)
            .includes(search.query.toLowerCase());
    });
}, [search.query, allUsers])

export const useSearchTags = (tags: string[], query: string) => useMemo(() => [...tags].filter((tag: string) => {
    return tag
        .toLowerCase()
        .slice(0, query.length)
        .includes(query.toLowerCase())
}), [query, tags])

export const useInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: object,
    setData: Dispatch<SetStateAction<never | object>>,
    field: string
) => setData({
    ...data,
    [field]: e.target.value
});

export const useUnique = (array: Array<string | never>) => Array.from(new Set([...array]))
