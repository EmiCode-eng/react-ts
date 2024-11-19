import { useState } from 'react'
import type { MouseEventHandler } from 'react'
import { random } from 'lodash'
import { LazyImage } from "./Components/LazyImage"
import './App.css'

type ImageItem = {id: string, url: string}

const randomImage = (): number => random(1, 123)
const randomImageNiki = (): number => random(1, 20)
const generateId = (): string => Math.random().toString(36).substr(2, 9)

export const App = () => {
  const [images, setImages] = useState<Array<ImageItem>>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${randomImage()}.jpg`
    }

    setImages([
      ...images,
      newImageItem
    ])
  }

  const addNewNiki: MouseEventHandler<HTMLButtonElement> = () => {
    const newImageItem = {
      id: generateId(),
      url: `/Niki/N${randomImageNiki()}.jpg`
    }

    setImages([
      ...images,
      newImageItem
    ])
  }

  return <>
    <main className='wrapper'>
      <h1 className='title'>SnapDeck</h1>
      <button className='button-85' onClick={addNewFox}>Agregar un zorrito 🩷</button>
      <button className='button-85' onClick={addNewNiki}>Agregar un Niki 🥵</button>
      <section className='images-container'>
        {images.map(({id, url}) => (
          <div key={id} className='image-item'>
            <LazyImage src={url} />
          </div>
        ))}
      </section>
    </main>
  </>
}