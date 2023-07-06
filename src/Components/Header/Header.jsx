import { Navigation } from "./Navigation/Navigation";
import { Top } from "./Top/top";

export const Header = ({list}) => (
    <header>
        <Top />
        <Navigation list={list} />
    </header>
)