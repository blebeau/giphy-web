import React, { useState, useEffect } from 'react';
import '../styles/image.css';

const Images = () => {
    const [search, setSearch] = useState('');
    const [apiImages, setApiImages] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);

    console.log('api images', apiImages);

    useEffect(() => {
        async function getImages() {
            let response = await fetch(`https://api.giphy.com/v1/stickers/search?q=${search}&limit=10&rating=g&api_key=${REACT_APP_API_KEY}`);

            response = await response.json();
            setApiImages(response.data.splice(imgIndex, 3));

        }
        getImages();
    }, [search, imgIndex]);

    return (
        <div className='images_component'>
            <button
            className='next'
            onClick={() => {
                setImgIndex(imgIndex + 3);
            }}
            >
                Next
            </button>
            <button
            className='previous'
            disabled={imgIndex === 0}
            onClick={() => {
                setImgIndex(imgIndex - 3);
            }}
            >
                Previous
            </button>
        <input 
            onChange={event => setSearch(event.target.value)}
        />
        <div className='images'>
        {apiImages.length > 0 ?
            apiImages.map((image) => (
                <div>
                <img
                    className='img'
                    alt={image.title}
                    key={image.id}
                    src={image.embed_url}
                >
                </img>
                <p>{image.title}</p>
                </div>
            )) : null
        }
        </div>
        </div>
    )
}

export default Images;