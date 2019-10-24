import React, {useState} from 'react'
import PreviewTile from '../../components/PreviewTile/PreviewTile';

import styles from './PreviewStrip.module.css'

import { useDispatch } from 'react-redux'

const PreviewStrip = ( props ) => {

    const artworks = props.gallery.map(art => <PreviewTile image = { art.primaryImage } />)

    return (
        { artworks } 
    )
  
};

export default PreviewStrip;