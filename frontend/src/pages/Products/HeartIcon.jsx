import {FaHeart, FaRegHeart, FaVaadin} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { 
 addToFavorites, 
 removeFromFavorites, 
 setFavorites 
} from '../../redux/features/favorites/favoriteSlice'

import { 
addFavoritesToLocalStorage, 
getFavoritesFromLocalStorage,
removeFavoritesFromLocalStorage 
} from '../../Utils/localStorage'
import { useEffect } from 'react'


const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorite = favorites.some((p) => p._id === product._id)
    
    useEffect(() => {
       const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
       dispatch(setFavorites(favoritesFromLocalStorage));
    }, [])
    
    const toggleFavorites = () => {     
      if(isFavorite) {
        dispatch(removeFromFavorites(product))
        // remove the product from the localstorage as well
        removeFavoritesFromLocalStorage(product._id)
      } else {
        dispatch(addToFavorites(product))
        // add the product to localStorage as well
        addFavoritesToLocalStorage(product);
      }
    }
  



  return (
    <div 
    onClick={toggleFavorites} 
    className='absolute top-2 right-5 cursor-pointer'>
      {isFavorite ? (
      <FaHeart className='text-pink-500'/>
      ) : (
        <FaRegHeart className='text-white'/>
      )}
        
    </div>
  )
}

export default HeartIcon;