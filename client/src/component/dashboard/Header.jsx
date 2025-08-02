import * as Fa from 'react-icons/fa6'
const Header = ({user}) => {

    return (
        <div className='flex justify-between px-4 py-2 w-full font-alata '>
            <h1 className='text-3xl'>{user}</h1>
        </div>
    );
};

export default Header;
