import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import s from './ErrorPage.module.scss';
import { Container } from "../Layout/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchColors } from "../../features/colorSlice";
import { fetchNavigation } from "../../features/navigationSlice";

export const ErrorPage = () => {
    const routeError = useRouteError();
    const { status } = useSelector(state => state.statusServer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const timeIdRef = useRef(null);

    useEffect(() => {
        if (status && location.pathname === '/404') {
            navigate('/');
        }
    }, [status, location, navigate]);

    useEffect(() => {
        if (!status && location.pathname === '/404') {
            clearInterval(timeIdRef.current);

            timeIdRef.current = setInterval(() => {
                dispatch(fetchColors());
                dispatch(fetchNavigation());
            }, 3000)
        }

        return () => {
            clearInterval(timeIdRef.current);
        }
    }, [dispatch, status, location])

    return (
        <Container>
        <div className={s.error}>
            <h2 className={s.title}>Произошла ошибка, попробуйте позже...</h2>
            <p className={s.message}>{routeError?.message ?? 'Неизвестная ошибка'}</p>
        </div>
        </Container>
    )
}