import React from 'react';
import Navigation from '../../components/Navigation/Navigation'

// import PreviewTile from '../../components/PreviewTile/PreviewTile'; 

const Layout = props => {
    return (
        <React.Fragment>
            <Navigation> </Navigation>
            { props.children }
            
        </React.Fragment>
    )
}

export default Layout;
