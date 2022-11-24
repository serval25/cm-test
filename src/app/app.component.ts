import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private subscriptions: Subscription = new Subscription();

  constructor(
		private router: Router,
	) {}

  ngOnInit(){
    this.router.navigate(['/pages/requests']);
  }

  ngOnDestroy() {
		if (this.subscriptions) {
			this.subscriptions.unsubscribe();
		}
	}
}
