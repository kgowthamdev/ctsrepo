import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/Services/job.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  applicantId: any;
  userProfile: any;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get applicant ID from route params
    this.route.params.subscribe(params => {
      this.applicantId = params['applicantId'];
      this.loadUserProfile();
    });
  }

  loadUserProfile() {
    this.jobService.GetUserProfileById(this.applicantId).subscribe(
      (response: any) => {
        if (response) {
          this.userProfile = response;
          console.log('User Profile:', this.userProfile);
        }
      }
    );
  }
} 