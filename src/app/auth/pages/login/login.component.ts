import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .caja{
      width:100%;
    }
    .formulario{
      width:100%;
    }
    .r{
      float:right;
    }
  `
  ]
})
export class LoginComponent {

  constructor(  private router: Router,
                private authService:AuthService, 
                private fb: FormBuilder, 
                private snackBar: MatSnackBar,
                public dialog: MatDialog ) { }


  miFormulario: FormGroup = this.fb.group({
    usuario: [ '', [Validators.required]],
    psw: [ '' ,[Validators.required] ],
  })


  mostrarSnackBar( mensaje:string) {
    this.snackBar.open(mensaje,'', {
      duration: 3000,
    });
  }


  
  login(){
    // Ir al backEnd 
    // Un usuario
     this.authService.login(
                       this.miFormulario.controls['usuario'].value,
                       this.miFormulario.controls['psw'].value)
      .subscribe( resp =>{
        if(resp[0]===undefined){
          this.mostrarSnackBar('Usuario o contraseña invalidos!!');
          return;
        }

        if (resp[0].usuario===this.miFormulario.controls['usuario'].value
            && resp[0].psw ===this.miFormulario.controls['psw'].value ){
              this.mostrarSnackBar('Sesión iniciada');
          this.router.navigate(['./heroes']);
        }
      })

    
  }

}
