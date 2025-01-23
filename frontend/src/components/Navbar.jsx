import 'purecss/build/buttons.css'
import { Outlet, useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: "100vh"
        }}>
            <div style={{
                backgroundColor: '#E6E6E6', 
                flexBasis: '48px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}>    
            </div>
            <div style={{
                flexGrow: 1,
                overflow: "scroll"
            }}>
                <Outlet/>
            </div>
            <div style={{ 
                width: '100%',
                minHeight: '48px',
                display: "flex",
                boxShadow: "0px -3px 10px 0px rgba(0,0,0,0.2),0px 10px 15px -3px rgba(0,0,0,0.1)"
                }}>
                    <button style={{
                        flexGrow: 1,
                        backgroundColor: 'white',
                        border: 'none'
                    }} onClick={() => { 
                        navigate("/")
                    }}>Stock</button>
                    <button style={{
                        flexGrow: 1,
                        backgroundColor: 'white',
                        border: 'none'
                    }} onClick={() => navigate("/orders")}>Orders</button>
            </div>
        </div>
    )
}

export default Navbar;