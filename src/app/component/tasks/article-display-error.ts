import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './article-display-error.html',
  styleUrls: ['./article-display-error.css']
})
export class FieldErrorDisplayComponent {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
