import { Component, OnInit } from '@angular/core';
import { Pessoa } from './models/Pessoa';
import { PessoaService } from './services/pessoa.service';
import { Paginacao } from './models/Paginacao';

import { MatDialog } from '@angular/material/dialog';
import { ModalContatosComponent } from './modal-contatos/modal-contatos.component';
import { ModalAdicionarComponent } from './modal-adicionar/modal-adicionar.component';

declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public model: Paginacao<Pessoa> = new Paginacao<Pessoa>;

  constructor(private dialog: MatDialog,private pessoaService: PessoaService) {
  }

  ngOnInit() {
    this.paginacao(1, 5);
  }

  ngAfterViewInit() {
   
  }

  public paginacao(nextPageUrl: number, itemsPerPage: number) {
    const paginacao = new Paginacao<Pessoa>()
    paginacao.currentPage = nextPageUrl
    paginacao.itemsPerPage = itemsPerPage
    this.pessoaService.obtemPessoas(paginacao)
      .subscribe({
        next: (data) => {
          this.model = data
        },
        error: (error) => {
          console.log('Erro: ' + JSON.stringify(error))
        },
        complete: () => {
          console.log('Fim')
        }
      });
  }

  apagarContatos(pessoaId: number) {
    this.pessoaService.apagarContatos(pessoaId)
    .subscribe({
      next: (data) => {
        alert('Contatos apagados com sucesso!')
      },
      error: (error) => {
        console.log('Erro: ' + JSON.stringify(error))
      },
      complete: () => {
        console.log('Fim')
      }
    });
  }

  openModalContatos(pessoaId: number, nome: string) {
    const dialogRef = this.dialog.open(ModalContatosComponent, {
      width: '800px',
      data: { title: `Listando Contatos de ${nome}`, content: 'Conteúdo do modal.', pessoaId: pessoaId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado.', result);
    });
  }

  openModalAdicionar(pessoaId: number) {
    const dialogRef = this.dialog.open(ModalAdicionarComponent, {
      width: '800px',
      data: { title: 'Adicionar Contato', content: 'Conteúdo do modal.', pessoaId: pessoaId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado.', result);
    });
  }

}
