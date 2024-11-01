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
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiTurborepo, name: "Turborepo" },
  { Icon: SiExpress, name: "Express" },
  { Icon: SiFastify, name: "Fastify" },
  { Icon: SiPrisma, name: "Prisma" },
  { Icon: SiApachekafka, name: "Kafka" },
  { Icon: SiDocker, name: "Docker" },
  { Icon: SiPostgresql, name: "Postgres" },
  { Icon: SiRedis, name: "Redis" },
];

export const CurrentTechnologies = () => {
  return (
    <ul>
      {technologies.map(({ Icon, name }) => {
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
