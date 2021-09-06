import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../model/UsuarioModel';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar-familia',
  templateUrl: './cadastrar-familia.component.html',
  styleUrls: ['./cadastrar-familia.component.css']
})
export class CadastrarFamiliaComponent implements OnInit {

  user: UsuarioModel = new UsuarioModel()
  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar() {

    if (this.user.nomeCompleto.length < 5) {
      alert('O usuário deve conter no mínimo 8 caracteres.')
    }
    if (this.user.usuario.indexOf('@') == -1 || this.user.usuario.indexOf('.') == -1) {
      alert('O usuário deve ser um email (e.g. usuario@usuario.com)')
    }

    if (this.user.senha.length < 8) {
      alert('A senha deve conter no mínimo 8 dígitos.')
    } else if (this.user.senha != this.confirmarSenha) {
      alert('As senhas informadas estão diferentes!')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: UsuarioModel) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso')
      })
    }
  }
}