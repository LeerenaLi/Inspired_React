import { ErrorMessage, Field, Form, Formik } from "formik";
import { Container } from "../../Layout/Container/Container";
import s from './Order.module.scss';
import { PatternFormat } from "react-number-format";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { sendOrder } from "../../../features/cartSlice";

export const Order = ({cartItems}) => {
    const dispatch = useDispatch();
    
    const handleSubmitOrder = (values) => {
        dispatch(sendOrder({order: cartItems, values}));
    };

    const validationSсhema = Yup.object({
        fio: Yup.string().required('Заполните ФИО'),
        address: Yup.string().test(
            'deliveryTest',
            'Введите адрес доставки', function (value) {
                return this.parent.delivery === 'delivery' ? !!value : true
            }),
        phone: Yup.string()
            .required('Введите ваш телефон')
            .matches(/^\+\d{1}\(\d{3}\)\-\(\d{3}\)\-\(\d{4}\)$/, 'Некорректный телефон'),
        email: Yup.string().email('Некорректный email').required('Введите ваш email'),
        delivery: Yup.string().required('Выберите способ доставки')
    })

    return (
        <section>
            <Container>
                <h2 className={s.title}>Оформление заказа</h2>

                <Formik
                    initialValues={{
                        fio: '',
                        address: '',
                        phone: '',
                        email: '',
                        delivery: '',
                    }}
                    onSubmit={handleSubmitOrder}
                    validationSchema={validationSсhema}
                >
                    <Form className={s.form}>
                        <fieldset className={s.personal}>
                            <label className={s.label}>
                                <Field
                                    className={s.input}
                                    type='text'
                                    placeholder='ФИО*'
                                    name='fio'
                                />
                                <ErrorMessage
                                    className={s.error}
                                    name='fio'
                                    component={'span'}
                                />
                            </label>

                            <label className={s.label}>
                                <Field
                                    className={s.input}
                                    type='text'
                                    placeholder='Адрес доставки'
                                    name='address'
                                />
                                <ErrorMessage
                                    className={s.error}
                                    name='address'
                                    component={'span'}
                                />
                            </label>

                            <label className={s.label}>
                                <Field
                                    as={PatternFormat}
                                    className={s.input}
                                    format='+7(###)-(###)-(####)'
                                    mask='_'
                                    placeholder='Телефон*'
                                    name='phone'
                                />
                                <ErrorMessage
                                    className={s.error}
                                    name='phone'
                                    component={'span'}
                                />
                            </label>

                            <label className={s.label}>
                                <Field
                                    className={s.input}
                                    type='email'
                                    placeholder='Email*'
                                    name='email'
                                />
                                <ErrorMessage
                                    className={s.error}
                                    name='email'
                                    component={'span'}
                                />
                            </label>
                        </fieldset>

                        <fieldset className={s.radioList}>
                            <label className={s.radio}>
                                <Field
                                    className={s.radioInput}
                                    type="radio"
                                    name='delivery'
                                    value='delivery'
                                />
                                <span>Доставка</span>
                            </label>
                            <label className={s.radio}>
                                <Field
                                    className={s.radioInput}
                                    type="radio"
                                    name='delivery'
                                    value='self'
                                />
                                <span>Самовывоз</span>
                            </label>
                            <ErrorMessage
                                    className={s.error}
                                    name='delivery'
                                    component={'span'}
                                />
                        </fieldset>

                        <button className={s.submit} type='submit'>Оформить</button>
                    </Form>
                </Formik>
            </Container>
        </section>
    )
}