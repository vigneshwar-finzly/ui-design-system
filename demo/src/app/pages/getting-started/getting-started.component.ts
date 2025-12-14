import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeExampleComponent } from '../../shared/code-example/code-example.component';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [CommonModule, CodeExampleComponent],
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent {
  installCode = `npm install @npmswapstech/finzly-theme`;

  importCode = `import { FinzlyInputComponent, FinzlyCustomButtonComponent } from '@npmswapstech/finzly-theme';

@NgModule({
  imports: [
    FinzlyInputComponent,
    FinzlyCustomButtonComponent
  ]
})
export class AppModule { }`;

  usageCode = `<finzly-input
  label="Email"
  placeholder="Enter your email">
</finzly-input>

<finzly-custom-button
  label="Submit"
  variant="primary">
</finzly-custom-button>`;
}
