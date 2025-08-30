import { Timeline } from "./timeline";
import { experiences } from "../constants/index.js";

function Experience() {
  return (
    <div id="experience" className="work w-full">
      <Timeline data={experiences} />
    </div>
  );
}

export default Experience;
