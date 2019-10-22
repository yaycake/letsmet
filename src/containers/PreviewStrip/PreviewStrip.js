import React from 'react'
import PreviewTile from '../../components/PreviewTile/PreviewTile';

import styles from './PreviewStrip.module.css'

import { useState, useDispatch } from 'react-redux'

const PreviewStrip = ( props ) => {
    const gallery = useState(state => state.gallery.gallery);

    const galleryStrip = gallery.map( art => (
        <PreviewTile
            image = { art.primaryImage }
        />
    )

    dispatch = useDispatch()
 
};

export default PreviewStrip;