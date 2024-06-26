import {
  SiApachekafka,
  SiDocker,
  SiExpress,
  SiFastify,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiTurborepo,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

const technologies = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Turborepo", Icon: SiTurborepo },
  { name: "Express", Icon: SiExpress },
  { name: "Fastify", Icon: SiFastify },
  { name: "Prisma", Icon: SiPrisma },
  { name: "Kafka", Icon: SiApachekafka },
  { name: "Docker", Icon: SiDocker },
  { name: "Postgres", Icon: SiPostgresql },
  { name: "Redis", Icon: SiRedis },
];

export const CurrentTechnologies = () => {
  return (
    <ul>
      {technologies.map(({ name, Icon }) => {
        return (
          <li key={name}>
            <span>
              {name}{" "}
              <Icon className="inline-block h-4 align-baseline md:h-6 md:align-text-bottom" />
            </span>
          </li>
        );
      })}
    </ul>
  );
};
