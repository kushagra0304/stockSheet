import 'purecss/build/buttons.css'

const Navbar = (props) => {
    return (
        <>
            <div style={{
                backgroundColor: '#E6E6E6', 
                height: '48px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}>    
            </div>
            {props.children}
            <div style={{ 
                position: 'absolute', 
                top: '100%', 
                left: '50%', 
                transform: 'translate(-50%, -100%)',
                display: 'flex',
                width: '100%',
                height: '48px'
                }}>
                    <button class="pure-button" style={{flexGrow: '1', border: '1px solid black'}} href="#">Stock</button>
                    <button class="pure-button" style={{flexGrow: '1', border: '1px solid black'}} href="#">Orders</button>
            </div>
        </>
    )
}

export default Navbar;