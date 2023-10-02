import { CloseIcon, HamburgerIcon } from '../../icons'

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
        <CloseIcon className='h-6 w-6 stroke-bright-turquoise-350' />
      ) : (
        <HamburgerIcon className='h-6 w-6 stroke-bright-turquoise-350' />
      )}
    </button>
  )
}
