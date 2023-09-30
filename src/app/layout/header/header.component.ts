import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email!: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      console.log('user is ', user);
      this.email = user?.email;
    });
  }

  async handleSignOut() {
    try {
      await this.auth.signOut();
      this.router.navigateByUrl('/signin');
      this.toastr.info('Logout success');
      this.email = null;
    } catch (error) {
      this.toastr.error('Something went wrong!. Please try again.');
    }
  }
}
