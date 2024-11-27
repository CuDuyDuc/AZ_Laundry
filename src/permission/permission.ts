import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";

export const useRole = () => {
    const user = useSelector(authSelector);
    const isUser = user?.role_id?.name_role === "user";
    const isShop = user?.role_id?.name_role === "shop";
    const isAdmin = user?.role_id?.name_role === "admin";
    return { isUser, isShop, isAdmin };
};

