import { Link } from '../atoms'

interface AuthorProps {
  href: string
  name: string
}

export const Author = ({ href, name }: AuthorProps): JSX.Element => {
  return (
    <p>
      <Link to={href}>{name}</Link>
    </p>
  )
}
