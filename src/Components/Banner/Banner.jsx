import { NavLink } from 'react-router-dom';
import { Container } from '../Layout/Container/Container';
import s from './Banner.module.scss';
import { API_URL } from '../../const';
import { useMedia } from 'react-use';
import { useEffect, useState } from 'react';
// const isMobile = useMedia('(max-width: 540px)');
    // const isTablet = useMedia('(max-width: 768px)');
    // const isLaptop = useMedia('(max-width: 1024px)');

    // useEffect(() => {
    //     if (isMobile) {
    //     console.log('Мобильное разрешение');
    //     } else if (isTablet) {
    //     console.log('Разрешение планшета');
    //     } else if (isLaptop) {
    //     console.log('Разрешение ноутбука');
    //     } else {
    //     console.log('Десктопное разрешение');
    //     }
    // };

    // }, [isMobile, isTablet, isLaptop]);
export const Banner = ({data}) => {
    const isMobile = useMedia('(max-width: 540px)');
    const isTablet = useMedia('(max-width: 768px)');
    const isLaptop = useMedia('(max-width: 1024px)');

    const [bgURL, setBgUrl] = useState("");

    useEffect(() => {
            if (isMobile) {
                setBgUrl(`${API_URL}${data?.bg.mobile}`);
            } else if (isTablet) {
                setBgUrl(`${API_URL}${data?.bg.tablet}`);
            } else if (isLaptop) {
                setBgUrl(`${API_URL}${data?.bg.laptop}`);
            } else {
                setBgUrl(`${API_URL}${data?.bg.desktop}`);
            }
    },[isMobile, isTablet, isLaptop, data]);

    return (
        data &&
        <section
            className={s.banner}
            style={{
                backgroundImage: `url(${bgURL})`
            }}>
            <Container>
                <div className={s.content}>
                    <h2 className={s.title}>{data.description}</h2>
                    <NavLink className={s.link} to={`/product/${data.id}`}>
                        Перейти
                    </NavLink>
                </div>
            </Container>
        </section>
    )
};