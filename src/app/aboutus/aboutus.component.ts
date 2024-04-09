import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NgFor } from '@angular/common';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  email: string;
  linkedin: string;
}

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    NgFor
  ],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  team: TeamMember[] = [
    {
      name: 'John Doe',
      position: 'CEO',
      bio: 'John is a visionary leader with over 10 years of experience in the industry. He is passionate about driving innovation and delivering value to customers.',
      email: 'john@example.com',
      linkedin: 'https://www.linkedin.com/in/johndoe'
    },
    {
      name: 'Jane Smith',
      position: 'CTO',
      bio: 'Jane is a technology enthusiast with a knack for problem-solving. With a background in computer science, she leads our technical team in building cutting-edge solutions.',
      email: 'jane@example.com',
      linkedin: 'https://www.linkedin.com/in/janesmith'
    },
    {
      name: 'Alice Johnson',
      position: 'Lead Developer',
      bio: 'Alice is an experienced software engineer with expertise in web and mobile development. She is committed to delivering high-quality code and exceptional user experiences.',
      email: 'alice@example.com',
      linkedin: 'https://www.linkedin.com/in/alicejohnson'
    },
    {
      name: 'Bob Williams',
      position: 'Marketing Manager',
      bio: 'Bob is a creative marketing professional with a passion for storytelling. He leads our marketing efforts to effectively communicate our brand message and connect with our audience.',
      email: 'bob@example.com',
      linkedin: 'https://www.linkedin.com/in/bobwilliams'
    },
    // Add more team members as needed
  ];
}
