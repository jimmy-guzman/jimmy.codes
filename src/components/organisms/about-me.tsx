import { Prose } from "../atoms/prose";
import { Experience } from "../molecules/experience";
import { MyStory } from "../molecules/my-story";

export const AboutMe = ({ title }: { title: string }) => {
  return (
    <Prose>
      <h1>{title}</h1>
      <MyStory />
      <h2>Experience</h2>
      <Experience />
    </Prose>
  );
};
