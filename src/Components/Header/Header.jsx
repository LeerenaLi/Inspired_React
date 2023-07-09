import { Navigation } from "./Navigation/Navigation";
import { Top } from "./Top/top";
import s from "./Header.module.scss";

export const Header = () => (
    <header className={s.header}>
        <Top />
        <Navigation />
    </header>
)