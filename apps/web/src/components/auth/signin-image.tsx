import Image from 'next/image'
import { FC } from 'react'

const SigninImage: FC = () => {
  return (
    <section className='hidden laptop:flex w-1/2 h-full relative animate-in duration-700 fade-in-20 overflow-hidden'>
      <Image
        src={'/images/signin-computer-image.png'}
        alt='Signin'
        fill
        className='transition-all duration-1000 hover:scale-105 object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
      />
    </section>
  )
}

export { SigninImage }
