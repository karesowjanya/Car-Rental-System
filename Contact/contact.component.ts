import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
 
})
export class ContactComponent {
 
userName = '';
feedbackMessage = '';
 
  constructor(private http: HttpClient) {}
 
  submitFeedback() {
    const feedback = {
     name: this.userName,
     message: this.feedbackMessage,
    };
 
    this.http.post('http://localhost:3000/feedback', feedback).subscribe(() => {
      alert('Feedback submitted!');
      this.feedbackMessage = '';
      this.userName = '';
    });
   
  }
}