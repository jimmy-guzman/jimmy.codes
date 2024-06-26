export const jobs = [
  {
    from: "Jan 2021",
    location: "Minneapolis, MN",
    name: "Target",
    tasks: [
      "Drive technical solutions for supply chain inventory management applications.",
      "Collaborate with both engineering and product partners to deliver timely solutions.",
      "Mentor engineers in diverse technologies, system design, and development processes.",
      "Continuously improve performance in both client and server systems.",
      "Improve development best practices, standards and experience.",
      "Continuously analyze systems and recommend changes to improve scalability.",
    ],
    title: "Lead Software Engineer",
    to: "Present",
  },
  {
    from: "July 2018",
    location: "Minneapolis, MN",
    name: "Ameriprise",
    tasks: [
      "Lead the guest experience platform team which consists of React and Java.",
      "Continuously designed and built systems to improve the developer experience.",
      "Guide peers in best practices, unit testing, and overall application architecture.",
      "Collaborate with partners to deliver full-stack solutions for finance service-based applications.",
      "Collaborate with DevOps to ensure integration, deployment, automation, and quality.",
      "Lead efforts to solidify standards and best practices across the front-end engineering.",
      "Lead the delivery of an internal React component library.",
      "Collaborate with other leaders to improve hiring practices and standards.",
      "Provide consultation to help deliver solutions across multiple teams with diverse technology stacks.",
    ],
    title: "Senior/Lead Software Engineer",
    to: "Jan 2021",
  },
  {
    from: "May 2018",
    location: "St. Paul, MN",
    name: "Trilogy Education",
    tasks: [
      "Support students in their projects and challenges through a Full Stack Web Development Curriculum.",
      "Provided assistance and feedback on various technologies of the Full Stack ecosystem like ReactJS, NodeJS, MongoDB, and Express.",
    ],
    title: "Teaching Assistant",
    to: "Dec 2018",
  },
  {
    from: "Feb 2018",
    location: "Madison, WI",
    name: "Self-Employed",
    tasks: [
      "Developed user-friendly websites for various small business clients by programming site functionality and organizing site content.",
      "Consulted with clients in order to ensure cross-platform compatibility and mobile responsiveness.",
      "Responsible for debugging sites that use JavaScript, HTML, CSS, jQuery, and React.",
    ],
    title: "Freelance Web Developer ",
    to: "May 2018",
  },
] satisfies {
  from: `${string} ${string}`;
  location: `${string}, ${string}`;
  name: string;
  tasks: `${Uppercase<string>}${string}.`[];
  title: string;
  to: string;
}[];
