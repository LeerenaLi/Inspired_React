import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as LikeSVG } from '../../assets/heart.svg';
import s from './BtnLik.module.scss';
import { addToFavorite, removeFromFavorite } from '../../features/favoriteSlice';
import cn from 'classnames';

export const BtnLike = ({id}) => {
    const dispatch = useDispatch();
    const isFsvorite = useSelector(state => state.favorites.includes(id));

    const handleToggleFavorite = () => {
        if (isFsvorite) {
            dispatch(removeFromFavorite({id}));
        } else {
            dispatch(addToFavorite({id}));
        }
    }
    return (
        <button
            className={isFsvorite ? cn(s.like, s.active) : s.like}
            aria-label='Добавить в избранное'
            type='button'
            onClick={handleToggleFavorite}
        >
            <LikeSVG />
        </button>
    )
}