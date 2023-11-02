import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

export const MobileMenuButton = ({
  isMobileMenuOpen,
  onClick,
}: {
  isMobileMenuOpen: boolean
  onClick: () => void
}): JSX.Element => {
  return (
    <button
      className='transition delay-150 ease-in-out hover:scale-110'
      onClick={onClick}
    >
      {isMobileMenuOpen ? (
        <XMarkIcon className='h-6 w-6 text-bright-turquoise-350' />
      ) : (
        <Bars3Icon className='h-6 w-6 text-bright-turquoise-350' />
      )}
    </button>
  )
}
