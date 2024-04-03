import {
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiReact,
} from "@icons-pack/react-simple-icons";

import { ExtLink } from "../atoms/ext-link";
import { CurrentTechnologies } from "./current-tech";

const ICON_CLASS_NAME =
  "inline-block h-4 align-baseline md:h-6 md:align-text-bottom ";

const TargetDescription = () => {
  return (
    <>
      I&apos;m currently a Lead Engineer at{" "}
      <ExtLink to="https://www.target.com">Target</ExtLink> where I drive full
      stack solutions for <strong>supply chain</strong> inventory management
      applications. The main technologies that I interact with are:
      <CurrentTechnologies />
      My day to day consists of mentoring, ensuring scalability and providing a
      vision for the future. At the moment, I&apos;m working on:
      <ul>
        <li>
          Building and designing <strong>micro services</strong> platform that
          focus on <strong>performance</strong> and{" "}
          <strong>developer experience</strong>.
        </li>
        <li>
          Paying down historical debt while incrementally modernizing our UI.
        </li>
        <li>
          Designing and planning the migration from a SPA to a Next.js
          application.
        </li>
      </ul>
    </>
  );
};

// eslint-disable-next-line max-lines-per-function
export const MyStory = () => {
  return (
    <>
      <p>
        I&apos;m Jimmy Guzman Moreno, an engineer that specializes in{" "}
        <strong>full stack</strong> development. I have primarily worked in{" "}
        <strong>leadership</strong> roles, successfully delivering scalable
        solutions and mentoring teams.
      </p>
      <TargetDescription />
      <p>
        Before that, I worked at{" "}
        <ExtLink to="https://www.ameriprise.com">Ameriprise Financial</ExtLink>{" "}
        where I began as an engineer and by the end of my tenure I was serving
        as a Senior Lead Engineer. At Ameriprise, I have put on multiple hats
        such as <strong>leading</strong> the full stack guest experience
        platform, <strong>leading</strong> a core component library,{" "}
        <strong>leading</strong> the core and standards team, and paving the way
        for the next gen platform focused on{" "}
        <strong>developer experience</strong>.
      </p>
      <p>
        Briefly before Ameriprise, I worked as a <strong>teaching</strong>{" "}
        assistant at the{" "}
        <ExtLink to="https://bootcamp.umn.edu/coding">
          University of Minnesota Coding Boot Camp
        </ExtLink>{" "}
        that focused on the MERN stack:
      </p>
      <ul>
        <li>
          <span>
            <strong>M</strong>ongoDB <SiMongodb className={ICON_CLASS_NAME} />
          </span>
        </li>
        <li>
          <span>
            <strong>E</strong>xpress <SiExpress className={ICON_CLASS_NAME} />
          </span>
        </li>
        <li>
          <span>
            <strong>R</strong>eactJS <SiReact className={ICON_CLASS_NAME} />
          </span>
        </li>
        <li>
          <span>
            <strong>N</strong>odeJS <SiNodedotjs className={ICON_CLASS_NAME} />
          </span>
        </li>
      </ul>
      <p>Finally, prior to that, I worked as a freelance web developer.</p>
      <p>
        In a past life, I worked various jobs in diverse industries such as
        education, warehouse, and customer service.
      </p>
    </>
  );
};
