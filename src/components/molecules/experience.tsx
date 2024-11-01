import { jobs } from "./experience.constants";

interface ExperienceProps {
  projects?: {
    description?: string;
    from: string;
    location: string;
    name: string;
    tasks?: string[];
    title: string;
    to: string;
  }[];
}

export const Experience = ({ projects = jobs }: ExperienceProps) => {
  return (
    <ul className="m-0 list-none p-0">
      {projects.map(
        ({ description, from, location, name, tasks, title, to }) => {
          return (
            <li key={name}>
              <div>
                <h3>
                  {name} - {title}
                </h3>
                <p>
                  {location} ({from} - {to})
                </p>
                {description ? <p>{description}</p> : null}
                <ul>
                  {tasks?.map((task) => {
                    return <li key={task}>{task}</li>;
                  })}
                </ul>
              </div>
            </li>
          );
        },
      )}
    </ul>
  );
};
