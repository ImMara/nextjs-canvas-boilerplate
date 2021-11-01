import Head from 'next/head';
import { gsap } from "gsap";
import { useRef,useEffect } from 'react';

export default function Home() {

    // reference
    const boxRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        gsap.to(boxRef.current,{ rotation: "+=360" })

        // canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = innerWidth;
        canvas.height = innerHeight;

        const w = canvas.width;
        const h = canvas.height;

        // Variables

        const mouse = {
            x: w / 2,
            y: h / 2
        }

        const colors = [
            '#2185C5',
            '#7ECEFD',
            '#FFF6E5',
            '#FF7F66'
        ]

        // Event listeners
        addEventListener('mousemove', event => {
            mouse.x = event.clientX
            mouse.y = event.clientY
        })
        addEventListener('resize',()=>{
          canvas.width = innerWidth;
          canvas.height = innerHeight;
          init();
        })

        // Utility functions
        function randomIntFromRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        function randomColor(colors) {
            return colors[Math.floor(Math.random() * colors.length)]
        }

        // Objects
        function Object(x,y,radius,color){
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;

            this.update = function(){
                this.draw();
            }

            this.draw = function(x,y){
                ctx.beginPath();
                ctx.arc(this.x + x, this.y + y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
        }
        function Particle(x, y, radius, color) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.radians = Math.random() * Math.PI * 2
            this.velocity = 0.01
            this.distanceFromCenter = randomIntFromRange(50, 150)

            this.update = function() {
                this.draw()
                this.updatePosition()
            }

            this.draw = function() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
                ctx.fillStyle = this.color
                ctx.fill()
            }

            this.updatePosition = function() {
                this.radians += this.velocity
                this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter
                this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter
                this.draw()
            }
        }

        // Implementation
        let objects;
        function init(){
          objects = []
          for(let i = 0; i < 100; i++){
            // object push
            //objects.push(new Object(x, y, radius, color))
          }
        }

        // Animation Loop<
        function animate() {
            requestAnimationFrame(animate)
            ctx.clearRect(0, 0, w, h)
            ctx.fillText('HTML CANVAS BOILERPLATE',mouse.x,mouse.y);
            objects.forEach(object => object.update())
        }

        init();
        animate();

        // circle

        
    })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex static flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {/*<div ref={boxRef}>Hello</div>*/}
        <canvas className="absolute" ref={canvasRef}></canvas>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
