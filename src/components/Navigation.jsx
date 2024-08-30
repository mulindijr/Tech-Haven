import { FaShoppingCart } from 'react-icons/fa';

export const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },    
    {
        label: "Account",
        subLinks: [
            { label: "Sign In", path: "/login" },
            { label: "My Account", path: "/my-account" },
            { label: "Orders", path: "/orders" }
        ]
    },
    { icon: <FaShoppingCart />, path: "/cart" }
];

const Navigation = () => {
   

    return (
        <header>
          
        </header>
    );
};

export default Navigation;
