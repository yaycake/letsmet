import React from 'react';

import { connect } from 'react-redux'
import NavigationLink from '../../components/Navigation/NavigationLink'; 
import Logo from '../../components/Logo/Logo'; 
import PageTitle from '../../components/PageTitle/PageTitle';

// import PreviewTile from '../../components/PreviewTile/PreviewTile'; 

const Layout = props => {
    return (
        <React.Fragment>
            <Logo/>
            <PageTitle pageTitle="LETS MET"/>
            <NavigationLink/>
            { props.children }
            
        </React.Fragment>
    )
}

export default Layout;
