import Image from "next/image" 


const HomeBanner = () => {
  return (
    <div className="relative  mb-8 bg-gradient-to-r from-rose-500 to-rose-700 rounded-2xl">
        <div className="flex mx-auto px-8 py-12 gap-2 mb:flex-row items-center justify-evenly">
            <div className="flex flex-col mb-8 md:mb-0 text-center">
                <h1 className="mb-4 text-4xl md:text-6xl font-bold text-white">Bermonths Sale!</h1>
                <p className="mb-2 text-lg  md:xl text-white ">Enjoy discounts on selected items</p>
                <p className="text-2xl md:text-5xl text-yellow-400 font-bold">GET 30% OFF</p>
            </div>
            <div className="w-1/3 relative aspect-video hidden sm:block">
                <Image 
                 src='/images/banner-image.png'
                 fill
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 alt="Banner Image"
                 className="object-contain"
                 priority
                 />
            </div>
        </div>
    </div>
  )
}

export default HomeBanner