import { ExtLink } from '../atoms/ext-link'

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
          <ExtLink to='https://teamtreehouse.com'>Team Treehouse</ExtLink>
        </li>
        <li>
          <ExtLink to='https://www.freecodecamp.org'>freeCodeCamp</ExtLink>
        </li>
        <li>
          <ExtLink to='https://watchandcode.com'>Watch and Code</ExtLink>
        </li>
        <li>
          <ExtLink to='https://platform.ui.dev'>tylermcginnis.com</ExtLink> (now
          ui.dev)
        </li>
        <li>
          <ExtLink to='https://wesbos.com'>Wes Bos</ExtLink>
        </li>
      </ul>
      And read books like:
      <ul>
        <li>
          <ExtLink to='https://www.oreilly.com/library/view/clean-code-a/9780136083238'>
            Clean Code
          </ExtLink>{' '}
          by Robert C. Martin
        </li>
        <li>
          <ExtLink to='https://github.com/getify/You-Dont-Know-JS'>
            You Don&apos;t Know JS Yet
          </ExtLink>{' '}
          by Kyle Simpson
        </li>
        <li>
          <ExtLink to='https://eloquentjavascript.net'>
            Eloquent JavaScript
          </ExtLink>{' '}
          by Marijn Haverbeke
        </li>
        <li>
          <ExtLink to='https://domenlightenment.com'>DOM Enlightenment</ExtLink>{' '}
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
