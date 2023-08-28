import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paginacao } from '../models/Paginacao';
import { Contato } from '../models/Contato';
import { ModalAdicionarComponent } from '../modal-adicionar/modal-adicionar.component';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-modal-contatos',
  templateUrl: './modal-contatos.component.html',
  styleUrls: ['./modal-contatos.component.css']
})
export class ModalContatosComponent {

  public model: Paginacao<Contato> = new Paginacao<Contato>;

  constructor(
    public dialogRef: MatDialogRef<ModalAdicionarComponent>,
    public pessoaContato: PessoaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.paginacao(1, 5, this.data.pessoaId);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  public paginacao(nextPageUrl: number, itemsPerPage: number, pessoaId: number) {
    const paginacao = new Paginacao<Contato>()
    paginacao.currentPage = nextPageUrl
    paginacao.itemsPerPage = itemsPerPage
    this.pessoaContato.obtemContatos(paginacao, pessoaId)
      .subscribe({
        next: (data) => {
          this.model = data
          console.log(this.model);
        },
        error: (error) => {
          console.log('Erro: ' + JSON.stringify(error))
        },
        complete: () => {
          console.log('Fim')
        }
      });
  }
}
