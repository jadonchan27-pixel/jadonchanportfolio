/*
  Portfolio content. Edit this file to change what the site shows.

  profile:  your name, headline, a short intro, and contact details.
  projects: one entry per project, shown in this order.
    id       short unique slug, used in the page URL (#id)
    title    project name
    when     date or term, e.g. "Spring 2025"
    tags     skills used, each shown as a tag
    summary  the description; a blank line (\n\n) starts a new paragraph
    sections optional [{ heading, text, images }] shown after the summary
    images   [{ src: "assets/images/file.jpg", cap: "Caption" }]; the first is the cover
*/
window.PORTFOLIO = {
  profile: {
    name: "Jadon Chan",
    headline: "Mechanical Engineering Portfolio",
    about: "A record of the mechanical design, analysis and build projects I have completed. Open a project to read what it was, the skills I used, and see photos or CAD renders of the result.",
    email: "jadonchan27@utexas.edu",
    links: []
  },
  projects: [
    {
      id: "rc-car",
      title: "3D Printable RC Car",
      when: "",
      tags: ["3D Parametric Modeling (SolidWorks)", "Large Assembly management", "Applied Kinematics", "Gear design", "3D Printing"],
      summary: "To deepen my understanding of assemblies, SolidWorks, and manufacturing, I chose to design and create an RC car that can be 3D printed while using minimal off the shelf parts. This project gave me a deeper understanding of vehicle dynamics, tolerances, large assemblies, and design considerations when going from CAD to an actual part.",
      sections: [
        {
          heading: "Suspension",
          images: [{ src: "assets/images/rc-car-suspension-sim.jpg", cap: "Suspension camber study" }],
          text: "To ensure accuracy in suspension movement, I first made a simulation through a SolidWorks drawing to visualize how upwards movement of the suspension arms would affect wheel camber. The upper control arm was designed to be relatively shorter in comparison to the lower control arm so negative camber is induced upon upward suspension travel. Taking into account how the Instantaneous Center can affect movement, the upper control arm was designed to sit at a 9 degree incline, resulting in a camber gain of -2.27 degrees per 10 mm of vertical travel, which counteracts potential body roll during a corner."
        },
        {
          heading: "Full Suspension Assembly",
          images: [{ src: "assets/images/rc-car-suspension-assembly.jpg", cap: "Full suspension assembly" }],
          text: "After verifying proper suspension movement with the dimensions chosen, I made slight modifications to the dimensions and then modeled all the various components. I then created a full assembly, while ensuring proper suspension movement and ground clearance."
        },
        {
          heading: "Steering System",
          images: [{ src: "assets/images/rc-car-steering.jpg", cap: "Steering system" }],
          text: "Next, I designed a steering system that would be powered by a MG996R Metal Gear Servo. The steering system features a 4 bar linkage system adhering to the ackermann steering principle. Instead of using two separate bellcrank arms, I ultimately decided on this design because it features less parts while maintaining full functionality.\n\nConnected to the servo motor is a 3D printed fitted part which links the two steering rods together, and upon movement of the servo, rotational motion is translated into horizontal movement of the steering linkage."
        },
        {
          heading: "Drivetrain",
          images: [{ src: "assets/images/rc-car-differential.jpg", cap: "Custom differential" }, { src: "assets/images/rc-car-dogbone-axles.jpg", cap: "Dogbone axles to the differential side gears" }],
          text: "Instead of settling for an off the shelf differential, I took on the challenge of designing my own. The motor, connected to a gear in mesh with the ring gear, directly powers the system. In the case of a turn, the right and left wheels spin at different speeds depending on the direction the vehicle takes. The only part featured in this assembly that is not 3D printed are the off the shelf bearings I used, which were essential to reduce the potential wear caused by high speed rotating parts. The assembly features 4 bearings, 2 between the differential casing and side gears, and 2 connected to the spider gears and ring gears.\n\nConnecting the wheels to the differential side gears, I used off the shelf metal dogbone axles which direct power to the wheels while facilitating upward and downward suspension movement. The reason I landed on dog bone axles instead of CV joints is because it was more cost efficient and easier to implement into my specific differential design."
        }
      ],
      images: [
        { src: "assets/images/rc-car-cover.jpg", cap: "3D Printable RC Car" },
        { src: "assets/images/rc-car-servo-linkage.jpg", cap: "Full servo to linkage system" },
        { src: "assets/images/rc-car-differential-test.jpg", cap: "Differential test platform" }
      ]
    },
    {
      id: "drone-claw",
      title: "Functional Drone Claw Mechanism (Texas Aerial Robotics)",
      when: "",
      tags: ["SolidWorks", "Mechanism design", "Servo linkages", "Team design"],
      summary: "Working with a team of four other students, we designed and iterated on a fully functional four-arm claw mechanism capable of retrieving small objects. The mechanism also serves as a landing structure, allowing the drone to safely contact surfaces without damaging other components.\n\nThe claw is actuated by servo motors mounted directly to the arm assembly. When commanded, the servos convert rotational motion into linear movement of the claw arms, causing all four arms to close simultaneously around an object.\n\nIn this project I designed the gripping mechanism at the end of the arm and several of the servo linkage components. I focused on achieving proper fitment and alignment between components to ensure reliable actuation and consistent gripping performance.",
      images: [
        { src: "assets/images/drone-claw-cover.jpg", cap: "Drone claw mechanism" },
        { src: "assets/images/drone-claw-2.jpg", cap: "" },
        { src: "assets/images/drone-claw-3.jpg", cap: "" }
      ]
    },
    {
      id: "piston-crank",
      title: "Piston-Crank Assembly",
      when: "",
      tags: ["SolidWorks", "Mechanical mates", "Engineering drawings"],
      summary: "In this project, I modeled a complete Inline-4 cranktrain in SolidWorks from an engineering drawing, incorporating the crankshaft, connecting rods, pistons, and related components into a fully constrained assembly. This project strengthened my proficiency with advanced SolidWorks features and mechanical mates while providing practical insight into the design considerations and motion of dynamic mechanical assemblies.",
      images: [
        { src: "assets/images/piston-crank-cover.jpg", cap: "Inline-4 cranktrain assembly" },
        { src: "assets/images/piston-crank-2.jpg", cap: "" },
        { src: "assets/images/piston-crank-3.jpg", cap: "" },
        { src: "assets/images/piston-crank-4.jpg", cap: "" }
      ]
    }
  ]
};
