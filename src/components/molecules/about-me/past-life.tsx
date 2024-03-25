import { Link } from '../../atoms'

// eslint-disable-next-line max-lines-per-function
export const PastLife = () => {
  return (
    <>
      <p>
        A couple of years ago, I decided to become an engineer while working at
        a call center. During my breaks and after work, I took classes from:
      </p>
      <ul>
        <li>
          <Link isExternal to='https://teamtreehouse.com/'>
            Team Treehouse
          </Link>
        </li>
        <li>
          <Link isExternal to='https://www.freecodecamp.org/'>
            freeCodeCamp
          </Link>
        </li>
        <li>
          <Link isExternal to='https://watchandcode.com/'>
            Watch and Code
          </Link>
        </li>
        <li>
          <Link isExternal to='https://platform.ui.dev/'>
            tylermcginnis.com
          </Link>{' '}
          (now ui.dev)
        </li>
        <li>
          <Link isExternal to='https://wesbos.com/'>
            Wes Bos
          </Link>
        </li>
      </ul>
      And read books like:
      <ul>
        <li>
          <Link to='https://www.oreilly.com/library/view/clean-code-a/9780136083238/'>
            Clean Code
          </Link>{' '}
          by Robert C. Martin
        </li>
        <li>
          <Link isExternal to='https://github.com/getify/You-Dont-Know-JS'>
            You Don&apos;t Know JS Yet
          </Link>{' '}
          by Kyle Simpson
        </li>
        <li>
          <Link isExternal to='https://eloquentjavascript.net/'>
            Eloquent JavaScript
          </Link>{' '}
          by Marijn Haverbeke
        </li>
        <li>
          <Link isExternal to='http://domenlightenment.com/'>
            DOM Enlightenment
          </Link>{' '}
          by Cody Lindley
        </li>
      </ul>
      And building lots of projects with React, jquery, and vanilla JavaScript.
      <p>
        After 9 months, I landed my first job as a Teaching Assistant at a
        coding boot camp.
      </p>
    </>
  )
}
