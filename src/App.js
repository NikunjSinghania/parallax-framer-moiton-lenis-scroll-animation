import './App.css';
import {useScroll, useTransform, motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import Lenis from '@studio-freight/lenis'

function COLS({y}) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        fetch('https://api.unsplash.com/photos/random?client_id=0qcbbk7nKoHdce5YL6D_0S8genBv7KfSKkPgzRSUlWs&count=4').then(res => {
            res.json().then(data_r => {
                setData(data_r)
                setLoading(true)
            })
        })

        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, []);

  return (
      <motion.div style={{ y : y }} className='COLS'>
          { loading &&
              [0,1,2,3].map((e, index) => {
                  return (
                      <span>
                          <img key={index} src={data[index].urls.regular} />
                      </span>
                  )
              })
          }
      </motion.div>
  )
}

function App() {

    const container = useRef(null)

    const { scrollYProgress } = useScroll({
        target : container,
        offset : ['start end', 'end start']
    })




    const y1 = useTransform(scrollYProgress, [0,1], [0,2000])
    const y2 = useTransform(scrollYProgress, [0,1], [0,1500])

    const y3 = useTransform(scrollYProgress, [0,1], [0,1000])

    const y4 = useTransform(scrollYProgress, [0,1], [0,2500])

    console.log(y1, y2, y3, y4)

    return (
    <div className="App">
      <div className='spacer'></div>

      <div ref={container} className='gallery'>
        <COLS y={y1}/>
          <COLS y={y2} />
          <COLS y={y3} />
          <COLS y={y4} />
      </div>

      <div className='spacer'></div>
    </div>
  );
}

export default App;
