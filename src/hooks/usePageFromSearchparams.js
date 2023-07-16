import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setPage } from "../features/goodsSlice";


export const usePageFromSearchparams = (dispatch) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pageUrl = +searchParams.get('page');

    useEffect(() => {
        dispatch(setPage(pageUrl));
    }, [pageUrl, dispatch])

    return pageUrl;
}