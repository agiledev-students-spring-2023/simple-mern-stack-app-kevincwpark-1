import React from 'react'
import mypic from "./headshot.png"

function About_Us() {
  return (
    <div>
        <h1>Kevin Park</h1>
        <img src={mypic} alt="Image"style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover"
      }}/>
        <p>I am a senior undergraduate student studying computer science at New York University. I moved to New York from Korea in middle school and since then, I have grown to love this city and the opportunities it has to offer. I have a strong passion for technology and programming, which led me to pursue a degree in computer science. During my time at university, I have learned a great deal about software engineering and I am eager to apply my knowledge and skills to real-world projects.<br/><br/>

In my free time, I enjoy traveling and exploring new places. I believe that travel provides valuable experiences and opportunities for personal growth. I also have a passion for rock climbing. Rock climbing challenges me physically and mentally, and helps me build strength, balance, and endurance.<br/><br/>

As I am looking for entry level software engineering jobs, I am confident that my background in computer science, my passion for technology and my drive to succeed, make me an excellent candidate for any organization. I am eager to work in a fast-paced environment and to collaborate with a team of talented individuals to deliver innovative and high-quality software solutions.</p>
    </div>
    
  )
}

export default About_Us