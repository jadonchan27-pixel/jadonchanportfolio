/*
  Portfolio content. Edit this file to change what the site shows.

  profile:  your name, headline, a short intro, and contact details.
  projects: one entry per project, shown in this order.
    id       short unique slug, used in the page URL (#id)
    title    project name
    when     date or term, e.g. "Spring 2025"
    tags     skills used, each shown as a tag
    summary  the description; a blank line (\n\n) starts a new paragraph
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
      id: "gearbox",
      title: "Two-Stage Spur Gear Reducer",
      when: "Spring 2025",
      tags: ["SolidWorks", "Gear design", "CNC milling"],
      summary: "Designed and built a compact two-stage reducer to drive a conveyor test rig from a standard 1,750 rpm motor. Sized the gears for bending and contact stress, then machined the housing and assembled and tested the unit.",
      images: []
    },
    {
      id: "quadcopter-arm",
      title: "Topology-Optimised Quadcopter Arm",
      when: "Fall 2024",
      tags: ["ANSYS Mechanical", "FDM printing", "Lightweighting"],
      summary: "Redesigned a quadcopter motor arm to cut mass without losing stiffness. Ran a static study on the baseline, used the stress field to remove material, and validated the printed part with a cantilever load test.",
      images: []
    }
  ]
};
