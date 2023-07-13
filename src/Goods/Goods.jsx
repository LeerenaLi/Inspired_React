import { useSelector } from "react-redux";
import s from './Goods.module.scss';
import { Container } from '../Components/Layout/Container/Container.jsx';
import { Product } from '../Components/Product/Product.jsx';

export const Goods = ({categoryData}) => {
    const { goodsList } = useSelector(state => state.goods);
    

    const title = categoryData?.title ?? 'Новинки';

    return (
        <section className={s.goods}>
            <Container>
                <h2 className={s.title}>{title}</h2>
                <ul className={s.list}>
                    {goodsList.map((item) => (
                        <li key={item.id}>
                        <Product {...item} />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}