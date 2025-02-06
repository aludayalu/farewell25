import { AnimatedShinyText } from "@/components/animated-shiny-text"
import { TypingAnimation } from "@/components/typing-animation"
import { useEffect, useState } from "react"
import { ShimmerButton } from "@/components/shimmer-button"

var api="https://aludayalu.com/image_count"
var image_api="https://dpsfarewell.s3.ap-south-1.amazonaws.com/"

export function AnimatedShinyTextDemo() {
    return (
        <div className="dark z-10 flex min-h-14 items-center justify-center">
            <div
                className={"group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"}
            >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ DPS RKP 2025 Farewell</span>
                </AnimatedShinyText>
            </div>
        </div>
    );
}

const Header = () =>  {
    return (
        <>
        <AnimatedShinyTextDemo>DPS RKP 2025 Farewell</AnimatedShinyTextDemo>
        <div className="text-center mt-5">
            <div className="text-5xl">
                <p>The Gallery</p>
                <div className="flex items-center justify-center gap-3">
                    <p>Of</p> <TypingAnimation>Memories</TypingAnimation> 🧁
                </div>
            </div>
        </div>
        <div className="dark flex items-center justify-center mt-1 mb-7">
            <ShimmerButton className="shadow-2xl" onClick={() => window.location="/"}>
            <span className="whitespace-pre-wrap text-center text-2xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10" style={{padding:"4px", width:"45vw"}}>
                Go Home
            </span>
            </ShimmerButton>
        </div>
        </>
    )
}

export function Gallery() {
    const [images, setImages] = useState(false)

    useEffect(() => {
        fetch(api).then(async (x) => {
            setImages(await x.json())
        })
    })

    return (
        <>
        
        {images==false ?
        <div style={{height:"40vh"}} className="flex justify-center items-center">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        :
        <div className="row"> 
            <div className="column">
                {Array(images).fill(1).map((_, index) => {
                    if (index % 2 == 1) {
                        return
                    }
                    return <img id={"image_"+(images-1-index)} key={index} className="rounded-lg" src={image_api+(images-1-index)} onClick={() => window.location="/images?image="+(images-1-index)} alt="" loading="lazy" onError={() => document.getElementById("image_"+(images-1-index)).remove()}/>
                })}
            </div>
            <div className="column">
                {Array(images).fill(1).map((_, index) => {
                    if (index % 2 == 0) {
                        return
                    }
                    return <img id={"image_"+(images-1-index)} key={index} className="rounded-lg" src={image_api+(images-1-index)} onClick={() => window.location="/images?image="+(images-1-index)} alt="" loading="lazy" onError={() => document.getElementById("image_"+(images-1-index)).remove()}/>
                })}
            </div>
        </div>
        }
        </>
    )
}

export default function GalleryPage() {
    return (
        <>
        <Header></Header>
        <Gallery></Gallery>
        </>
    )
}