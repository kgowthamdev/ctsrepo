import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/Services/job.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: any;
  userProfile: any;
  isUserJobSeeker: boolean = false;
  editMode: boolean = false;

  constructor(private jobService: JobService) {
    this.isUserJobSeeker = localStorage.getItem('user') === 'USER';
    this.userId = localStorage.getItem('userid');
    this.loadUserProfile(); }

  ngOnInit(): void {
    
  }

  loadUserProfile() {
    if (this.isUserJobSeeker) {
      this.jobService.GetUserProfile(this.userId).subscribe(
        (response: any) => {
          // Get first profile from the list
          if (response.profiles && response.profiles.length > 0) {
            this.userProfile = response.profiles[0];
            console.log('User Profile:', this.userProfile);
          }
        }
      );
    } else {
      this.jobService.GetCompanyProfile(this.userId).subscribe(
        (response: any) => {
          // Get first profile from the list
          if (response.companyProfiles && response.companyProfiles.length > 0) {
            this.userProfile = response.companyProfiles[0];
            console.log('Company Profile:', this.userProfile);
          }
        }
      );
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    // Implement save logic here, e.g., call a service to update the profile
    this.editMode = false;
  }
} 