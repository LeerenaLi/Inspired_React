import { useEffect, useState } from 'react';
import { Container } from '../Layout/Container/Container';
import s from './ProductPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../features/productSlice';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../const';
import cn from 'classnames';
import { ColorList } from '../ColorList/ColorList';
import { Count } from '../Count/Count';
import { ProductSize } from '../ProductSize/ProductSize';
import { Goods } from '../Goods/Goods';
import { fetchCategory } from '../../features/goodsSlice';
import { BtnLike } from '../BtnLike/BtnLike';

export const ProductPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {product} = useSelector(state => state.product);
    const {gender, category} = product;

    const [count, setCount] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + 1);
    }

    const handleDecrement = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1);
        }
    }

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    }

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    }

    useEffect(() => {
        dispatch(fetchCategory({gender, category, count: 4, top: true, exclude: id}));
    }, [gender, category, id, dispatch])

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [id, dispatch]);

    return (
       <>
         <section className={s.card}>
            <Container className={s.container}>
                <img
                className={s.image}
                    src={`${API_URL}${product.pic}`}
                    alt={`${product.title}`}
                />
                <form className={s.content}>
                    <h2 className={s.title}>{product.title}</h2>
                    <p className={s.price}>руб {product.price}</p>

                    <div className={s.vendorCode}>
                        <span className={s.subtitle}>Артикул</span>
                        <span className={s.id}>{product.id}</span>
                    </div>

                    <div className={s.color}>
                        <p className={cn(s.subtitle, s.colorTitle)}>Цвет</p>
                        <ColorList
                            colors={product.colors}
                            selectedColor={selectedColor}
                            handleColorChange={handleColorChange}
                        />
                    </div>
                    <ProductSize
                        size={product.size}
                        slectedSize={selectedSize}
                        handleSizeChange={handleSizeChange}
                    /> 

                    <div className={s.descripton}>
                        <p className={cn(s.subtitle, s.descriptionTitle)}>Описание</p>
                        <p className={s.descriptonText}>{product.descripton}</p>
                    </div>

                    <div className={s.control}>
                        <Count
                            className={s.count}
                            count={count}
                            handleIncrement={handleIncrement} 
                            handleDecrement={handleDecrement}
                        />

                        <button className={s.addCart} type='submit'>В корзину</button>

                        <button className={s.favorite}
                            aria-label='Добавить в избранное'
                            type='button'
                        >
                            <BtnLike id={id} />
                        </button>
                    </div>
                </form>
            </Container>
        </section>
        <Goods title='Вам также может понравиться' />
       </>
    )
}