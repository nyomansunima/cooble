import Image from 'next/image'
import { FC } from 'react'

const VerifyEmailImage: FC = () => {
  return (
    <section className="hidden laptop:flex w-1/2 h-full relative animate-in duration-700 fade-in-20 overflow-hidden bg-[#E8E8FF] justify-center items-center">
      <Image
        src={'/images/larry-char.svg'}
        alt="Signin"
        width={498}
        height={498}
        className="transition-all duration-1000 hover:scale-105"
        priority
      />
    </section>
  )
}

export { VerifyEmailImage }
