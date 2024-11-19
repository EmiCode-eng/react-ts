import { useRef, useEffect, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

const Image = {
    backgroundColor: "gray",
    width: "100%",
    height: "100%"
}

type LazyImageProps = {
    src: string
}
type ImageNative = ImgHTMLAttributes<HTMLImageElement>
type Props = LazyImageProps & ImageNative

export const LazyImage = ({src, ...imgProps}: Props): JSX.Element => {
    const [actualSrc, setActualSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")
    const node = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActualSrc(src)
            })
        })

        if (node.current) observer.observe(node.current)

        return() => observer.disconnect()
    }, [])

    return <img 
        ref={node}
        src={actualSrc}
        style={Image}
        {...imgProps}
    />
}