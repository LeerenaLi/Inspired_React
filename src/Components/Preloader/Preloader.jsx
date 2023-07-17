import { Puff } from 'react-loader-spinner';

const style = {
    display: 'flex',
    justifyContent: 'center',
    padding: '100px 0',
}
;
export const Preloader = () => (
    <div style={style}>
        <Puff
            height={140}
            width={140}
            color='#8A8A8A'
        />
    </div>
)