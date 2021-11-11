
import { useState } from "react"
import barn from '../placeholderPhotos/barn.jpg'
import tomatoes from '../placeholderPhotos/tomatoes.jpg'
import logs from '../placeholderPhotos/logs.jpg'
import turkey from '../placeholderPhotos/turkey.jpg'
import sunrise from '../placeholderPhotos/sunrise.jpg'
import tractor from '../placeholderPhotos/tractor.jpg'
import {animated, useSpring, config} from 'react-spring'


const Slideshow = () => {
  const images = [barn, logs, tractor, tomatoes, sunrise, turkey];
  const [leftImage, setLeftImage] = useState(barn);
  const [rightImage, setRightImage] = useState(logs);
  const [counter, setCounter] = useState(3);
  const [rightSlideInView, setRightSlideInView] = useState(false);
  const [shiftDirection, setShiftDirection] = useState(true);

  const styles = useSpring({
    
    from: { x: 0 },
    to: { x: -window.innerWidth },
    reset: true,
    reverse: shiftDirection,
    delay: 10000,
    config: config.molasses,
    onRest: () => {
      setShiftDirection(!shiftDirection);
      if (rightSlideInView) {
        setLeftImage(images[counter]);
        setRightSlideInView(!rightSlideInView);
        if (counter === images.length - 1) {
          setCounter(0)
        } else {
          setCounter(counter + 1)
        }
      } else {
        setRightImage(images[counter]);
        setRightSlideInView(!rightSlideInView);
        if (counter === images.length - 1) {
          setCounter(0)
        } else {
          setCounter(counter + 1)
        }
      }
    },
  })

  return (
    <animated.div style={styles}>
        <div className="flex slideshow-container">
          <img src={leftImage} alt="First Slide" />
          <img src={rightImage} alt="Second Slide" />
        </div>
        
      
      
      
    </animated.div>
  )
}

export default Slideshow

