import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
navigateToContact() {
  this.router.navigate(['/contact']); // '/contact' est l'URL associée à votre composant Contact

}
  title = 'test-project';

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    // Utilisez des fonctions ou des variables de votre fichier JavaScript ici
  
  }
}
