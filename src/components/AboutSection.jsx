import { Cpu, Server } from "lucide-react";
import GlareHover from './GlareHover'

<div style={{ height: '600px', position: 'relative' }}>
  
</div>
export const AboutSection = () => {
  return (
   <section id="about" className="py-24 px-4 relative bg-background text-foreground">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate Developer & Problem Solver
            </h3>

            <p className="text-muted-foreground"> 
              I build modern software solutions and full-stack applications, combining clean 
              design with efficient functionality. I focus on scalable architectures, responsive interfaces, and optimized algorithms. 
            </p> 
            <p className="text-muted-foreground"> Continuously learning and exploring new 
              technologies, I turn ideas into impactful digital products while emphasizing 
              performance, usability, and problem-solving excellence. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="public/projects/MDAyanBadar_resume.pdf"
                download="MD_Ayan_Badar_Resume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Skill Cards with GlareHover */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Full-Stack Development */}
            <GlareHover
              glareOpacity={0.2}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              className="rounded-xl"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="gradient-border p-6 card-hover w-full h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">Full-Stack Development</h4>
                    <p className="text-muted-foreground">
                      Creating end-to-end solutions with MERN/MEAN stack, integrating front-end and back-end seamlessly for scalable and efficient applications.
                    </p>
                  </div>
                </div>
              </div>
            </GlareHover>

            {/* Python & DSA */}
            <GlareHover
              glareOpacity={0.2}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              className="rounded-xl"
              style={{ width: "100%", height: "100%" }} 
            >
              <div className="gradient-border p-6 card-hover w-full h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">Python & DSA</h4>
                    <p className="text-muted-foreground">
                      Writing efficient Python programs, solving complex problems using data structures and algorithms, and building logic-driven software solutions.
                    </p>
                  </div>
                </div>
              </div>
            </GlareHover>

            {/* AI & Generative AI */}
            <GlareHover
              glareOpacity={0.2}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              className="rounded-xl"
              style={{ width: "100%", height: "100%" }} 
            >
              <div className="gradient-border p-6 card-hover w-full h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">AI & Generative AI</h4>
                    <p className="text-muted-foreground">
                      Leveraging AI and generative models to build intelligent solutions and enhance 
                      software applications with advanced automation and insights.
                    </p>
                  </div>
                </div>
              </div>
            </GlareHover>

          </div>
        </div>
      </div>
    </section>
  );
};
