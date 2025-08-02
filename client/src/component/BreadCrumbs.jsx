import { BiChevronRight } from "react-icons/bi";
import { Link, useLocation, useMatches } from "react-router";
import { AiOutlineDoubleRight } from "react-icons/ai";

const BreadCrumbs = () => {
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="flex flex-wrap items-center px-4 py-4 space-x-1 text-sm">
            <ol className="flex text-base text-black font-alata gap-4">
                <li className="flex justify-center items-center">
                    <Link to="/">Home</Link>
                    <span className="text-2xl">
                        <BiChevronRight />
                    </span>
                </li>
                {pathnames.map((value, index) => {
                    const to = `${pathnames.slice(0, index + 1).join(() => {
                        return <BiChevronRight />;
                    })}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li>
                            {isLast ? (
                                <span>
                                    {decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
                                </span>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Link to={to}>
                                    {decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
                                    </Link>
                                    <span className="text-2xl">
                                        <BiChevronRight />
                                    </span>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
