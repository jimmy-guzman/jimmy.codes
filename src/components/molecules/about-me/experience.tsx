import { jobs } from './constants'

interface ExperienceProps {
  projects?: Array<{
    description?: string
    from: string
    location: string
    name: string
    tasks?: string[]
    title: string
    to: string
  }>
}

export const Experience = ({ projects = jobs }: ExperienceProps) => {
  return (
    <ul className='m-0 list-none p-0'>
      {projects.map(
        ({ name, title, from, to, description, tasks, location }) => {
          return (
            <li key={name}>
              <div>
                <h3>
                  {name} - {title}
                </h3>
                <p>
                  {location} ({from} - {to})
                </p>
                {description && <p>{description}</p>}
                <ul>{tasks?.map((task) => <li key={task}>{task}</li>)}</ul>
              </div>
            </li>
          )
        }
      )}
    </ul>
  )
}
