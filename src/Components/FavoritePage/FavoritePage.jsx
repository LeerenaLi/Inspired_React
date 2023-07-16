import { useDispatch, useSelector } from "react-redux"
import { Goods } from "../Goods/Goods"
import { useEffect } from "react";
import { fetchCategory } from "../../features/goodsSlice";
import { usePageFromSearchparams } from "../../hooks/usePageFromSearchparams";
import s from './FavoritePage.module.scss';

export const FavoritePage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const page =  usePageFromSearchparams(dispatch);

    useEffect(() => {
        if (favorites) {
            const param = {list: favorites};
            if (page) {
                param.page = page;
            }
            dispatch(fetchCategory(param));
        }
        
    }, [favorites, page, dispatch]);

    return (
        favorites.length ?
        <Goods title="Избранное" />
        :
        <h3 className={s.empty}>Вы ничего не добавили в избранное</h3>
    )
}