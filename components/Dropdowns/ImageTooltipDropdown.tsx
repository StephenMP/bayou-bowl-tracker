import { createPopper } from '@popperjs/core'
import Image from 'next/image'
import React from 'react'
import usePopdownCloseEvents from '../../hooks/usePopdownCloseEvents'

export type ImageTooltipDropdownProps = {
  text: string
  src: string
  width: number
  height: number
  description?: string
}

const BB3EventScoreHuntDollarsDropdown = (props: ImageTooltipDropdownProps) => {
  // dropdown props
  const { text, src, width, height } = props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef<HTMLAnchorElement>()
  const popoverDropdownRef = React.createRef<HTMLDivElement>()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, { placement: 'bottom-start' })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => setDropdownPopoverShow(false)
  const ref = usePopdownCloseEvents(closeDropdownPopover)

  return (
    <div ref={ref}>
      <a
        className="lg:hover:text-blueGray-500 text-blueGray-700 flex items-center text-xs uppercase font-bold"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}
      >
        {text}
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <span className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"></span>
        {props.description}
        <Image src={src} width={width} height={height} />
      </div>
    </div>
  )
}

export default BB3EventScoreHuntDollarsDropdown
