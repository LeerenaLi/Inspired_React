import { Navigation } from "./Navigation/Navigation";
import { Top } from "./Top/top";
import s from "./Header.module.scss";
import { Search } from "../Search/Search";

export const Header = () => (
    <header className={s.header}>
        <Top />
        <Search />
        <Navigation />
    </header>
)
