import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
 
})
export class HomeComponent implements OnInit {
  feedbackData: { name: string; message: string }[] = [];
 
  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    this.http.get<{ name: string; message: string }[]>('http://localhost:3000/feedback')
      .subscribe(data => {
        this.feedbackData = data;
      });
  }
}