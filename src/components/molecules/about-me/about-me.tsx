import { Prose } from '../../atoms'
import { Experience } from './experience'
import { MyStory } from './my-story'

export const AboutMe = ({ title }: { title: string }) => {
  return (
    <Prose>
      <h1>{title}</h1>
      <MyStory />
      <h2>Work Experience</h2>
      <Experience />
    </Prose>
  )
}
